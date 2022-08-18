import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        clearMocks: true,
        preset: 'ts-jest',
        rootDir: "./",
        roots: ["./tests/"],
        setupFilesAfterEnv: ["./tests/setup.js"],
        testEnvironment: "node",
        testTimeout: 50000,
    };
};