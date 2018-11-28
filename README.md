# MonkeyPath
A spline generator for monkeys.

## Development
This project requires [Node.js](https://nodejs.org), [electron-forge](https://electronforge.io/), python. First, run `npm install`. Next, run `pip install -r requirements-dev-minimal.txt`. Then, run `npm run tox` which will install the pre-commit hooks, as well as run the hooks.

To run unit tests and pre-commit hooks, run `npm test`. To just run pre-commit hooks, run `npm run tox`. To start the application, run `npm start`. To package the application and make a distributable application, run `npm make`. For this last command, electron-forge is required.
