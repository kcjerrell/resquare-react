import React from 'react';
import styled from 'styled-components';
import { digitsizes } from './SquareStyles';

interface CompareOverlayProps {
	compareDown?: number;
	compareRight?: number;
	fill?: string;
	stroke?: string;
	size?: string;
	strokeWidth?: number;
}

function CompareOverlay(props: CompareOverlayProps) {
	const { compareDown, compareRight } = props;

	const fill = props.fill || "#00000000";
	const stroke = props.stroke || "#000000FF";
	const size = props.size || "18px";
	const strokeWidth = props.strokeWidth || 1;

	let angle = 0;
	if (compareRight != null)
		angle = compareRight > 0 ? 0 : 180;

	else if (compareDown != null)
		angle = compareDown > 0 ? 90 : 270;

	return (
		<>
			{compareRight &&
				<CompareOverlayRight angle={angle} size={4}>
					<svg width={size} height={size} viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 0L19.5 10L0 20" transform="translate(1 1)" id="New-shape-2" fill={fill} fill-rule="evenodd" stroke={stroke} stroke-width={strokeWidth} />
					</svg>
				</CompareOverlayRight>
			}
			{compareDown &&
				<CompareOverlayDown angle={angle} size={4}>
					<svg width={size} height={size} viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 0L19.5 10L0 20" transform="translate(1 1)" id="New-shape-2" fill={fill} fill-rule="evenodd" stroke={stroke} stroke-width={strokeWidth} />
					</svg>
				</CompareOverlayDown>
			}
		</>
	)
}

export default CompareOverlay;

interface CompareOverlayStyleProps {
	angle: number;
	size: number;
}

const CompareOverlayRight = styled.div<CompareOverlayStyleProps>`
		/* font-size: ${props => digitsizes[props.size - 4] + 1}rem; */
		position: absolute;
		right: 0;
		z-index: 80;
		transform: translate(50%, -50%)
							 rotate(${props => props.angle}deg);
		top: 50%;
`

const CompareOverlayDown = styled.div<CompareOverlayStyleProps>`
		/* font-size: ${props => digitsizes[props.size - 4] + 1}rem; */
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		transform: translate(0, 50%)
							 rotate(${props => props.angle}deg);
		z-index: 80;
		padding: 0 0;
`;
