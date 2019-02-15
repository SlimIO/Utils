/// <reference types="node" />
/// <reference types="@types/node" />
/// <reference types="@slimio/tsd" />

/**
 * Utils namespace
 */
declare namespace Utils {
    export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
    export function createDirectory(dirPath: string): void;
    export function assertEntity(entity: SlimIO.RawEntity): void;
    export function assertMIC(mic: SlimIO.RawIdentityCard): void;
    export function assertAlarm(alarm: SlimIO.RawAlarm): void;
    export function assertCorrelateID(CID: string): void;
    export function privateProperty(target: object, propertyKey: string|symbol|number, value: any): void;
}

export as namespace Utils;
export = Utils;
