// ---------------------------------------------------------------


// { Imports }

let { totalColumns, columnWidth, gutterWidth, gridPadding, fromDirection, omegaFloat, containerWidth, containerStyle, borderBoxSizing } = require("./settings.js");

let { fixStaticMisalignment, space } = require('./functions.js');

let { oppositePosition } = require('./func.js');


// Margin Functions


// Apply 'columns' margin before an element to push it along the grid.
//
// columns   : The number of columns to span.
// context   : [optional] The context (columns spanned by parent).
//           : Context is required on any nested elements.
//           : Context Must Not be declared on a root element.
// From      : The start direction of your layout (e.g. 'left' for ltr languages)
// style     : The container style to use.


let pre = (columns, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let fromDir = From === "left" ? "Left" : "Right";

	let obj = {};

	let margin = `margin${fromDir}`;

	obj[margin] = `${space(columns, context, style)}`;

	return obj;

};


// console.log(pre(3));





// Apply negative 'columns' margin before an element to pull it along the grid.
//
// columns    : The number of columns to span.
// context    : [optional] The context (columns spanned by parent).
//            : Context is required on any nested elements.
//            : Context Must Not be declared on a root element.
// From       : The start direction of your layout (e.g. 'left' for ltr languages)
// style      : The container style to use.

let pull = (columns, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let obj = {};

	let margin = `margin${to}`;

	obj[margin] = `-${space(columns, context, style)}`;

	return obj;

};

// console.log(pull(3));





// Apply 'columns' margin after an element to contain it in a grid.
//
// columns   : The number of columns to span.
// context   : [optional] The context (columns spanned by parent).
//           : Context is required on any nested elements.
//           : Context Must Not be declared on a root elements.
// From      : The start direction of your layout (e.g. 'left' for ltr languages)
// style     : The container style to use.


let post = (columns, context, From = fromDirection, style = fixStaticMisalignment()) => {

	let to = oppositePosition(From) === "left" ? "Left" : "Right";

	let obj = {};

	let margin = `margin${to}`;

	obj[margin] = `${space(columns, context, style)}`;

	return obj; 

}


// console.log(post(3));





// Apply 'columns' before and /or after an element to contain it on a grid.
//
// pre     : The number of columns to add as margin before.
// post    : The number of columns to add as margin after.
// context : [optional] The context (columns spanned by parent).
//         : Context is required on any nested elements.
//         : Context Must Not be declared on a root element.
// From    : The start direction of your layout (e.g. 'left' for ltr languages)
// style   : The container style to use.


let squish = (_pre = false, _post = false, context = totalColumns, From = fromDirection, style = fixStaticMisalignment()) => {

	let obj = {};

	if (_pre) {

		obj.pre = pre(_pre, context, From, style);

	} 

	if (_post) {

		obj.post = post(_post, context, From, style);

	}

	return Object.assign({}, obj.pre, obj.post);

};


// console.log(squish(3,2));


module.exports = {
	pre,
	pull,
	post,
	squish
};