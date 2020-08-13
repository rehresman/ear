import React, { useState } from 'react';
import { Row, Column } from './startButton.css';
import { motion } from 'framer-motion';

const variants = {
	gone: (delay) => ({
		opacity: 0,
		y: '-500px',
		transition: {
			delay: 0.02 * delay,
			duration: 0.4,
		},
	}),
	here: (delay) => ({
		opacity: 1,
		y: '0px',
		transition: {
			delay: 0.02 * delay,
			duration: 0.4,
		},
	}),
};

const StartButton = () => {
	const text = 'begin'.split('');
	const [leaving, setLeaving] = useState(false);
	return (
		<div
			onClick={() => setLeaving(true)}
			onKeyDown={() => setLeaving(true)}
			role="button"
			tabIndex={0}
			className="nofocus"
		>
			<Row className="nofocus">
				<Column className="nofocus">
					<div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 2 }}
					>
						{text.map((letter, i) => {
							return (
								<motion.span
									key={i}
									custom={i}
									animate={leaving ? 'gone' : 'here'}
									variants={variants}
								>
									{letter}
								</motion.span>
							);
						})}
					</div>
				</Column>
			</Row>
		</div>
	);
};

export default StartButton;
