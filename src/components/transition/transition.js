import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { timeout } from 'constants/transition';

class Transition extends PureComponent {
	render() {
		const { children, location } = this.props;

		// To enable page transitions on mount / initial load,
		// use the prop `animateOnMount={true}` on `PoseGroup`.
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: timeout }}
				exit={{ opacity: 0 }}
			>
				<div key={location.pathname}>{children}</div>
			</motion.div>
		);
	}
}

Transition.propTypes = {
	children: PropTypes.node.isRequired,
	location: PropTypes.object.isRequired,
};

export default Transition;
