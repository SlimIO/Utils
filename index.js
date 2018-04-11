/**
 * @namespace utils
 */
// Require third-party dependencies
const is = require("@sindresorhus/is");

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
                is.number(cle) ? valeurs[cle] : dict[cle],
                chaines[index + 1]
            );
        });

        return resultat.join("");
    };
}

// Exports all utils functions
module.exports = {
	taggedString
};
