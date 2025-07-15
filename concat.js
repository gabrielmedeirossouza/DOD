import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, "Source");
const outputFile = path.resolve(__dirname, "Project.ts");

function getAllTsFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.flatMap(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return getAllTsFiles(fullPath);
        }
        if (entry.isFile() && fullPath.endsWith(".ts")) {
            return [fullPath];
        }
        return [];
    });
}

function concatFiles(files) {
    const result = [];

    for (const file of files) {
        const relativePath = path.relative(__dirname, file).replace(/\\/g, "/");
        const content = fs.readFileSync(file, "utf-8");

        result.push(`// ${relativePath}\n${content}\n`);
    }

    return result.join("\n");
}

function writeOutputFile(content) {
    fs.writeFileSync(outputFile, content, "utf-8");
    console.log(`Arquivo final gerado em: ${outputFile}`);
}

const files = getAllTsFiles(sourceDir);
const finalContent = concatFiles(files);
writeOutputFile(finalContent);
