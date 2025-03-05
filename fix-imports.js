const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'dist');

function addJsExtension(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const result = data.replace(/(import\s+.*\s+from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
        // For relative imports that don't already have an extension, add the .js extension.
        if (p2.startsWith('.') && !p2.match(/\.[^\/]+$/)) {
            return `${p1}${p2}.js${p3}`;
        }
        return match;
    });
    fs.writeFileSync(filePath, result, 'utf8');
}

function processDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                processDirectory(filePath);
            } else if (filePath.endsWith('.js')) {
                addJsExtension(filePath);
            }
        });
    });
}

processDirectory(directoryPath);