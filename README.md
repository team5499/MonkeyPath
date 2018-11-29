# MonkeyPath
A spline generator for monkeys.

## Development
This project requires [Node.js](https://nodejs.org), [electron-forge](https://electronforge.io/), python. First, run `npm install`. Next, run `pip install -r requirements-dev-minimal.txt`. Then, run `npm run tox` which will install the pre-commit hooks, as well as run the hooks.

To run unit tests and pre-commit hooks, run `npm test`. To just run pre-commit hooks, run `npm run tox`. To start the application, run `npm start`. To package the application and make a distributable application, run `npm run make`. For this last command, electron-forge is required.

## Windows Users
On windows, node and npm will need to be installed natively, not just in the WSL. Go ahead and install Nodejs for windows from the link above. Then, to make sure `npm` is up to date, run ` npm install -i npm -g` in the Command Prompt. Change to the project directory, and run `npm install` to install the windows specific node packages. After this, bash may be used for everything else. All the same commands as stated above will work, except for `npm make`. Right now, this only seems to work in the Command Prompt AND if the directory `virtualenv_run` is deleted.
