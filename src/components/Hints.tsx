import React from 'react';
import styled from 'styled-components';
import { Group } from '../model/group';

interface HintsProps {
	group: Group;
}

function HintsComponent(props: HintsProps) {
	const { group } = props;
	return (
		<HintsContainer>
			{group.rule.toLabel()}
			{group.solutions != null && group.solutions.map((sol, i) => {
				return (
					<div key={i}>{group.rule.formatHint(sol)}</div>
				)
			}) }
		</HintsContainer>
	);
}

export default HintsComponent;

const HintsContainer = styled.div``;
