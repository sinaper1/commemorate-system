// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const fs = require('fs');

const pathFn = (url) => {
    const root = path.resolve(__dirname, '..');

    return path.resolve(root, url);
};

const getEntry = () => {
    const rootDir = pathFn('./components');

    const files = fs.readdirSync(rootDir, {
        encoding: 'utf-8',
        withFileTypes: true,
    });

    const entry = files.reduce((prev, { name }) => {
        const ignore = ['.DS_Store', 'style', 'index.jsx'].includes(name);

        if (!ignore) {
            // eslint-disable-next-line no-param-reassign
            prev[name] = path.join('', `${rootDir}/${name}/index.js`);
        }

        return prev;
    }, {});

    return entry;
};

module.exports = { getEntry, pathFn };