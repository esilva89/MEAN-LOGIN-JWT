// Define the methods of my custom response.
const customResponse = {};

/**
 * Create a custom response by default.
 * 
 * @method createCustomResponse.
 * @return JSON: custom response by default.
 */
customResponse.createCustomResponse = () => {
    return {
        status: -1,
        msg: '',
        data: {},
        method: '',
        line: -1
    };
};

/**
 * Create a custom response with parameters specific.
 * 
 * @method setCustomResponse.
 * @param status: a number that indicates the state of the response.
 * @param msg: a string that indicates the message of the response.
 * @param data: a JSON that indicates the data of the response.
 * @param method: a string that indicates the method that failed.
 * @param line: a number that indicates the line that failed.
 * @param show: a boolean that indicate if the method and the line that failed will be showed.
 * @return JSON: return custom response.
 */
customResponse.setCustomResponse = (status, msg, data, method, line, show) => {
    //? check if the method and the line that failed will be showed.
    if(show) {
        return { status, msg, data, method, line };
    } else {
        return { status, msg, data };
    }
};

/**
 * Set the method and line that failed.
 * 
 * @method setInfoCustomResponse.
 * @param info: a JSON object with status, msg and data of the response.
 * @param method: a string that indicates the message of the response.
 * @param line: a JSON that indicates the line that failed.
 * @param show: a boolean that indicate if the method and the line that failed will be showed.
 * @return JSON: return custom response.
 */
customResponse.setInfoCustomResponse = (info, method, line, show) => {
    //? check if the method and the line that failed will be showed.
    if(show) {
        return {
            status: info.status,
            msg: info.msg,
            data: info.data,
            method,
            line
        };
    } else {
        return info;
    }
};

/**
 * Set the response with status 404.
 * 
 * @method setNotUserFoundResponse.
 * @param method: a string that indicates the message of the response.
 * @param line: a JSON that indicates the line that failed.
 * @param show: a boolean that indicate if the method and the line that failed will be showed.
 * @return JSON: return response with status 404.
 */
customResponse.setNotUserFoundResponse = (method, line, show) => {
    //? check if the method and the line that failed will be showed.
    if(show) {
        return {
            status: 404,
            msg: 'Not found user',
            data: {},
            method,
            line
        };
    } else {
        return {
            status: 404,
            msg: 'Not found user',
            data: {}
        };
    }
};

module.exports = customResponse;