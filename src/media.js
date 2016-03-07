// -----------------------------------------------------------------------

// Media Functions


// Imports

let { totalColumns, columnWidth, gutterWidth, gridPadding, fromDirection, omegaFloat, containerWidth, containerStyle, borderBoxSizing } = require('./settings.js');


let { container } = require('./grid.js');






// Nest a block of code inside a new media-query.

// media      : a list of values [min max]


let atBreakpoint = (media, content, fontSize = "16px") => {


	if (media.min || media.max) {


		if (media.min && media.max) {

			let obj = {};


			let mediaQuery = `@media (min-width: ${media.min}) and (max-width: ${media.max})`;

			obj[mediaQuery] = content;

			return obj;

		} else {

			if (!media.min && !media.max) {

				console.error("min-width is not specified");

			}

			if (media.min) {

				let obj = {};

				let mediaQuery = `@media (min-width: ${media.min})`;

				obj[mediaQuery] = content;

				return obj;

			}

			if (media.max) {

				let obj = {};

				let mediaQuery = `@media (max-width: ${media.max})`;

				obj[mediaQuery] = content;

				return obj;

			}


		}

	}

};

// console.log(atBreakpoint({max: "30em"}, {display: "inline", margin: "1px"}));


module.exports = {
	atBreakpoint
};