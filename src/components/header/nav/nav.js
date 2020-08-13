import React from 'react';
import { Container } from './nav.css';

const Nav = () => (
	<Container>
		<ul>
			<li>
				<button className="pause" onClick={() => location.reload()}></button>
			</li>
		</ul>
	</Container>
);

export default Nav;
