/// <reference types="@slimio/tsd" />

declare namespace Utils {
    export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
    export function createDirectory(dirPath: string): void;
    export function assertEntity(entity: SlimIO.RawEntity): void;
    export function assertMIC(mic: SlimIO.RawIdentityCard): void;
    export function assertAlarm(alarm: SlimIO.RawAlarm): void;
    export function assertCorrelateID(CID: SlimIO.CID): void;
    export function assertCK(correlateKey: string): void;
    export function privateProperty(target: object, propertyKey: string|symbol|number, value: any): void;
}

export as namespace Utils;
export = Utils;
