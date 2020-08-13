import React from 'react';
import { StyledDancer } from './dancer.css';
import { motion } from 'framer-motion';

export const squares = 'squares';
export const pop = 'pop';
export const rings = 'rings';
export const circles = 'circles';
const chooseStyle = () => {
	const selection = Math.floor(Math.random() * 5);

	switch (selection) {
		case 0:
			return squares;
		case 1:
			return pop;
		case 2:
			return rings;
		case 3:
		default:
			return circles;
	}
};

const style = chooseStyle();

const Dancer = () => {
	return (
		<StyledDancer id="dancer" dance={style}>
			<motion.div className="wrapper" whileTap={{ scale: 3 }}>
				{getCircles()}
			</motion.div>
		</StyledDancer>
	);
};

const getCircles = () => {
	let output = [];
	for (let i = 1; i < 12; i++) {
		const random = Math.random() * 16;
		const duration = i === 1 ? 60 : 15 * random;
		output.push(
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
				transition={{
					times: [0, 0.1, 0.9, 1],
					delay: (i - 6) * (random + 30),
					duration,
					yoyo: Infinity,
				}}
				key={i}
			>
				<div className={`circle circle-${i}`}></div>
			</motion.div>
		);
	}
	return output;
};

export default Dancer;
