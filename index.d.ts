/// <reference types="node" />
/// <reference types="@types/node" />

/**
 * Utils namespace
 */
declare namespace Utils {
    export function taggedString(str: string, ...keys: any[]): (...keys: any[]) => string;
    export function createDirectory(dirPath: string): void;
}

export as namespace Utils;
export = Utils;
