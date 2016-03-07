'use strict';


// Return a the unit from given string containing value and unit.
//
// string     : a string with value and unit

let unitSpliter = (string) => {
	let unit = string.match(/[a-zA-Z%]+/g);
	return unit[0];
};

//console.log(unitSpliter("2em") === unitSpliter("3em") ? true : false);

let convertLength = (length, toUnit, fromContext = "16px", toContext = fromContext) => {

	let fromUnit = unitSpliter(length);

	if (fromUnit === toUnit) {

		return length;

	}

	if (unitSpliter(fromContext) !== "px") {

		console.warn("Parameter fromContext must resolve to a value in pixel units.");

	}

	if (unitSpliter(toContext) !== "px") {

		console.warn("Parameter toContext must resolve to a value in pixel units.");

	}

	let pxLength = length;

	if (fromUnit !== "px") {

		switch(fromUnit) {
			case "em":
				pxLength = `${parseFloat(length, 10) * parseFloat(fromContext, 10)}px`;
				break;
			case "rem":
				pxLength = `${parseFloat(length, 10) * parseFloat(fromContext, 10)}px`;
				break;
			case "%":
				pxLength = `${parseFloat(length, 10) * parseFloat(fromContext, 10)}px`;
				break;

		}

	}

	let outputLength = pxLength;

	if (toUnit !== "px") {

		switch(toUnit) {
			case "em":
				outputLength = `${parseFloat(pxLength, 10) / parseFloat(toContext)}em`;
				break;
			case "rem":
				outputLength = `${parseFloat(pxLength, 10) / parseFloat(toContext)}rem`;
				break;
			case "%":
				outputLength = `${parseFloat(pxLength, 10) / parseFloat(toContext)}%`;
				break;

		}

	}

	return outputLength;

};



let rem = (property, value) => {

	let unit = unitSpliter(value);

	let val = {};
	val[property] = value;

	if(unit === "px" || unit === "em" || unit === "rem" || unit === "%") {
		val[property] = convertLength(value, "rem");
		return val;
	}
	return val;
};

// expect(rem("width", "5%")).toEqual({width: "5rem"});
// console.log("rem passed");

let oppositePosition = (position) => {
	switch(position) {
		case "left":
			return "right";
		case "right":
			return "left";
	}
};



module.exports = {
	unitSpliter,
	rem,
	oppositePosition
};