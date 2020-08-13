import styled from 'styled-components';
import { black } from 'constants/theme';

export const Container = styled.header`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 4rem;
	padding-right: 4rem;
	padding-top: 2rem;
	padding-bottom: 2rem;

	a {
		color: ${black};
		transition: color 0.2s ease;
		text-decoration: none;

		&:hover {
			color: inherit;
		}
	}
`;

export const Wrapper = styled.div`
	position: absolute;
	width: 100vw;
	background-color: transparent;
	z-index: 100;
`;
