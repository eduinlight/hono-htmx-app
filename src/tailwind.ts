import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/postcss";
import postcss from "postcss";

export async function buildTailwindCSS() {
	const inputPath = path.join(process.cwd(), "src/styles.css");
	const outputPath = path.join(process.cwd(), "public/css/styles.css");

	try {
		const inputCSS = fs.readFileSync(inputPath, "utf8");

		postcss([tailwindcss()])
			.process(inputCSS, {
				from: inputPath,
				to: outputPath,
			})
			.then((result) => {
				fs.writeFileSync(outputPath, result.css);

				console.log(`✅ Tailwind CSS compiled to ${outputPath}`);
			});
	} catch (err) {
		console.error("❌ Failed to compile:", err);
	}
}
