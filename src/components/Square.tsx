import React, { CSSProperties, MouseEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { RuleTypes } from "../model/rule";
import { Square } from "../model/square";
import { SquareState } from "../state/interfaces";
import { excludeDigit, groupExclude, selectDigit } from "../state/puzzleSlice";
import { getCompare } from "../theme/compare";
import { getBorderString } from "../utilities/util";
import { CompareSign, SquareContainer } from "./SquareStyles";

let digitOrder: number[];

function getDigits(size: number) {
	if (!digitOrder || digitOrder.length !== size) {
		switch (size) {
			case 4:
				digitOrder = [1, 2, 3, 4];
				break;
			case 5:
				digitOrder = [3, 4, 5, 1, 2];
				break;
			case 6:
				digitOrder = [4, 5, 6, 1, 2, 3];
				break;
			case 7:
				digitOrder = [4, 5, 6, 7, 1, 2, 3];
				break;
			case 8:
				digitOrder = [5, 6, 7, 8, 1, 2, 3, 4];
				break;
			case 9:
				digitOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				break;
			default:
				throw new Error("invalid size");
		}
	}
	return digitOrder;
}

interface SquareProps {
	square: Square,
	state: SquareState
}

/**
 * Renders the Square component
 *
 * @param props
 * @returns
 */
function SquareComponent(props: SquareProps) {
	const { state, square } = props;
	const dispatch = useAppDispatch();

	let compareSign;
	let rightAngle = 0;
	let downAngle = 0;
	if (square.group.rule.type === RuleTypes.Compare) {
		compareSign = getCompare(square.group.color);

		if (state.comparisonRight != null)
			rightAngle = state.comparisonRight > 0 ? 0 : 180;

		if (state.comparisonBottom != null)
			downAngle = state.comparisonBottom > 0 ? 90 : 270;
	}

	const selected = state.selected;
	const size = square.puzzle.size;

	const digits = getDigits(size);

	const borderWidths = getBorderString(square.neighborInGroup, 1, 1, 'px');
	const borderColors = getBorderString(square.neighborInGroup, "#00000077", "#000");

	// Left click - select digit
	const digitOnClick = (digit: number) => {
		// square.selected = digit;

		const payload = {
			x: square.x,
			y: square.y,
			digit
		}

		dispatch(selectDigit(payload));
	}

	// Middle click - group exclude
	const digitOnAuxClick = (e: MouseEvent, digit: number) => {
		if (e.button !== 1)
			return;

		e.preventDefault();

		const payload = {
			x: square.x,
			y: square.y,
			digit
		}

		dispatch(groupExclude(payload));
	}

	// Right click - exclude digit
	const digitOnContextMenu = (e: MouseEvent, digit: number) => {
		e.preventDefault();

		const payload = {
			x: square.x,
			y: square.y,
			digit
		}

		dispatch(excludeDigit(payload));
	}

	const selectedOnClick = () => {
		square.selected = 0;
	}

	return (
		<SquareContainer size={size} color={square.group.color} borderWidths={borderWidths} borderColors={borderColors}>

			{state.isGroupKey &&
				<div className="square-key">{square.group.rule.toLabel()}</div>
			}

			{selected > 0 && selected === state.solution &&
				<div className="square-value" onClick={selectedOnClick}>
					{selected}
				</div>
			}

			{selected > 0 && selected !== state.solution &&
				<div className="square-value error" onClick={selectedOnClick}>
					{selected}
				</div>
			}

			{selected === 0 &&
				<div className="square-digits">
					{digits.map((digit) => {
						const unavailable = square.unavailable.includes(digit);
						const style: CSSProperties = {
							visibility: unavailable ? "hidden" : "visible"
						}
						const excluded = square.excluded.includes(digit);
						let className = "square-digit"
							+ (excluded ? " excluded" : "")
							+ (excluded && digit === square.solution ? " excluded-error" : "");

						return (
							<div className={className} style={style} key={digit}
								onClick={(e) => digitOnClick(digit)}
								onAuxClick={(e) => digitOnAuxClick(e, digit)}
								onContextMenu={(e) => digitOnContextMenu(e, digit)}>
								{digit}
							</div>
						);
					})}
				</div>
			}

			{state.comparisonRight && compareSign != null &&
				// <div className="square-compare-right">{ state.comparisonRight > 0 ? '>' : '<' }</div>
				<CompareSign size={size} angle={rightAngle} className="compare-right"
					dangerouslySetInnerHTML={compareSign} />
			}

			{state.comparisonBottom && compareSign != null &&
				<CompareSign size={size} angle={downAngle} className="compare-down"
					dangerouslySetInnerHTML={compareSign} />
			}
		</SquareContainer>
	)
}

export default SquareComponent;
