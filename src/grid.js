
// Imports

// import expect from 'expect';

let { totalColumns, columnWidth, gutterWidth, gridPadding, fromDirection, omegaFloat, containerWidth, containerStyle, borderBoxSizing } = require("./settings.js");

let { containerOuterWidth, isDefaultLayout, fixStaticMisalignment, relativeWidth, columns, gutter } = require('./functions.js');

let { rem, unitSpliter, oppositePosition } = require('./func.js');

// ------------------------------------------------------------
// container

// Set the width of a container
//
// columns   : The number of columns in the Grid Layout.


let SetContainerWidth = (columns = totalColumns, style = containerStyle) => {

	let width = containerOuterWidth(columns);

	if (style === "static") {

		return rem("width", width);

	} else {

		if (style === "fluid") {

			if (unitSpliter(width) === "%") {

				return rem("width", width);

			} 

		} else {

			return rem("maxWidth", width); 

		}
	}

};


// expect(SetContainerWidth(12, "magic")).toEqual({"max-width": "59em"});
// console.log("SetContainerWidth passed");






// Set the outer grid-containing element(s).
//
// columns    : The number of columns in the container.

let applyContainer = (columns = totalColumns) => {

	let widthValue = SetContainerWidth(columns);

	let prop, val;

	Object.keys(widthValue).map(i => {
		prop = i;
		val = widthValue[i];
	});


	return Object.assign(
		{},
		{ clear: "both" },
		rem(prop, val),
		rem("paddingLeft", gridPadding),
		rem("paddingRight", gridPadding),
		{ marginLeft: "auto", marginRight: "auto" }
	);

};


// expect(applyContainer(12)).toEqual(
// { clear: "both", marginLeft: "auto", marginRight: "auto", maxWdth: "59em", paddingLeft: "1em", paddingRight: "1em"});

// console.log("applyContainer passed");

let container = (layout = totalColumns) => {

		return applyContainer(layout);

};

// console.log(container(12));


// ---------------------------------------------------------------

// Columns


// Create a grid element spanning any number of 'columns' in a grid 'context'.
// columns   : The number of columns to span.
// context   : [optional] The context (columns spanned by parent).
//           : Context is required on any nested elements.
//           : Context MUST NOT be declared on a root element.
// padding   : [optional] Padding applied to the inside of individual grid columns.
//           : Padding is only output if one or two values are specified (e.g. 1em or 10px 20px)
//          : Padding values are applied only on the horizontal axis in from-to order
// from    : The start direction of your layout (e.g. 'left' for ltr languages)
// style   : The container style to use.

let SpanColumns = (cols, context = totalColumns, omegaPos= false, From = fromDirection, style = fixStaticMisalignment()) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let margin = `margin${to}`;

	let obj = {};
	obj.width = columns(cols, context, style);
	obj[margin] = gutter(context, style);
	obj.float = From;

	if (omegaPos) {
		return omega(From);
	} else {

		return Object.assign({}, obj);

	}
		

};

// console.log(SpanColumns(5));


let omega = (From = fromDirection) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let hack = oppositePosition(omegaFloat);

	let margin = `margin${to}`;

	let obj = {};

	obj.float = omegaFloat;
	obj[margin] = 0;

	return Object.assign({}, obj);

};

// console.log(omega());

// ------------------------------------------------------------

// Reset

// Reset a '+columns' grid element to default block behavior
//
// from   : The start direction of your layout (e.g. 'left' for itr languages)


let resetColumns = (From = fromDirection) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let obj = {};

	obj.float = "none";
	obj.width = "auto";
	let margin = `margin${to}`;

	obj[margin] = "auto";

	console.log(obj);

	return obj;	

};

// console.log(resetColumns());



// Apply to elements previously set as omega.
// This will return floats and margins back to non-omega settings.
//
// context    : [optional] The context (columns spanned by parent).
// from       : The start-direction for your document.
// style      : The container style to use.


let removeOmega = (context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let obj = {};

	obj.float = From;

	let margin = `margin${to}`;

	obj[margin] = gutter(context, style);

	return obj;

};


// console.log(removeOmega());


module.exports = {

	SetContainerWidth,
	container,
	SpanColumns,
	omega,
	resetColumns,
	removeOmega

}