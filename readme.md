#Susy

All Thanks goes to sass [susy](https://github.com/oddbird/susy)

Susy is Now in JavaScript.
Its is For Awesome Reactjs.
Works great with Radium.


```
npm install raduim --save
npm install https://github.com/iaziz/susy --save
```

##Settings

####Default

```
totalColumns: 12,
columnWidth: "4em",
gutterWidth: "1em",
gridPadding: "gutterWidth",

```

##Basics

###container

Establish the outer grid-containing element.

```
container(totalColumns)
```
+ totalColumns, Default: 12;

###SpanColumns

Align an element to the Susy Grid.

```
SpanColumns(cols, context, omegaPos, From, style);

```

+ cols: The number of Columns to span.
+ context: Current nesting Context. Default: totalColumns.
+ omegaPos: Optional flag to signal the last element in a row.
+ From: The origin direction of your document flow. Default: fromDirection.
+ style: Optionally return static lengths for grid calculations. Default: cotainerStyle.

###omega

Apply to any omega element as an override.

```
omega(From);

```
+ From: The origin direction of your document flow.Default: fromDirection.



###atBreakpoint

```
atBreakpoint({max: maxWidth}, {content});

```

or

```

atBreakpoint({min: minWidth}, {content});

```

or

```

atBreakpoint({min: minWidth, max: maxWidth}, {content});

```
+ min: min Width;
+ max: max Width;
+ content: is an Object; e.g. : { display: inline, margin: "10px"};


##Example

```

import React from 'react';

import { StyleRoot } from 'radium';

import { container, SpanColumns, atBreakpoint } from 'susyjs';

export let App = React.createClass({

	render() {

		return (

			<StyleRoot>
				<div style={container(12)}>
					<h1 style={[
						SpanColumns(6),
						atBreakpoint({max: "28em"}, SpanColumns(12))
					]}>
						Hello World
					</h1>
					<h1 style={SpanColumns(6)}>Hey Wats up</h1>
				</div>
			</StyleRoot>

		);

	}

});

```

####There is other features which is not included yet.Doc is Incomplete.
