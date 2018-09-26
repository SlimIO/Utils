// Require NodeJS Dependencies
const { rmdir, access } = require("fs").promises;
const { join } = require("path");

// Require Third-Party Dependencies
const avaTest = require("ava");

// Require Internal Dependencies
const {
    taggedString,
    createDirectory
} = require("../index");

avaTest("taggedString", (assert) => {
    const clojureHello = taggedString`Hello ${0}`;
    assert.is(clojureHello(), "Hello ");
    assert.is(clojureHello("world"), "Hello world");

    const clojureFoo = taggedString`Hello ${"word"}`;
    assert.is(clojureFoo({ word: "bar" }), "Hello bar");
});

avaTest("createDirectory", async(assert) => {
    const debugDir = join(__dirname, "debug");
    await createDirectory(debugDir);
    await createDirectory(debugDir);
    await access(debugDir);
    await rmdir(debugDir);
    assert.pass();
});

avaTest("createDirectory (dirPath should be typeof string)", async(assert) => {
    const error = await assert.throws(createDirectory(5), TypeError);
    assert.is(error.message, "dirPath argument should be typeof string");
});
