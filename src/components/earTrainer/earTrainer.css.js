import styled from 'styled-components';

export const Modal = styled.div`
	position: absolute;
	z-index: 5;
	width: 100vw;
	height: 100vh;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	background-color: white;
`;
export const StyledEarTrainer = styled.section`
	height; 100%;
	position: relative;
	.flexed {
		height: 100vh;
		width: 100vw;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	
`;

export const Wrapper = styled.div`
	.audio {
		position: absolute;
		z-index: 6;
		padding-top: 70vh;
		padding-bottom: 10vh;
		width: 100vw;

		text-align: center;
	}
	.hide {
		display: none;
	}
`;
