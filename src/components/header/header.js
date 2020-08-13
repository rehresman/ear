import React from 'react';

import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import { Wrapper, Container } from './header.css';
import Nav from 'components/header/nav';
import { timeout } from 'constants/transition';

const Header = () => (
	<motion.div initial={{ y: -125 }} animate={{ y: 0, delay: timeout }}>
		<Wrapper>
			<Container>
				<Link to="/">
					<h1>Intervals</h1>
				</Link>

				<Nav />
			</Container>
		</Wrapper>
	</motion.div>
);

export default Header;
