// ---------------------------------------------------------

// Imports

// We need access to some basic font-settings for handling media-queries.

// ...... ?? need verticalRhythm ??

// For now, we alson need this...

let browserDefaultFontSizePX = "16px";
let browserDefaultFontSizePercent = "100%";
let browserDefaultFontSizePT = "12pt";

let remWithPXFallback = true;

// ---------------------------------------------------------
// Import Settings 

let { totalColumns, columnWidth, gutterWidth, gridPadding, fromDirection, omegaFloat, containerWidth, containerStyle, borderBoxSizing } = require("./settings.js");


// import expect from 'expect';




// Return a list with specific items removed
//
// filter(list, target)
// - list    : The list Array to filter
// - target  : An item to be removed from the list Array.

let filter = (list, target) => {

	return list.filter(i => i !== target);

};

//expect(filter(["a", "b", "c"], "b")).toEqual(["a", "c"], "filter function");
// console.log('filter passed');


let percentage = (val) => {
	return `${val}%`;
};

// expect(percentage(7)).toEqual("7%");
// console.log("percentage passed");



// Return a the unit from given string containing value and unit.
//
// string     : a string with value and unit

let unitParse = (string, unit) => {
	let rgxp = new RegExp(unit, "g");
	return string.match(rgxp);
};


// expect(unitParse("1px", "px")).toEqual(["px"]);
// console.log("test passed");


let unitSpliter = (string) => {
	let unit = string.match(/[a-zA-Z%]+/g);
	return unit[0];
};

//console.log(unitSpliter("2em") === unitSpliter("3em") ? true : false);





// --------------------------------------------------------
// -----------------------------------------------------------
// Grid Functions



// Return the grid width after adding or subtracting grid padding
//
// width       : the width of the grid without padding;
//operation    : ( add | subtract ) if padding should be added or subtracted;

let handleGridPadding = (width, operation = "subtract") => {

	let unit = unitSpliter(width);

	let _width = parseFloat(width, 10);

	let pad = parseFloat(gridPadding, 10) * 2;


	if( unitSpliter(width) === unitSpliter(gridPadding) ) {
		return (operation === "subtract" ? `${_width - pad}${unit}` : `${_width + pad}${unit}`);
	} else {
		console.warn("_gridPadding must be set in units comperable to the container width.");
	}

};


// expect(handleGridPadding("31em", "subtract")).toEqual("29em", "handle grid padding");
// console.log('handleGridPadding passed');







// Return the full outer width of a Container element.
//
// columns    : The number of columns in the grid Layout.
// width      : containerWidth

let containerOuterWidth = ( columns = totalColumns, width = containerWidth ) => {
	
	let _width = parseFloat(width, 10);

	let outerWidth = (width) ? width : columnsWidth(columns);
	if (width) {
		if (!borderBoxSizing) {
			outerWidth = handleGridPadding(outerWidth, "subtract");
		} 
	} else {
		if (borderBoxSizing) {
			outerWidth = handleGridPadding(outerWidth, "add");
		}
	}

	return outerWidth;

};



// expect(containerOuterWidth(12, "90em")).toEqual("88em", "container outer width");
// console.log("containerOuterWidth passed");





// Don't use static output when it will break things

// Switch element-level output to fluid, when container-width is wrong for static
//
// fixStaticMisalignment(style, width)
// - style: containerStyle.
// - width: containerWidth.


let fixStaticMisalignment = (style = containerStyle, width = containerWidth) => {

	if (width && width != containerOuterWidth(false)) {
		return "fluid";
	} else {

		return style;
		
	}

};


// expect(fixStaticMisalignment("static", "80em")).toEqual("fluid", "fix static misalignment"); 
// console.log('fixStaticMisalignment passed');





// Return the full width of a grid based on your grid settings.
//
// columns : The number of columns to get width for.


let columnsWidth = ( columns = totalColumns ) => {

	let unit = unitSpliter(columnWidth);

	let _columnWidth = parseFloat(columnWidth);

	let totalWidthOfColumns = columns * _columnWidth;
	let totalGutterWidth = ((columns >= 1) ? Math.ceil(columns -1) : 0) * parseFloat(gutterWidth, 10);
	let total = totalWidthOfColumns + totalGutterWidth;

	if (Math.round(columns) !== columns) {
		console.warn("Susy.js works best with integer column-spans. For partial-columns, you may need to finesse the math by hand using functions directly.");
	} else {

		return `${total}${unit}`;

	}

};

// expect(columnsWidth()).toEqual("59em", "columns Width");
// console.log('columnsWidth passed');













// Return the percentage width of a given value in a given 'context'.
//
// width         : Any given width value.
// context       : The grid context in columns, if nested.

let relativeWidth = (width, context = totalColumns) => {

	return percentage(Math.floor((parseFloat(width, 10) / parseFloat(columnsWidth(context))) * 100));

};



// expect(relativeWidth(12)).toEqual("20%", "relativeWidth");
// console.log("relativeWidth passed");









// Return the percentage width of a single column in a given 'context'
//
// context     : The grid context in columns, if nested.
// style       : The container style to use.

let column = (context = totalColumns, style = fixStaticMisalignment()) => {

	return (
		style === "static" ? columnWidth : relativeWidth(columnWidth, context)
	);
		
};

// expect(column(12, "static")).toEqual("4em", "column");
// console.log("column passed");





// Return the percentage width of multiple 'columns' in a given 'context'.
//
// columns      : The number of columns to get relative width for.
// context      : The grid context in columns, if nested.
// style        : The container style to use.

let columns = (columns, context = totalColumns, style = fixStaticMisalignment()) => {

	return (
		style === "static" ? columnsWidth(columns) : relativeWidth(columnsWidth(columns), context)
	);

};



// expect(columns(12, 12, "static")).toEqual("59em", "columns");
// console.log("columns passed");





// Return the percentage width of a single gutter in a given 'context'.
//
// context       : The grid context in columns, if nested.
// style         : The container style to use.

let gutter = (context = totalColumns, style = fixStaticMisalignment()) => {


	let _gutterWidth = parseFloat(gutterWidth, 10);

	return (
		(style === "static" ? gutterWidth : relativeWidth(_gutterWidth, context))
	);

};

// expect(gutter(12,"magic")).toEqual("1%", "gutter");
// console.log("gutter passed");








// Return the total space occupied by multiple columns and associated gutters.
// Useful for adding padding or margins (prefix, suffix, push, pull, etc.)
//
// columns        : The number of columns to get relative space for.
// context        : The grid context in columns, if nested.
// style          : The container style to use.

let space = (column, context = totalColumns, style = fixStaticMisalignment()) => {

	let unit = unitSpliter(columns(column, context, style));

	let widthColumns = parseFloat(columns(column, context, style), 10);
	let widthGutter = column >= 1 ? parseFloat(gutter(context, style), 10) : 0;

	let total = widthColumns + widthGutter;

	return `${total}${unit}`;

};


// expect(space(12, 12, "static")).toEqual("60em", "space");
// console.log("space passed");




// Accept a list including column-count and (optional) position.
// Return either the column count or the position alone.
//
// columns       : the list to split and interprate.
// request       : The value to return, either 'columns' or 'position'.

let splitColumnsValue = (columns, request = "columns") => {



};





// Accept nth-selector variables, and format them as a valid CSS3 selector.
//
// n               : [first | only | last | <equation>]
// selector        : [child | last-child | of-type | last-of-type]

let formatNth = (n = "last", selector = "child") => {

	if (n === "last" || n === "first" || n === "only") {
		return `${n}-${selector}`;
	} else {
		return `nth-${selector}(${n})`;
	}

};

// expect(formatNth(2)).toEqual("nth-child(2)", "formatNth");
// console.log("formatNth passed");




// ---------------------------------------------------------------
// Media Functions



// Return and em value adjusted to match the browser default font size.
// Note: This only works if actual sizes are set relative to browser defaults.
//
// ems              : The initial value to be converted.
// fontSize         : The current font-size in.


let baseEms = (ems, fontSize = "16px") => {

	let fontSizes = unitSpliter(ems, "rem") === "rem" ? "16px" : fontSize;
	let mult = parseFloat(ems, 10) / (parseFloat(ems, 10) * 0 + 1);

	if (unitSpliter(fontSizes, "px") == "px") {

		return `${parseFloat(fontSizes) / parseFloat(browserDefaultFontSizePX, 10) * mult * 1}em`;

	} else if (unitSpliter(fontSizes, "%") == "%") {

		return `${parseFloat(fontSizes, 10) / parseFloat(browserDefaultFontSizePercent, 10) * mult * 1}em`;

	} else if (unitSpliter(fontSizes, "em") == "em") {

		return `${parseFloat(fontSizes, 10) / 1 * mult * 1}em`;

	} else if (unitSpliter(fontSizes, "pt") == "pt") {

		return `${parseFloat(fontSizes, 10) / browserDefaultFontSizePT * mult *1}em`;

	} else {

		console.warn('Variable $base-font-size does not have a valid font unit. Valid units for fonts in CSS are px, pt, em, and %.');

	}

};


// expect(baseEms("16px")).toEqual("16em", "baseEms");
// console.log("baseEms passed");








// This name will be deprecated...

let absoluteEms = (ems, fontSize) => {

	return baseEms(ems, fontSize);

};










// Return a length, after any em-values have been sent through absoluteEms().
//
// length      : The length value to be checked and adjusted if necessary.
// font-size   : The current font-size in px.

let fixEms = (length, fontSize = "16px") => {

	if(length) {

		if(unitSpliter(length) == "em" || unitSpliter(length) == "rem") {
			return absoluteEms(length, fontSize);
		}
	
	}
	
};




// Sort a list of arguments into "min layout max" order, and return the list.
//
// mdiea-layout    : a list of values [min layout max] .......

let mediaLayout = (layout, fontSize = "16px") => {

	let media = {};

	media.min = (typeof layout.min === 'undefined') ? false : fixEms(layout.min);
	media.max = (typeof layout.max === 'undefined') ? false : fixEms(layout.max); 
	media.layout = (typeof layout.layout === 'undefined') ? false : layout.layout;	

	return media;

};

// expect(mediaLayout({min: "50em", max: "60em", layout: 12})).toEqual({min: "50em", max: "60em", layout: 12});
// console.log('mediaLayout passed');








// Return the nearest layout (column-count) above a given breakpoint.
//
// min : The min-width media-query breakpoint above which to establish a new layout.

let getLayout = (min) => {

	min = fixEms(min);

	if (unitSpliter(min) === unitSpliter(columnWidth)) {

		return Math.ceil((parseFloat(min) + parseFloat(gutterWidth)) / (parseFloat(columnWidth) + parseFloat(gutterWidth)));

	} else {
		console.warn("Can't determine a layout, because min and columnWidth are not comparable");
	}

};

// console.log(getLayout("20em"));



// Check to see if a given mediaLayout list is simply the default.
//
// mediaLayout    : a list of values including ............
//                : One unitless number (columns in a layout)
//                : Two optional lengths (min and max-width media-query breakpoints).

let isDefaultLayout = (layout) => {

	let media = mediaLayout(layout);

	if(media.min || media.max) {
		return false;
	} else {
		return (media.layout === totalColumns) ? true : false;
	}

};



// expect(isDefaultLayout({min: "80em", layout: 12})).toEqual(false);
// console.log("isDefaultLayout passed");

module.exports = {
	handleGridPadding,
	containerOuterWidth,
	fixStaticMisalignment,
	columnsWidth,
	relativeWidth,
	column,
	columns,
	gutter,
	space,
	splitColumnsValue,
	formatNth,
	baseEms,
	absoluteEms,
	fixEms,
	mediaLayout,
	getLayout,
	isDefaultLayout
};