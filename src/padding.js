// -------------------------------------------------

// { Imports }

let { totalColumns, columnWidth, gutterWidth, gridPadding, fromDirection, omegaFloat, containerWidth, containerStyle, borderBoxSizing } = require("./settings.js");

let { fixStaticMisalignment, space } = require('./functions.js');

let { oppositePosition } = require('./func.js');


// Padding Functions....

// add empty columns as padding before an element.
// columns   : The number of columns to prefix.
// context   : [optional] The context (columns spanned by parent).
//           : Context is required on any nested element.
//           : Context Must Not be declared on a root element.
// From      : The start direction of your layout (e.g. 'left' for ltr languages)
// style     : The container style to use.


let prefix = (columns, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let fromDir = From === "left" ? "Left" : "Right";

	let obj = {};

	let padding = `padding${fromDir}`;

	obj[padding] = `${space(columns, context, style)}`;	

	return obj;

};

// console.log(prefix(3));



// add empty columns as padding after an element.
// columns    : The number of columns to suffix.
// context    : [optional] The context (columns spanned by parent).
//            : Context is required on any nested elements.
//            : Context Must Not be declared on a root element.
// From       : The start direction of your layout (e.g. 'left' for ltr languages)
// style      : The container style to use.



let suffix = (columns, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let obj = {};

	let padding = `padding${to}`;

	obj[padding] = `${space(columns, context, style)}`;

	return obj;

};

// console.log(suffix(3));




// add empty columns as padding before and after an element.
// columns    : The number of columns to pad.
// context    : [optional] The context (columns spanned by parent).
//            : Context is required on any nested elements.
//            : Context Must Not be declared on a root element.
// From       : The start direction of your layout(e.g. 'left' for ltr languages)
// style      : The container style to use.

let pad = (_prefix = false, _suffix = false, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let obj = {};

	if (_prefix) {

		obj.prefix = prefix(_prefix, context, From, style);

	}	

	if (_suffix) {

		obj.suffix = suffix(_suffix, context, From, style);

	}

	return Object.assign({}, obj.prefix, obj.suffix);


};

// console.log(pad(1, 1));



module.exports = {
	prefix,
	suffix,
	pad
};