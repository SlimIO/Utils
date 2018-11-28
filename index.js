// Require NodeJS Dependencies
const { mkdir } = require("fs").promises;

// Require Third-Party Dependencies
const is = require("@slimio/is");

/**
 * @namespace utils
 */

/**
 * @exports utils/taggedString
 * @method taggedString
 * @desc Create a tagged String
 * @param {!String} chaines initial string
 * @param {any[]} cles string keys
 * @returns {Function} Return clojure function to build the final string
 *
 * @example
 * const { taggedString } = require("@slimio/utils");
 *
 * const myStrClojure = taggedString`Hello ${0}!`;
 * console.log(myStrClojure("Thomas")); // stdout: Hello Thomas!
 */
function taggedString(chaines, ...cles) {
    return function cur(...valeurs) {
        const dict = valeurs[valeurs.length - 1] || {};
        const resultat = [chaines[0]];
        cles.forEach((cle, index) => {
            resultat.push(
                typeof cle === "number" ? valeurs[cle] : dict[cle],
                chaines[index + 1]
            );
        });

        return resultat.join("");
    };
}

/**
 * @version 0.3.0
 *
 * @exports utils/createDirectory
 * @method createDirectory
 * @desc overhead method of fs.mkdir (but will no throw an error if the directory already exist!).
 * @param {!String} dirPath directory path
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 * await createDirectory("./debug");
 */
async function createDirectory(dirPath) {
    if (typeof dirPath !== "string") {
        throw new TypeError("dirPath argument should be typeof string");
    }

    try {
        await mkdir(dirPath);
    }
    catch (error) {
        if (error.code !== "EEXIST") {
            throw error;
        }
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertEntity
 * @method assertEntity
 * @desc Valid Entity properties
 * @param {!Object} entity Entity object
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 *
 */
function assertEntity(entity) {
    if (!is.plainObject(entity)) {
        throw new TypeError("entity should be a plainObject!");
    }
    if (!is.string(entity.name)) {
        throw new TypeError("entity.name property should be typeof string");
    }
    if (!is.nullOrUndefined(entity.description) && !is.string(entity.description)) {
        throw new TypeError("entity.description property should be typeof string");
    }
    if (!is.nullOrUndefined(entity.parent) && !is.number(entity.parent)) {
        throw new TypeError("entity.parent property should be typeof number");
    }
    if (!is.nullOrUndefined(entity.descriptors) && !is.plainObject(entity.descriptors)) {
        throw new TypeError("entity.descriptors should be a plainObject!");
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertMIC
 * @method assertMIC
 * @desc Valid Metric Identity Card properties
 * @param {!Object} mic Metric Identity Card object
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 *
 */
function assertMIC(mic) {
    if (!is.plainObject(mic)) {
        throw new TypeError("mic should be a plainObject!");
    }
    if (!is.string(mic.name)) {
        throw new TypeError("mic.name property should be typeof string");
    }
    if (!is.number(mic.entityId)) {
        throw new TypeError("mic.entityId property should be typeof number");
    }
    if (!is.string(mic.unit)) {
        throw new TypeError("mic.unit property should be typeof string");
    }
    if (!is.nullOrUndefined(mic.interval) && !is.number(mic.interval)) {
        throw new TypeError("mic.interval property should be typeof number");
    }
    if (!is.nullOrUndefined(mic.max) && !is.number(mic.max)) {
        throw new TypeError("mic.max property should be typeof number");
    }
    if (!is.nullOrUndefined(mic.description) && !is.string(mic.description)) {
        throw new TypeError("mic.description property should be typeof string");
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertAlarm
 * @method assertAlarm
 * @desc Valid alarm properties
 * @param {!Object} alarm Alarm object
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 *
 */
function assertAlarm(alarm) {
    if (!is.plainObject(alarm)) {
        throw new TypeError("alarm should be a plainObject!");
    }
    if (!is.string(alarm.message)) {
        throw new TypeError("alarm.message property should be typeof string");
    }
    if (!is.number(alarm.severity)) {
        throw new TypeError("alarm.severity property should be typeof number");
    }
    if (!is.number(alarm.entityId)) {
        throw new TypeError("alarm.entityId property should be typeof number");
    }
    if (!is.string(alarm.correlateKey)) {
        throw new TypeError("alarm.correlateKey property should be typeof string");
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertCorrelateID
 * @method assertCorrelateID
 * @desc Valid a correlateID
 * @param {!String} CID CorrelateID
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 *
 */
function assertCorrelateID(CID) {
    if (!/^[0-9]{1,8}#[a-z_]{1,14}$/.test(CID)) {
        throw new Error("Invalid CorrelateID! A CID should respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$");
    }
}


// Exports all utils functions
module.exports = {
    taggedString,
    createDirectory,
    assertEntity,
    assertMIC,
    assertAlarm,
    assertCorrelateID
};
