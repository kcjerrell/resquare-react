const codeA = `<?xml version="1.0" encoding="utf-8"?>
<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0L19.5 10L0 20" transform="translate(1 1)" id="New-shape-2" fill="`

const codeB = `" fill-rule="evenodd" stroke="`
const codeC = `" stroke-width="2" />
</svg>`;

export function getCompare(fill: string, stroke: string = "#000000") {
	return {
		__html: `${codeA}${fill}${codeB}${stroke}${codeC}`
	}
}
