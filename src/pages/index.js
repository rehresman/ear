import React from 'react';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import { Link } from 'gatsby';

const Index = () => (
	<Layout>
		<Box>
			<Title as="h2" size="large">
				<Link to="/ear-training">Ear Training</Link>
			</Title>
		</Box>
	</Layout>
);

export default Index;
