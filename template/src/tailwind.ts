import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import postcss from "postcss";
import { createHash } from "node:crypto";

function hash(content: string): string {
	return createHash("sha256").update(content).digest("hex");
}

export async function buildTailwindCSS(): Promise<boolean> {
	const inputPath = path.join(process.cwd(), "src/styles.css");
	const outputPath = path.join(process.cwd(), "public/css/styles.css");

	try {
		const inputCSS = fs.readFileSync(inputPath, "utf8");

		const previousCSS = fs.readFileSync(outputPath, "utf8");
		const previousCSSHash = hash(previousCSS);

		const result = await postcss([tailwindcss()]).process(inputCSS, {
			from: inputPath,
			to: outputPath,
		});

		const newCSSHash = hash(result.css);
		const hasChanged = newCSSHash !== previousCSSHash;

		if (hasChanged) {
			fs.writeFileSync(outputPath, result.css);
			console.log(`✅ Tailwind CSS compiled to ${outputPath}`);
		}

		return hasChanged;
	} catch (err) {
		console.error("❌ Failed to compile:", err);
		return false;
	}
}
