// Import Helpers

'use strict';

let { oppositePosition } = require("./func.js");


// Settings


// The total number of columns in the grid
let totalColumns = 12;

// The width of columns and gutters.
// These must all be set with the comparable units.
let columnWidth = "4em"; // em
let gutterWidth = "1em"; // em

// Padding on the left and right of a Grid Container.
let gridPadding = gutterWidth;

// ------------------------------------------------------------

// Advance Settings

// From Direction:
// Controls for right-to-left or bi-directional sites.
let fromDirection = "left";

// Omega Float Direction:
// The direction that +omega elements are floated by defult.

let omegaFloat = oppositePosition(fromDirection);

// Container Width:
// Override the total width of your grid, using any length(50em, 75%, etc.)
let containerWidth = false;

//Container Style:
// 'magic'  -  Static (fixed or elastic) when there's enough space,
//             fluid when there isn't. This the SUSY MAGIC SAUCE(TM).
// 'static' -  Forces the grid container to remain static at all times.
// 'fluid'  -  Forces the grid to remain fluid at all times.
//             (this will overrule any static containerWidth settings)
let containerStyle = "magic";

// Border-Box Sizing
// Adjust the grid math appropriately for box-sizing: border-box;
// Warning: This does not actually apply the new box model!
// In most cases you can ignore this setting,
// and simply apply the border-box-sizing mixin.
let borderBoxSizing = false;

// ---------------------------------------------------------------------------
// IE Settings

// When you are using a seperate IE stylesheet,
// you can use these settings to control the output of at-breakpoint.
// By default, at-breakpoint will output media-queries as well as
// any defined ie-fallback classes.

let breakpointMediaOutput = true;
let breakpointIEOutput = true;

// Danger Zone! Only set as 'true' in IE-specific style sheets.
let breakpointRawOutput = false;

module.exports = {
	totalColumns,
	columnWidth,
	gutterWidth,
	gridPadding,
	fromDirection,
	omegaFloat,
	containerWidth,
	containerStyle,
	borderBoxSizing
};
