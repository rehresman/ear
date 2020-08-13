import styled from 'styled-components';

export const Row = styled.section`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: row;
	justify-content: center;
	cursor: pointer;
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 10rem;
	z-index: 1;

	div {
		display: flex;
	}
`;
