// -----------------------------------------------------------

// Isolation

// Imports

let { totalColumns, columnWidth, gutterWidth, gridPadding, fromDirection, omegaFloat, containerWidth, containerStyle, borderBoxSizing } = require("./settings.js");


let { fixStaticMisalignment, space } = require('./functions.js');

let { oppositePosition } = require('./func.js');

// import expect from 'expect';



// Isolation the position of a grid element (use in addition to SpanColumns)
//
// location   : The grid column to isolate in, relative to the container;
// context    : [optional] The context (columns spanned by parent).
// From       : The start direction of your layout (e.g. 'left' for ltr languages)


let isolate = (location, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let obj = {};

	let marginTo = `margin${to}`;
	let marginFrom = From === "left" ? `marginLeft` : `marginRight`;

	obj[marginTo] = "100%";
	obj[marginFrom] = `${space(location - 1, context, style)}`;

	return obj;

};

// console.log(isolate(9, 12));

module.exports = {
	isolate
};