# Super Test Example
---
A small sample project demonstrating the different ways you can use Mocha, Chai, and SuperTest to test your Loopback API.

## Dependencies
- [Mocha](https://mochajs.org/): `npm install -g mocha`
- [Loopback](http://loopback.io): `npm install -g strongloop`

## Usage
- Run `npm install` from the root of the directory
- Run `npm t` from the root

## More Information
I wanted to show how internal and external functionality can be tested with a single test runner, Mocha. Mocha handles the internal unit tests while SuperTest handles the API testing with the `supertest-as-promised` module.
Can you figure out how to fix the tests?