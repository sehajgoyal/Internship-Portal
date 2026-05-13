import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const doc = new PDFDocument({ margin: 40, size: 'A4', autoFirstPage: true });
const outputPath = path.join(rootDir, 'Internship_Portal_Source_Code.pdf');
doc.pipe(fs.createWriteStream(outputPath));
const directories = [
  'Backend/controllers',
  'Backend/models',
  'Backend/routes',
  'Backend/utils',
  'Backend/middleware',
  'Backend/index.js',
  'Frontend/src',
  'Frontend/index.html'
];
doc.fontSize(24).text('Internship Portal - Source Code', { align: 'center' });
doc.moveDown();
doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
doc.moveDown(3);
doc.fontSize(14).text('This document contains the complete frontend and backend source code for the Internship Portal web application, organized by file.', { align: 'center' });
function walkSync(currentDirPath, callback) {
    if (!fs.existsSync(currentDirPath)) return;
    const stat = fs.statSync(currentDirPath);
    if (stat.isFile()) {
        callback(currentDirPath);
        return;
    }
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            if (filePath.match(/\.(js|jsx|css|html)$/) && !filePath.includes('node_modules')) {
                callback(filePath);
            }
        } else if (stat.isDirectory()) {
            if (!filePath.includes('node_modules') && !filePath.includes('dist') && !filePath.includes('components/ui')) {
                walkSync(filePath, callback);
            }
        }
    });
}
directories.forEach(dir => {
    const fullPath = path.join(rootDir, dir);
    walkSync(fullPath, (filePath) => {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/\r\n/g, '\n');
        doc.addPage();
        doc.fontSize(16).fillColor('#E50914').text(`File: ${path.relative(rootDir, filePath).replace(/\\/g, '/')}`, { underline: true });
        doc.moveDown();
        doc.fontSize(9).fillColor('#000000').font('Courier').text(content, { 
            lineBreak: true,
            columns: 1
        });
    });
});
doc.end();
console.log(`✅ PDF generated successfully at: ${outputPath}`);
