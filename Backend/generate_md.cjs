const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const frontendSrc = path.join(projectRoot, 'Frontend', 'src');
const backendRoot = path.join(projectRoot, 'Backend');

const dirsToScan = [frontendSrc, backendRoot];

let markdownOutput = `# Source Code\n\n`;

function scanDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'build') {
                scanDir(fullPath);
            }
        } else {
            if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
                const relativePath = path.relative(projectRoot, fullPath);
                const ext = path.extname(fullPath).substring(1);
                const content = fs.readFileSync(fullPath, 'utf8');
                markdownOutput += `## \`${relativePath}\`\n\n\`\`\`${ext}\n${content}\n\`\`\`\n\n`;
            }
        }
    }
}

dirsToScan.forEach(scanDir);

fs.writeFileSync(path.join(projectRoot, 'source_code.md'), markdownOutput);
console.log('Markdown generated successfully.');
