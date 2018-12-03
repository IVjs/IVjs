# IVjs

For documentation, please visit <http://ivjs.net>

[Changelog](./CHANGELOG.md)

# Development

Run `npm i` to install dependencies.

Right now the project is developed with TDD. Simply add a test for the functionality you want and run `npm test`

# Testing

Run `npm test` to start all tests.

Files matching `*.spec.ts` will run with Jest, and files matching `*.test.ts` will run with Karma in Chrome.

Run `npm run test:karma` or `npm run test:jest` to test only `.test.ts` or `.spec.ts` files, respectively.

Tests that _can_ run in jsdom should generally be run with Jest. Tests that are a little too crazy to setup that way should be run with Karma.
