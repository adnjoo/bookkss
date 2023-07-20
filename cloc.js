const fs = require('fs');

const countLinesOfCode = (path, extensions) => {
  try {
    const files = fs.readdirSync(path);
    let totalLines = 0;

    files.forEach((file) => {
      const filePath = `${path}/${file}`;
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalLines += countLinesOfCode(filePath, extensions);
      } else if (extensions.some((ext) => file.endsWith(ext))) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content
          .split('\n')
          .filter((line) => line.trim() !== '').length;
        totalLines += lines;
      }
    });

    return totalLines;
  } catch (err) {
    console.error('Error:', err);
    return 0;
  }
};

const srcPath = './src';
const extensionsToCount = ['.ts', '.tsx'];
const linesOfCode = countLinesOfCode(srcPath, extensionsToCount);

const readmeFile = 'README.md';
fs.readFile(readmeFile, 'utf-8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const replace = 'SLOC:';
  const newContent = `${replace} ${linesOfCode}`;

  const result = data.replace(
    new RegExp('^' + replace + '.*', 'm'),
    newContent
  );

  fs.writeFile(readmeFile, result, 'utf-8', function (err) {
    if (err) return console.log(err);
    console.log(`Updated ${readmeFile} with SLOC: ${linesOfCode}`);
  });
});
