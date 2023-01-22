import { existsSync, readFileSync } from 'node:fs';

function readJson(jsonPath: string): object {
  try {
    if (!existsSync(jsonPath)) {
      throw new Error(`Json ${jsonPath} não foi encontrado!`);
    }
    const rawdata = readFileSync(jsonPath);
    const parsedData = JSON.parse(rawdata.toString());
    return parsedData;
  } catch (e: any) {
    console.log(`error: ${e.message}`);
    return {};
  }
}

export { readJson };
