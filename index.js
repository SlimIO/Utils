// Require NodeJS Dependencies
const { mkdir } = require("fs").promises;

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

// Exports all utils functions
module.exports = {
    taggedString,
    createDirectory
};
