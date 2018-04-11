const avaTest = require("ava");
const { taggedString } = require("../index");

/**
 * Test Utils.taggedString method
 */
avaTest("taggedString", (test) => {
    const clojureHello = taggedString`Hello ${0}`;
    test.is(clojureHello(), "Hello ");
    test.is(clojureHello("world"), "Hello world");

    const clojureFoo = taggedString`Hello ${"word"}`;
    test.is(clojureFoo({ word: "bar" }), "Hello bar");
});
