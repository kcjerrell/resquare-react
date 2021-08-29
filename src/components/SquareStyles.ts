import styled from "styled-components";

interface SquareContainerProps {
	size: number,
	color: string,
	borderWidths: string,
	borderColors: string
}

// the number of digits per row, by board size, should be:
// 4x4: 4x4					4 = 24%
// 5x5: 2, 3px			5 = 32%
// 6x6: 3, 3px			6 = 32%
// 7x7: 3, 4x4			7 = 24%
// 8x8: 4, 4x4			8 = 24%
// 9x9: 3, 3, 3px		9 = 32%

export const digitwidths = [18, 22, 22, 16, 18, 22];
export const digitsizes = [2, 1.4, 1.4, 1.0, 1.0, 0.8];
export const selectedsizes = [5, 5, 5, 5, 5, 3];

export const SquareContainer = styled.div<SquareContainerProps>`
	border-color: ${props => props.borderColors};
	border-style: solid;
	border-width: ${props => props.borderWidths};
	margin: 0px;
	height: 100%;
	position: relative;
	background: ${props => props.color};
	box-sizing: border-box;

	.square-value {
		font-size: ${props => selectedsizes[props.size - 4]}rem;
		color: #000000DD;
		margin: auto;
		text-align: center;
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}

	.error {
		color: #FF0000;
		animation-name: error-flash;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
		animation-timing-function: ease;
	}

	@keyframes error-flash {
  from {color: #CC0000;}
  to {color: #550000;}
}

	.square-digits {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
		flex-wrap: wrap-reverse;
		width: 100%;
		position: absolute;
		bottom: 0%;
		padding-bottom: .2rem;
	}


	.square-digit-box {
		padding-bottom: 100%;
		min-width: 24%;
		max-width: 32%;
	}

	.square-digit {
		border: 1px solid transparent;
		border-radius: 3px;
		background-color: transparent;

		width: ${props => digitwidths[props.size - 4]}%;
		margin: 3px;
		padding: .1rem 0;

		font-size: ${props => digitsizes[props.size - 4]}rem;

		opacity: 32%;
		transition: background-color .2s ease,
		border-color .2s ease,
		opacity .2s ease,
		box-shadow .2s ease;

		box-shadow: 0px 0px 0px 0px #00000000;

		z-index: 100;
	}

	.excluded {
		opacity: 0%;
	}

	.excluded-error {
		color: #FF0000;
		animation-name: error-flash;
		animation-duration: 1.5s;
		animation-iteration-count: infinite;
		animation-timing-function: ease;
		opacity: 90%;
	}

	&:hover {
		box-shadow: 0px 0px 4px 0px #00000066 inset;

		.square-digit {
			background-color: #FFFFFF;
			border-color: black;
			opacity: 64%;
			box-shadow: 0px 1px 2px 0px #00000099,
									0px 2px 3px 1px #00000066;
		}

		.excluded {
			background: #FF7777;
		}

		.square-value {
			color: white;
		}
	}

	.square-digit:hover {
		opacity: 100%;
	}

	.square-key {
		border-color: black;
		border-style: none;
		border-width: 0 2px 2px 0;
		position: absolute;
		padding: 0 .3rem;
		/* background: #FFFFFF44; */
		font-size: ${props => digitsizes[props.size - 4]}rem;
		font-weight: 500;
	}
`;
