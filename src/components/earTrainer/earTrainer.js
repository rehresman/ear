import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, StyledEarTrainer, Wrapper } from './earTrainer.css.js';
import { graphql, useStaticQuery } from 'gatsby';
import StartButton from 'components/startButton';
import Timer from 'components/timer';
import Dancer from 'components/dancer';
import { dark } from 'constants/theme';
import { motion } from 'framer-motion';
var Promise = require('es6-promise').Promise;

export const exitTime = 1500;

const EarTrainer = ({ octaves, speed }) => {
	const data = useStaticQuery(graphql`
		query EarTrainingQuery {
			musicalConceptsJson {
				notes {
					name
					number
					audio {
						publicURL
					}
				}
				intervals {
					name
					size
					audio {
						publicURL
					}
				}
				testAudio {
					publicURL
				}
			}
		}
	`);
	const lowerOffset = (Math.min(octaves) - 1) * 12;
	const getRandomNoteNumber = () => lowerOffset + Math.floor(Math.random() * 12);
	const getRandomNoteInterval = () => Math.floor(Math.random() * 25 - 12);

	const [isMobile, setIsMobile] = useState(null);
	const [start, setStart] = useState(false);
	const [questioning, setQuestioning] = useState(false);
	const [answering, setAnswering] = useState(false);
	const [reset, setReset] = useState(false);
	const [noteNumber, setNoteNumber] = useState(getRandomNoteNumber());
	const [noteInterval, setNoteInterval] = useState(getRandomNoteInterval());
	const [answerNoteNumber, setAnswerNoteNumber] = useState(
		noteNumber + noteInterval
	);
	const [questionSrc, setQuestionSrc] = useState(null);
	const [voiceSrc, setVoiceSrc] = useState(null);
	const [answerSrc, setAnswerSrc] = useState(null);
	const [audioSrc, setAudioSrc] = useState(null);
	const [testSrc, setTestSrc] = useState(null);
	const [init, setInit] = useState(false);
	const [audioDisallowed, setAudioDisallowed] = useState(true);
	const audioSwapDuration = 700;
	const voiceDuration = 1800 + audioSwapDuration;
	const questionDuration = speed * 1800 + audioSwapDuration;
	const answerDuration = speed * 1800 + audioSwapDuration;

	const delay = (time) => {
		return new Promise((resolve) => {
			setTimeout(resolve(), time);
		});
	};

	const swapAudio = (element, newElementSrc) => {
		const silenceDuration = 300;
		const duration = audioSwapDuration - silenceDuration;

		return delay(duration)
			.then(() => fadeOut(element, duration))
			.then(() => {
				setAudioSrc(newElementSrc);
				return element.load.bind(element)();
			})
			.then(() => delay(silenceDuration))
			.then(() => {
				fullVolume(element);
				return element.play.bind(element)();
			});
	};

	const fadeOut = (element, time) => {
		//want this to return a chain of 11 promises. doesn't run async yet
		const sampleLength = time;
		let promises = [];
		for (let i = 1; i > 0; i = i - 0.1) {
			promises.push(
				(() => delay(sampleLength * i)).then(() => (element.volume = i))
			);
		}
		return Promise.all(promises);
	};

	const fullVolume = (element) => {
		element.volume = 1;
	};

	const controlAudio = (
		trigger,
		newSrc,
		elementName,
		duration,
		setSrc,
		setTrigger,
		setNextTrigger
	) => {
		if (trigger) {
			//define audio element
			const audio = isMobile
				? document.getElementById('audio')
				: document.getElementById(elementName);

			//play audio
			let playPromise;
			if (isMobile) {
				playPromise = swapAudio(audio, newSrc);
			} else {
				setSrc(newSrc);
				audio.load.bind(audio)();
				playPromise = audio.play.bind(audio)();
			}
			console.log(playPromise);

			playPromise

				.then(() => {
					//move on to next stage
					setTimeout(() => {
						setAudioDisallowed(false);
						if (typeof setTrigger !== 'undefined') setTrigger(false);
						if (typeof setNextTrigger !== 'undefined') setNextTrigger(true);
					}, duration);
				})
				.catch((error) => {
					if (typeof setTrigger !== 'undefined') setTrigger(false);
					if (typeof setNextTrigger !== 'undefined') setNextTrigger(false);
					setAudioDisallowed(true);
				});
		}
	};

	//mobile
	useEffect(() => {
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsMobile(true);
		} else if (
			/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
				ua
			)
		) {
			setIsMobile(true);
		} else setIsMobile(false);
	}, []);

	//test audio playback
	useEffect(() => {
		const testSrc = data.musicalConceptsJson.testAudio.publicURL;
		controlAudio(true, testSrc, 'test', 1000, setTestSrc, undefined, undefined);
	}, []);

	//
	//start
	//
	useEffect(() => {
		const newVoiceSrc = data.musicalConceptsJson.intervals
			.filter((n) => Number.parseInt(n.size) === noteInterval)
			.map((n) => n.audio.publicURL)[0];
		controlAudio(
			start,
			newVoiceSrc,
			'voice',
			voiceDuration,
			setVoiceSrc,
			setStart,
			setQuestioning
		);
	}, [start]);

	//
	//questioning
	//
	useEffect(() => {
		const newQuestionSrc = data.musicalConceptsJson.notes
			.filter((n) => Number.parseInt(n.number) === noteNumber)
			.map((n) => n.audio.publicURL)[0];

		controlAudio(
			questioning,
			newQuestionSrc,
			'question',
			questionDuration,
			setQuestionSrc,
			setQuestioning,
			setAnswering
		);
	}, [questioning]);

	//answering
	useEffect(() => {
		const newAnswerSrc = data.musicalConceptsJson.notes
			.filter((n) => Number.parseInt(n.number) === answerNoteNumber)
			.map((n) => n.audio.publicURL)[0];
		controlAudio(
			answering,
			newAnswerSrc,
			'answer',
			answerDuration,
			setAnswerSrc,
			setAnswering,
			setReset
		);
	}, [answering]);

	//resetting
	useEffect(() => {
		if (reset) {
			setTimeout(() => {
				//repeat
				const newNoteNumber = getRandomNoteNumber();
				const newNoteInterval = getRandomNoteInterval();
				setNoteNumber(newNoteNumber);
				setNoteInterval(newNoteInterval);
				setAnswerNoteNumber(newNoteNumber + newNoteInterval);
				setStart(true);
				setReset(false);
			});
		}
	}, [reset]);

	const setStartTimeout = () => {
		setStart(true);
		setTimeout(() => {
			setInit(true);
		}, exitTime);
	};

	const getVisualElements = (init, audioDisallowed) => {
		return init ? (
			<StyledEarTrainer>
				<section
					className="flexed nofocus"
					onClick={setStartTimeout}
					onKeyDown={setStartTimeout}
					role="button"
					tabIndex={0}
				>
					<Dancer color={dark} />
				</section>
				<Timer />
			</StyledEarTrainer>
		) : (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			>
				<Modal className={audioDisallowed ? 'show' : 'hide'}>
					(Please click the play button to enable audio.)
				</Modal>
				<div
					onClick={setStartTimeout}
					onKeyDown={setStartTimeout}
					role="button"
					tabIndex={0}
					key="startButton"
					className="nofocus"
				>
					<StartButton />
				</div>
			</motion.div>
		);
	};
	console.log('audioDisallowed=', audioDisallowed);
	return (
		<Wrapper>
			{isMobile ? (
				<>
					<motion.div
						className={audioDisallowed ? 'audio nofocus' : 'hide'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
					>
						{/* eslint-disable */}
						<audio
							id="audio"
							controls={audioDisallowed}
							onCanPlay={() => setAudioDisallowed(false)}
						>
							<source src={audioSrc} type="audio/mpeg" />
						</audio>
						{/* eslint-enable */}
					</motion.div>
					{getVisualElements(init, audioDisallowed)}
				</>
			) : (
				<>
					<motion.div className={audioDisallowed ? 'audio nofocus' : 'hide'}>
						{/* eslint-disable */}

						<audio
							id="test"
							controls={audioDisallowed}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
							onClick={() => {
								console.log('clicked');
								return setAudioDisallowed(false);
							}}
							onKeyDown={() => setAudioDisallowed(false)}
							tabIndex={0}
							role="button"
						>
							<source src={testSrc} type="audio/mpeg" />
						</audio>
						<audio id="question">
							<source src={questionSrc} type="audio/mpeg" />
						</audio>
						<audio id="voice">
							<source src={voiceSrc} type="audio/mpeg" />
						</audio>
						<audio id="answer" autoPlay={false}>
							<source src={answerSrc} type="audio/mpeg" />
						</audio>
						{/* eslint-enable */}
					</motion.div>
					{getVisualElements(init, audioDisallowed)}
				</>
			)}
		</Wrapper>
	);
};

EarTrainer.propTypes = {
	octaves: PropTypes.array.isRequired,
	//speed is the number of seconds in between steps
	speed: PropTypes.number.isRequired,
};

export default EarTrainer;
