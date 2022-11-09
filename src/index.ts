import process from 'process';
import fs from 'fs-extra';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cli = () => {
  const projectName = process.argv[2];
  const curPath = process.cwd();
  const finalPath = path.resolve(curPath, projectName);
  const templatePath = path.resolve(__dirname, '../template');
  try {
    fs.mkdirSync(finalPath);
    fs.copySync(templatePath, finalPath);
    const pkgJsonPath = path.resolve(finalPath, 'package.json');
    const file = fs.readFileSync(pkgJsonPath);
    const parse = JSON.parse(file.toString());
    parse.name = projectName;
    fs.writeFileSync(pkgJsonPath, JSON.stringify(parse));
  } catch (e) {
    console.error(e);
  }
};

cli();
