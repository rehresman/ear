import React from 'react';
import EarTrainer from '../components/earTrainer';
import Layout from 'components/layout';

const EarTraining = () => {
	return (
		<Layout>
			<EarTrainer octaves={[3]} speed={1.5} />
		</Layout>
	);
};

export default EarTraining;
