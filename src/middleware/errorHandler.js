const path = require('path');
const projectRoot = path.resolve(__dirname, '..', '..');

function errorHandler(err, req, res, next) {
    let file = 'Not available', line = 'Not available';

    if (err.stack) {
        const stackLines = err.stack.split('\n');
        const relevantLine = stackLines.length > 1 ? stackLines[1].trim() : '';
        const match = relevantLine.match(/\((.+):(\d+):(\d+)\)$/);

        if (match) {
            file = path.relative(projectRoot, match[1]);
            line = match[2];
        }
    }

    const errorResponse = {
        message: err.message,
        file,
        line
    };

    res.status(err.status || 500).json(errorResponse);
}

module.exports = errorHandler;

