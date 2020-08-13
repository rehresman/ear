import styled, { keyframes } from 'styled-components';
import { light, dark, black } from 'constants/theme';
import MEDIA from 'helpers/mediaTemplates';

const getAnimation1 = (dance) => {
	switch (dance) {
		case 'squares':
			return flip1;
		case 'pop':
			return pop1;
		case 'rings':
			return rings1;
		case 'circles':
		default:
			return rightRotate;
	}
};
const getAnimation2 = (dance) => {
	switch (dance) {
		case 'squares':
			return flip2;
		case 'pop':
			return pop2;
		case 'rings':
			return rings2;
		case 'circles':
		default:
			return leftRotate;
	}
};

const getBorderRadius = (dance) => {
	switch (dance) {
		case 'squares':
			return '0%';
		case 'circles':
		default:
			return '100%';
	}
};

const rightRotate = keyframes`
		from {
    transform: rotateX(0deg) rotateY(0deg) ;
  }

  to {
    transform: rotateX(720deg) rotateY(720deg) ;
  }
`;

const leftRotate = keyframes`
0% {
			transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		100% {
			transform: rotateX(720deg) rotateY(360deg) rotateZ(720deg);
		}
`;

const flip1 = keyframes`
		from {
    transform: rotateX(0deg)  ;
  }

  to {
    transform: rotateX(720deg)  ;
  }
`;

const flip2 = keyframes`
0% {
			transform: rotateX(0deg) ;
		}
		100% {
			transform: rotateX(720deg);
		}
`;

const pop1 = keyframes`
		from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const pop2 = keyframes`
0% {
			transform: scale(0) rotateY(0) ;
		}
		100% {
			transform: scale(1) rotateY(360deg);
		}
`;

const rings1 = keyframes`
		from {
    transform: scale(0) rotateY(0) rotateX(0deg);
  }

  to {
    transform: scale(3) rotateY(270deg) rotateX(90deg);
  }
`;

const rings2 = keyframes`
0% {
			transform: scale(0) rotateY(0) rotateX(0deg);
		}
		100% {
			transform: scale(3) rotateY(270deg) rotateX(-90deg);
		}
`;

export const StyledDancer = styled.div`
	.wrapper {
		width: 200px;
		height: 200px;
		position: relative;
		margin-left: auto;
		margin-right: auto;
	}

	.circle {
		border-radius: ${({ dance }) => getBorderRadius(dance)};
		perspective: 800px;
		animation-fill-mode: forwards;
		position: absolute;
	}

	.circle-1 {
		width: 200px;
		height: 200px;
		border: 10px solid ${light};
		opacity: 1;
		animation: ${({ dance }) => getAnimation1(dance)} 4s 0s infinite;
		top: 0;
		left: 0;
		z-index: 11;
	}

	.circle-2 {
		width: 180px;
		height: 180px;
		border: 10px solid #ffcd9c;
		opacity: 0.25;
		animation: ${({ dance }) => getAnimation2(dance)} 4.2s 0s infinite;
		top: 10px;
		left: 10px;
		z-index: 10;
	}

	.circle-3 {
		width: 160px;
		height: 160px;
		border: 10px solid #ffcd9c;
		opacity: 0.9;
		animation: ${({ dance }) => getAnimation1(dance)} 4.4s 0s infinite;
		top: 20px;
		left: 20px;
		z-index: 9;
	}
	.circle-4 {
		width: 140px;
		height: 140px;
		border: 10px solid #ffcd9c;
		opacity: 0.35;
		animation: ${({ dance }) => getAnimation2(dance)} 4.6s 0s infinite;
		top: 30px;
		left: 30px;
		z-index: 8;
	}
	.circle-5 {
		width: 120px;
		height: 120px;
		border: 10px solid ${dark};
		opacity: 0.8;
		animation: ${({ dance }) => getAnimation1(dance)} 4.8s 0s infinite;
		top: 40px;
		left: 40px;
		z-index: 7;
	}
	.circle-6 {
		width: 100px;
		height: 100px;
		border: 10px solid ${light};
		opacity: 0.45;
		animation: ${({ dance }) => getAnimation2(dance)} 5s 0s infinite;
		top: 50px;
		left: 50px;
		z-index: 6;
	}
	.circle-7 {
		width: 80px;
		height: 80px;
		border: 10px solid ${dark};
		opacity: 0.7;
		animation: ${({ dance }) => getAnimation1(dance)} 5.2s 0s infinite;
		top: 60px;
		left: 60px;
		z-index: 5;
	}
	.circle-8 {
		width: 60px;
		height: 60px;
		border: 10px solid ${dark};
		opacity: 0.45;
		animation: ${({ dance }) => getAnimation2(dance)} 5.4s 0s infinite;
		top: 70px;
		left: 70px;
		z-index: 4;
	}
	.circle-9 {
		width: 40px;
		height: 40px;
		border: 10px solid #ffcd9c;
		opacity: 0.6;
		animation: ${({ dance }) => getAnimation1(dance)} 5.6s 0s infinite;
		top: 80px;
		left: 80px;
		z-index: 3;
	}
	.circle-10 {
		width: 20px;
		height: 20px;
		border: 10px solid ${light};
		opacity: 0.65;
		animation: ${({ dance }) => getAnimation2(dance)} 5.9s 0s infinite;
		top: 90px;
		left: 90px;
		z-index: 2;
	}
	.circle-11 {
		width: 0px;
		height: 0px;
		border: 10px solid ${black};
		opacity: 0.3;
		animation: ${({ dance }) => getAnimation1(dance)} 6s 0s infinite;
		top: 100px;
		left: 100px;
		z-index: 1;
	}

	${MEDIA.MIN_TABLET`{
		.wrapper {
			width: 300px;
			height: 300px;
		}

		.circle-1 {
			width: 300px;
			height: 300px;
			left: 0;
			top: 0;
		}

		.circle-2 {
			width: 270px;
			height: 270px;
			left: 15px;
			top: 15px;
		}

		.circle-3 {
			width: 240px;
			height: 240px;
			left: 30px;
			top: 30px;
		}

		.circle-4 {
			width: 210px;
			height: 210px;
			left: 45px;
			top: 45px;
		}

		.circle-5 {
			width: 180px;
			height: 180px;
			left: 60px;
			top: 60px;
		}

		.circle-6 {
			width: 150px;
			height: 150px;
			left: 75px;
			top: 75px;
		}
		.circle-7 {
			width: 120px;
			height: 120px;
			left: 90px;
			top: 90px;
		}
		.circle-8 {
			width: 90px;
			height: 90px;
			left: 105px;
			top: 105px;
		}
		.circle-9 {
			width: 60px;
			height: 60px;
			left: 120px;
			top: 120px;
		}
		.circle-10 {
			width: 30px;
			height: 30px;
			left: 135px;
			top: 135px;
		}
		.circle-11 {
			width: 0px;
			height: 0px;
			left: 150px;
			top: 150px;
		}

	}`};
`;
