import fs from "fs";
import path from "path";

export default function redirectPlugin({
  outputFile1,
  outputFile2,
  content1,
  content2,
}) {
  return {
    name: "my-plugin",
    generateBundle(options, bundle) {
      const outputPath = options.dir || options.file;
      const outputDir = path.dirname(outputPath);

      // Write the contents of outputFile1
      fs.writeFileSync(path.join(outputDir, outputFile1), content1);

      // Write the contents of outputFile2
      fs.writeFileSync(path.join(outputDir, outputFile2), content2);
    },
  };
}
