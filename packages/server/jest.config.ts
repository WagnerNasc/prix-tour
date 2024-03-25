import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  roots: ['<rootDir>'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/controllers/**/*.ts',
    '!<rootDir>/src/env/**/*.ts',
    '!<rootDir>/src/helpers/**/*.ts',
    '!<rootDir>/src/infra/**/*.ts',
    '!<rootDir>/src/repositories/**.ts',
    '!<rootDir>/src/use-cases/errors/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/routes.ts',
    '!<rootDir>/src/server.ts',
  ],
}

export default config
