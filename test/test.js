// Require NodeJS Dependencies
const { rmdir, access } = require("fs").promises;
const { join } = require("path");

// Require Third-Party Dependencies
const avaTest = require("ava");

// Require Internal Dependencies
const {
    taggedString,
    createDirectory,
    assertEntity,
    assertMIC,
    assertAlarm,
    assertCorrelateID
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

avaTest("assertEntity() TypeError", (assert) => {
    const name = "myEntity";

    let error = assert.throws(() => {
        assertEntity(10);
    });
    assert.is(error.message, "entity must be a plainObject");

    error = assert.throws(() => {
        assertEntity({});
    });
    assert.is(error.message, "entity.name property must be typeof <string>");
    error = assert.throws(() => {
        assertEntity({ name: 10 });
    });
    assert.is(error.message, "entity.name property must be typeof <string>");

    error = assert.throws(() => {
        assertEntity({ name, description: 10 });
    });
    assert.is(error.message, "entity.description property must be typeof <string>");

    error = assert.throws(() => {
        assertEntity({ name, parent: "test" });
    });
    assert.is(error.message, "entity.parent property must be typeof <number>");

    error = assert.throws(() => {
        assertEntity({ name: "myEntity", descriptors: 10 });
    });
    assert.is(error.message, "entity.descriptors must be a plainObject");
});

avaTest("assertEntity()", (assert) => {
    const entity = {
        name: "myEntity"
    };

    assertEntity(entity);

    Reflect.set(entity, "description", "desc");
    Reflect.set(entity, "parent", 10);
    Reflect.set(entity, "descriptors", {});

    assertEntity(entity);
    assert.pass();
});

avaTest("assertMIC() TypeError", (assert) => {
    const name = "myMIC";
    const entityId = 1;
    const unit = "unit";
    let error = assert.throws(() => {
        assertMIC(10);
    });
    assert.is(error.message, "mic must be a plainObject");

    error = assert.throws(() => {
        assertMIC({});
    });
    assert.is(error.message, "mic.name property must be typeof <string>");
    error = assert.throws(() => {
        assertMIC({ name: 10 });
    });
    assert.is(error.message, "mic.name property must be typeof <string>");

    error = assert.throws(() => {
        assertMIC({ name });
    });
    assert.is(error.message, "mic.entityId property must be typeof <number>");
    error = assert.throws(() => {
        assertMIC({ name, entityId: "test" });
    });
    assert.is(error.message, "mic.entityId property must be typeof <number>");

    error = assert.throws(() => {
        assertMIC({ name, entityId });
    });
    assert.is(error.message, "mic.unit property must be typeof <string>");
    error = assert.throws(() => {
        assertMIC({ name, entityId, unit: 10 });
    });
    assert.is(error.message, "mic.unit property must be typeof <string>");

    error = assert.throws(() => {
        assertMIC({ name, entityId, unit, interval: "test" });
    });
    assert.is(error.message, "mic.interval property must be typeof <number>");

    error = assert.throws(() => {
        assertMIC({ name, entityId, unit, max: "test" });
    });
    assert.is(error.message, "mic.max property must be typeof <number>");

    error = assert.throws(() => {
        assertMIC({ name, entityId, unit, description: 10 });
    });
    assert.is(error.message, "mic.description property must be typeof <string>");
});

avaTest("assertMIC()", (assert) => {
    const MIC = {
        name: "myMIC",
        entityId: 1,
        unit: "unit"
    };

    assertMIC(MIC);

    Reflect.set(MIC, "interval", 10);
    Reflect.set(MIC, "max", 10);
    Reflect.set(MIC, "description", "desc");

    assertMIC(MIC);
    assert.pass();
});

avaTest("assertAlarm() TypeError", (assert) => {
    const message = "message";
    const severity = 1;
    const entityId = 2;

    let error = assert.throws(() => {
        assertAlarm(10);
    });
    assert.is(error.message, "alarm must be a plainObject");

    error = assert.throws(() => {
        assertAlarm({});
    });
    assert.is(error.message, "alarm.message property must be typeof <string>");
    error = assert.throws(() => {
        assertAlarm({ message: 10 });
    });
    assert.is(error.message, "alarm.message property must be typeof <string>");

    error = assert.throws(() => {
        assertAlarm({ message });
    });
    assert.is(error.message, "alarm.severity property must be typeof <number>");
    error = assert.throws(() => {
        assertAlarm({ message, severity: "test" });
    });
    assert.is(error.message, "alarm.severity property must be typeof <number>");

    error = assert.throws(() => {
        assertAlarm({ message, severity });
    });
    assert.is(error.message, "alarm.entityId property must be typeof <number>");
    error = assert.throws(() => {
        assertAlarm({ message, severity, entityId: "test" });
    });
    assert.is(error.message, "alarm.entityId property must be typeof <number>");

    error = assert.throws(() => {
        assertAlarm({ message, severity, entityId });
    });
    assert.is(error.message, "alarm.correlateKey property must be typeof <string>");
    error = assert.throws(() => {
        assertAlarm({ message, severity, entityId, correlateKey: 10 });
    });
    assert.is(error.message, "alarm.correlateKey property must be typeof <string>");
});


avaTest("assertAlarm()", (assert) => {
    const alarm = {
        message: "message",
        severity: 1,
        entityId: 2,
        correlateKey: "test_corrKey"
    };

    assertAlarm(alarm);
    assert.pass();
});

avaTest("assertCorrelateID() Error", (assert) => {

    let error = assert.throws(() => {
        assertCorrelateID();
    });
    assert.is(error.message, "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$");

    error = assert.throws(() => {
        assertCorrelateID(10);
    });
    assert.is(error.message, "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$");

    error = assert.throws(() => {
        assertCorrelateID(true);
    });
    assert.is(error.message, "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$");

    error = assert.throws(() => {
        assertCorrelateID({});
    });
    assert.is(error.message, "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$");

    error = assert.throws(() => {
        assertCorrelateID([]);
    });
    assert.is(error.message, "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$");
});

avaTest("assertCorrelateID()", (assert) => {
    assertCorrelateID("1#test_corrkey");
    assert.pass();
});
