import { createSnaseObject } from "./SnaseObject";
import { createSnaseLeaf } from "./SnaseLeaf";
export { useSnaseRoot, useSnaseLeaf } from "./hooks";

// export const snase

export const snase = {
  object: createSnaseObject,
  leaf: createSnaseLeaf,
};
