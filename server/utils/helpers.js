// Define the methods that will be shared by the different server modules.
const helpers = {};

/**
 * Check if a JSON object is empty.
 * 
 * @method isEmptyJSON.
 * @return true if the JSON object is empty; false otherwise.
 */
helpers.isEmptyJSON = (json) => {
    return Object.entries(json).length === 0 && json.constructor === Object;
};

/**
 * Print a JSON object in an easy-to-read format.
 * 
 * @method printPrettyJSON.
 * @param json: JSON object that will print in an easy-to-read format.
 */
helpers.printPrettyJSON = (json) => {
    console.log(JSON.stringify(json, null, 2));
};

/**
 * Print a test title with a custom style.
 * 
 * @method setHeaderTest.
 * @param header: a string characters that represent the test title.
 */
helpers.setHeaderTest = (header) => {
    return `//========================= ${header} =========================//`;
};

/**
 * Print the data that is send and receive at moment test case execute.
 * 
 * @method printInfoTestCase.
 * @param nro: a number that represent the test case.
 * @param dataSend: a JSON that represent the data that is send.
 * @param dataReceived: a JSON that represent the data that is receive.
 */
helpers.printInfoTestCase = (nro, dataSend, dataReceived) => {
    console.log(`//================== ${nro}. send ==================//`);
    console.log(JSON.stringify(dataSend, null, 2));
    console.log(`//================== ${nro}. resp ==================//`);
    console.log(JSON.stringify(dataReceived, null, 2));
}

module.exports = helpers;