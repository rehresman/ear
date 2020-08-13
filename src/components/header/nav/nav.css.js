import styled from 'styled-components';
import { dark } from 'constants/theme';

export const Container = styled.nav`
	ul {
		display: flex;
		list-style: none;
		padding: 0;

		li {
			font-size: 1.3rem;
			border: 4px solid ${dark};
			border-radius: 50%;
			padding: 2rem;
			cursor: pointer;

			& + li {
				margin-left: 2rem;
			}
			& > * {
				cursor: pointer;
			}
		}
	}
	.pause {
		width: 0.8rem;
		height: 2.9rem;
		border-right: 6px solid ${dark};
		border-left: 6px solid ${dark};
		background-color: transparent;
		border-top: none;
		border-bottom: none;

		padding-left: 0.9rem;
		padding-right: 0.9rem;
	}

	.pause:focus {
		outline: none;
	}
`;
