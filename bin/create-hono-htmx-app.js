#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { mkdirSync, cpSync, readFileSync, writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectName = process.argv[2] || "hono-htmx-app";
const templateDir = join(__dirname, "..", "template");

console.log(`Creating ${projectName}...`);

mkdirSync(projectName, { recursive: true });

cpSync(templateDir, projectName, { recursive: true });

const packageJsonPath = join(projectName, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
packageJson.name = projectName;
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`✅ ${projectName} created successfully!`);
console.log(`\nNext steps:`);
console.log(`  cd ${projectName}`);
console.log(`  make install`);
