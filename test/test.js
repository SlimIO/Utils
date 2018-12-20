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
    await assert.throwsAsync(createDirectory(5), {
        instanceOf: TypeError, message: "dirPath argument should be typeof string"
    });
});

avaTest("assertEntity() TypeError", (assert) => {
    const name = "myEntity";

    assert.throws(() => {
        assertEntity(10);
    }, { instanceOf: TypeError, message: "entity must be a plainObject" });

    assert.throws(() => {
        assertEntity({});
    }, { instanceOf: TypeError, message: "entity.name property must be typeof <string>" });

    assert.throws(() => {
        assertEntity({ name: 10 });
    }, { instanceOf: TypeError, message: "entity.name property must be typeof <string>" });

    assert.throws(() => {
        assertEntity({ name, description: 10 });
    }, { instanceOf: TypeError, message: "entity.description property must be typeof <string>" });

    assert.throws(() => {
        assertEntity({ name, parent: "test" });
    }, { instanceOf: TypeError, message: "entity.parent property must be typeof <number>" });

    assert.throws(() => {
        assertEntity({ name: "myEntity", descriptors: 10 });
    }, { instanceOf: TypeError, message: "entity.descriptors must be a plainObject" });
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
    assert.throws(() => {
        assertMIC(10);
    }, { instanceOf: TypeError, message: "mic must be a plainObject" });

    assert.throws(() => {
        assertMIC({});
    }, { instanceOf: TypeError, message: "mic.name property must be typeof <string>" });

    assert.throws(() => {
        assertMIC({ name: 10 });
    }, { instanceOf: TypeError, message: "mic.name property must be typeof <string>" });

    assert.throws(() => {
        assertMIC({ name });
    }, { instanceOf: TypeError, message: "mic.entityId property must be typeof <number>" });

    assert.throws(() => {
        assertMIC({ name, entityId: "test" });
    }, { instanceOf: TypeError, message: "mic.entityId property must be typeof <number>" });

    assert.throws(() => {
        assertMIC({ name, entityId });
    }, { instanceOf: TypeError, message: "mic.unit property must be typeof <string>" });

    assert.throws(() => {
        assertMIC({ name, entityId, unit: 10 });
    }, { instanceOf: TypeError, message: "mic.unit property must be typeof <string>" });

    assert.throws(() => {
        assertMIC({ name, entityId, unit, interval: "test" });
    }, { instanceOf: TypeError, message: "mic.interval property must be typeof <number>" });

    assert.throws(() => {
        assertMIC({ name, entityId, unit, max: "test" });
    }, { instanceOf: TypeError, message: "mic.max property must be typeof <number>" });

    assert.throws(() => {
        assertMIC({ name, entityId, unit, description: 10 });
    }, { instanceOf: TypeError, message: "mic.description property must be typeof <string>" });
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

    assert.throws(() => {
        assertAlarm(10);
    }, { instanceOf: TypeError, message: "alarm must be a plainObject" });

    assert.throws(() => {
        assertAlarm({});
    }, { instanceOf: TypeError, message: "alarm.message property must be typeof <string>" });

    assert.throws(() => {
        assertAlarm({ message: 10 });
    }, { instanceOf: TypeError, message: "alarm.message property must be typeof <string>" });

    assert.throws(() => {
        assertAlarm({ message });
    }, { instanceOf: TypeError, message: "alarm.severity property must be typeof <number>" });

    assert.throws(() => {
        assertAlarm({ message, severity: "test" });
    }, { instanceOf: TypeError, message: "alarm.severity property must be typeof <number>" });

    assert.throws(() => {
        assertAlarm({ message, severity });
    }, { instanceOf: TypeError, message: "alarm.entityId property must be typeof <number>" });

    assert.throws(() => {
        assertAlarm({ message, severity, entityId: "test" });
    }, { instanceOf: TypeError, message: "alarm.entityId property must be typeof <number>" });

    assert.throws(() => {
        assertAlarm({ message, severity, entityId });
    }, { instanceOf: TypeError, message: "alarm.correlateKey property must be typeof <string>" });

    assert.throws(() => {
        assertAlarm({ message, severity, entityId, correlateKey: 10 });
    }, { instanceOf: TypeError, message: "alarm.correlateKey property must be typeof <string>" });
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
    const message = "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,14}$";
    assert.throws(() => {
        assertCorrelateID();
    }, { instanceOf: Error, message });

    assert.throws(() => {
        assertCorrelateID(10);
    }, { instanceOf: Error, message });
});

avaTest("assertCorrelateID()", (assert) => {
    assertCorrelateID("1#test_corrkey");
    assert.pass();
});
