// this code is here for later examples to work
let square: any;

/*
I made this file a .ts file so I could get syntax coloring for any examples I might write

The project structure thus far looks like this:

src>
	app>													contains high-level redux toolkit stuff
		hooks.ts										like the AppDispatch and useAppSelector
		store.ts										The redux store, and types required for react/redux in typescript

	components>										The project's React components
		Puzzle.tsx									Renders the Puzzle
		Square.tsx									Renders individual squares within the Puzzle
		SquareStyles.tsx						Styles for the Square component

	model>												Referring to these as helper classes. They are created dynamically
		group.ts										as state changes, providing state-derived values and related functionality
		puzzle.ts
		rule.ts
		square.ts

	notes>												dev commentary
		you're reading it!

	state>												classes, interfaces, and functions that relate to the react/redux state
		interfaces.ts								interfaces used throughout the project. possibly should be split up, including here only state related interfaces
		loader.ts										functionality to create a PuzzleState from RawPuzzleData
		puzzleSlice.ts							The redux toolkit implementation of the PuzzleState, actions, and dispatch
		selectors.ts								functions that can be used with useSelector (actually useAppSelector) to select specific slices of state

	theme>
		groupColors.ts							a class that calculates distinct colors for neighboring square groups (not a factory, something else)

	utilities>
		array.ts										provides functions to help select, find, and iterate over items in a linear array representing a 2d square
		util.ts											various utility functions

	App.tsx/css 									The App component
	index.tsx/css 								The index component
*/

/*
Current issues to ponder:
 - I initially was planning on using js proxies on the helper classes to mutate state automatically, without having to
 	 use action creators or dispatch directly. For instance:
*/

square.selected = 7;

/*
	would automatically create a SelectDigit action object and dispatch it.

	I am rethinking this idea, because it's really not that hard to dispatch an action from the component itself
	It's more idiomatic for react/redux, and my intended pattern would be confusing unless you knew that's how it worked
	(js proxies are not obvious at all!) As this projects sole developer, I can naturally do whatever the hell I feel like.
	but for employment/resume sake, I think I'm going to drop the proxies. Redux toolkit uses immer anyway (which is
	effectively the same concept - except they had it first and it's definitely more thoroughly tested. Although I truly
	DID have the idea on my own independently. *modesty*) Proxies are annoying to debug (on the dev side, as well as
	consumer) and make for less readable code. I think I'll follow redux best practice.

	but for now i'm gonna smoke a cig and go to bed. I might even brush my teeth somewhere in there. (but i'm on a shower
	strike, so it's gonna be stinky sleep time.) ;)
*/

/*
	So yeah, I'm gonna take out the proxy idea. Here's my todo list:

	-	Remove the square proxy
	- Update the square selection bit so the dispatch is called directly from the square component
	- Implement the rendering of the comparison symbols for comparison groups
	-	implement square group hints
	- create the puzzle solver (for puzzle hints and for puzzle generation)
	- puzzle generator/creator
*/

export { };
