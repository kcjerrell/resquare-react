import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Group } from '../model/group';
import { selectSize } from '../state/selectors';
import { digitsizes } from './SquareStyles';

interface HintsProps {
	group: Group;
}

function HintsComponent(props: HintsProps) {
	const { group } = props;
	const size = useSelector(selectSize);

	const visible = group.solutions != null && group.solutions.length > 0;

	return (
		<HintsContainer visible={visible} size={size} color={group.color}>
			<div className="hints-box">
				<span className="hints-rule">{group.rule.toLabel()}</span>
				{group.validatedSolutions != null && group.validatedSolutions.map((sol, i) => {
					return (
						<div key={i} className={sol.isValid ? '' : 'hint-invalid'}>{group.rule.formatHint(sol.solution)}</div>
					)
				})}
			</div>
		</HintsContainer>
	);
}

export default HintsComponent;

interface HintsContainerProps {
	visible: boolean;
	size: number;
	color: string;
}

const HintsContainer = styled.div<HintsContainerProps>`
	width: 20rem;
	text-align: left;


	.hints-box {
		display: inline-block;
		font-size: ${props => digitsizes[props.size - 4]}rem;
		visibility: ${props => props.visible ? "visible" : "hidden"};
		background: ${props => props.color}99;
		margin: 1rem;
		border: 2px black solid;
		padding: 0 .6rem;
	}

	.hints-rule {
		font-weight: 500;
	}

	.hint-invalid {
		color: #AA0000;
	}
`;
