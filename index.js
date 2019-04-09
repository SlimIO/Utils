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
 * @memberof utils#
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
 * @memberof utils#
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
 * @memberof utils#
 * @desc Valid an entity object properties
 * @param {!Object} entity Entity object
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 * const entity = {
 *     name: "myEntity",
 *     description: "desc",
 *     parent: 10,
 *     descriptors: {}
 * };
 * assertEntity(entity);
 */
function assertEntity(entity) {
    if (!is.plainObject(entity)) {
        throw new TypeError("entity must be a plainObject");
    }
    if (!is.string(entity.name)) {
        throw new TypeError("entity.name property must be typeof <string>");
    }
    if (!is.nullOrUndefined(entity.description) && !is.string(entity.description)) {
        throw new TypeError("entity.description property must be typeof <string>");
    }
    if (!is.nullOrUndefined(entity.parent) && !is.number(entity.parent)) {
        throw new TypeError("entity.parent property must be typeof <number>");
    }
    if (!is.nullOrUndefined(entity.descriptors) && !is.plainObject(entity.descriptors)) {
        throw new TypeError("entity.descriptors must be a plainObject");
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertMIC
 * @method assertMIC
 * @memberof utils#
 * @desc Valid a Metric Identity Card object properties
 * @param {!Object} mic Metric Identity Card object
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 * const MIC = {
 *     name: "myMIC",
 *     entityId: 1,
 *     unit: "unit",
 *     interval: 10,
 *     max: 100,
 *     description: "desc"
 * };
 * assertMIC(MIC);
 */
function assertMIC(mic) {
    if (!is.plainObject(mic)) {
        throw new TypeError("mic must be a plainObject");
    }
    if (!is.string(mic.name)) {
        throw new TypeError("mic.name property must be typeof <string>");
    }
    if (!is.number(mic.entityId)) {
        throw new TypeError("mic.entityId property must be typeof <number>");
    }
    if (!is.string(mic.unit)) {
        throw new TypeError("mic.unit property must be typeof <string>");
    }
    if (!is.nullOrUndefined(mic.interval) && !is.number(mic.interval)) {
        throw new TypeError("mic.interval property must be typeof <number>");
    }
    if (!is.nullOrUndefined(mic.max) && !is.number(mic.max)) {
        throw new TypeError("mic.max property must be typeof <number>");
    }
    if (!is.nullOrUndefined(mic.description) && !is.string(mic.description)) {
        throw new TypeError("mic.description property must be typeof <string>");
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertAlarm
 * @method assertAlarm
 * @memberof utils#
 * @desc Valid an alarm object properties
 * @param {!Object} alarm Alarm object
 * @returns {void}
 *
 * @throws {TypeError}
 *
 * @example
 * const alarm = {
 *     message: "message",
 *     severity: 1,
 *     entityId: 2,
 *     correlateKey: "test_corrKey"
 * };
 * assertAlarm(alarm);
 */
function assertAlarm(alarm) {
    if (!is.plainObject(alarm)) {
        throw new TypeError("alarm must be a plainObject");
    }
    if (!is.string(alarm.message)) {
        throw new TypeError("alarm.message property must be typeof <string>");
    }
    if (!is.number(alarm.severity)) {
        throw new TypeError("alarm.severity property must be typeof <number>");
    }
    if (!is.number(alarm.entityId)) {
        throw new TypeError("alarm.entityId property must be typeof <number>");
    }
    if (!is.string(alarm.correlateKey)) {
        throw new TypeError("alarm.correlateKey property must be typeof <string>");
    }
}

/**
 * @version 0.6.0
 *
 * @exports utils/assertCorrelateID
 * @method assertCorrelateID
 * @memberof utils#
 * @desc Valid a correlateID
 * @param {!String} CID CorrelateID
 * @returns {void}
 *
 * @throws {TypeError}
 * @throws {Error}
 *
 * @example
 * assertCorrelateID("1#test_corrkey");
 */
function assertCorrelateID(CID) {
    if (typeof CID !== "string") {
        throw new TypeError("CID must be a string");
    }

    if (!/^[0-9]{1,8}#[a-z_]{1,35}$/.test(CID)) {
        throw new Error("Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,35}$");
    }
}

/**
 * @version 0.8.0
 *
 * @exports utils/assertCK
 * @method assertCK
 * @memberof utils#
 * @desc Validate a correlateKey
 * @param {!String} correlateKey correlateKey
 * @returns {void}
 *
 * @throws {TypeError}
 * @throws {Error}
 *
 * @example
 * assertCK("test_corrkey");
 */
function assertCK(correlateKey) {
    if (typeof correlateKey !== "string") {
        throw new TypeError("correlateKey must be a string");
    }

    if (!/^[a-z_]{1,35}$/.test(correlateKey)) {
        throw new Error("Invalid correlateKey! A CK must respect the following Regex: ^[a-z_]{1,35}$");
    }
}

/**
 * @version 0.7.0
 *
 * @exports utils/privateProperty
 * @method privateProperty
 * @memberof utils#
 * @desc Define a private (non-enumable, non-configurable) property on the target
 * @param {!Object} target target object
 * @param {!String | Symbol | Number} propertyKey The name of the property we want to define in target
 * @param {*} [value=null] The property value
 * @returns {void}
 *
 * @throws {Error}
 *
 * @example
 * const SymID = Symbol("id");
 * class User {
 *     constructor() {
 *         privateProperty(this, SymID, 1);
 *     }
 * }
 */
function privateProperty(target, propertyKey, value = null) {
    const ok = Reflect.defineProperty(target, propertyKey, {
        value,
        enumerable: false,
        configurable: false,
        writable: true
    });

    if (!ok) {
        throw new Error("Unable to define private property");
    }
}


// Exports all utils functions
module.exports = {
    taggedString,
    createDirectory,
    assertEntity,
    assertMIC,
    assertAlarm,
    assertCorrelateID,
    assertCK,
    privateProperty
};
