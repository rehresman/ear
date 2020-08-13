import React, { useState, useEffect } from 'react';
import { StyledTimer } from './timer.css';
import { motion } from 'framer-motion';

const Timer = () => {
	const [start] = useState(Date.now());
	const [currentTime, setCurrentTime] = useState(Date.now());
	useEffect(() => {
		const interval = setInterval(() => setCurrentTime(Date.now()), 100);
		return () => {
			clearInterval(interval);
		};
	});

	const value = Math.round((currentTime - start) / 1000);
	const seconds = value % 60;
	const minutes = Math.floor(value / 60);
	const zero = seconds < 10 ? 0 : '';
	return (
		<StyledTimer>
			<motion.time
				id="timer"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2 }}
			>
				<code>
					{minutes}:{zero}
					{seconds}
				</code>
			</motion.time>
		</StyledTimer>
	);
};

export default Timer;
