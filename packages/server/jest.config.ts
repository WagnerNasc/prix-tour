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
    '!<rootDir>/src/controllers/**/*.ts', // TODO: e2e
    '!<rootDir>/src/env/**/*.ts',
    '!<rootDir>/src/helpers/**/*.ts',
    '!<rootDir>/src/infra/**/*.ts',
    '!<rootDir>/src/repositories/**.ts',
    '!<rootDir>/src/repositories/interfaces/**.ts',
    '!<rootDir>/src/use-cases/errors/**/*.ts',
    '!<rootDir>/src/use-cases/factories/**/*.ts',
    '!<rootDir>/src/use-cases/interfaces/**/*.ts',
    '!<rootDir>/src/test/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/routes.ts',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/app.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}

export default config
