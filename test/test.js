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
    assertCorrelateID,
    assertCK,
    privateProperty
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

avaTest("assertEntity() must throw TypeError on invalid payload", (assert) => {
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

avaTest("assertEntity() must be ok", (assert) => {
    const entity = { name: "myEntity" };

    const ret = assertEntity(entity);
    assert.is(ret, void 0);

    const ret2 = assertEntity({ ...entity, description: "desc", parent: 10, descriptors: {} });
    assert.is(ret2, void 0);
});

avaTest("assertMIC() must throw TypeError on invalid payload", (assert) => {
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

avaTest("assertMIC() must be ok", (assert) => {
    const MIC = {
        name: "myMIC", entityId: 1, unit: "unit"
    };

    const ret = assertMIC(MIC);
    assert.is(ret, void 0);

    const ret2 = assertMIC({ ...MIC, interval: 10, max: 10, description: "desc" });
    assert.is(ret2, void 0);
});

avaTest("assertAlarm() must throw TypeError on invalid payload", (assert) => {
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

avaTest("assertAlarm() must be ok", (assert) => {
    const ret = assertAlarm({
        message: "message",
        severity: 1,
        entityId: 2,
        correlateKey: "test_corrKey"
    });
    assert.is(ret, void 0);
});

avaTest("assertCorrelateID(null) must throw TypeError", (assert) => {
    assert.throws(() => {
        assertCorrelateID(null);
    }, { instanceOf: TypeError, message: "CID must be a string" });
});

avaTest("assertCorrelateID('1-hello_world') must be rejected by regex", (assert) => {
    const message = "Invalid CorrelateID! A CID must respect the following Regex: ^[0-9]{1,8}#[a-z_]{1,35}$";
    assert.throws(() => {
        assertCorrelateID("1-hello_world");
    }, { instanceOf: Error, message });
});

avaTest("assertCorrelateID('1#test_corrkey') must be ok", (assert) => {
    const ret = assertCorrelateID("1#test_corrkey");
    assert.is(ret, void 0);
});

avaTest("assertCK(null) must throw TypeError", (assert) => {
    assert.throws(() => {
        assertCK(null);
    }, { instanceOf: TypeError, message: "correlateKey must be a string" });
});

avaTest("assertCK('') must be rejected by regex", (assert) => {
    assert.throws(() => {
        assertCK("");
    }, { instanceOf: Error, message: "Invalid correlateKey! A CK must respect the following Regex: ^[a-z_]{1,35}$" });
});

avaTest("assertCK('test_ck') is ok", (assert) => {
    const ret = assertCK("test_ck");
    assert.is(ret, void 0);
});

avaTest("privateProperty() must throw on Freezed Object", (assert) => {
    const _o = Object.freeze({});
    assert.throws(() => {
        privateProperty(_o, "yo");
    }, { instanceOf: Error, message: "Unable to define private property" });
});

avaTest("privateProperty() is non-enumerable", (assert) => {
    const _o = {};
    privateProperty(_o, "yo");
    assert.deepEqual(Object.keys(_o), []);
    assert.deepEqual(Reflect.ownKeys(_o), ["yo"]);
});

avaTest("privateProperty() is non-configurable (but writable)", (assert) => {
    const _o = {};
    privateProperty(_o, "yo");
    assert.deepEqual(Reflect.ownKeys(_o), ["yo"]);
    delete _o.yo;
    assert.deepEqual(Reflect.ownKeys(_o), ["yo"]);

    _o.yo = 10;
    assert.is(_o.yo, 10);
});
