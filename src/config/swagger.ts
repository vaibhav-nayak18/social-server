import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = fs.readFileSync(
  path.resolve(__dirname, "../../swagger.yaml"),
  "utf8",
);
export const swaggerDocument = YAML.parse(file);
