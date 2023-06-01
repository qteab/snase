import z from "zod";
import { snase } from ".";
import { SnaseObject } from "./SnaseObject";

// https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
// https://plainenglish.io/blog/advanced-typescript-type-level-nested-object-paths
// https://dev.to/tylim88/typescript-generate-full-path-type-and-get-value-type-for-nested-object-4hi

type DotJoin<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
];

// export type Paths<T, D extends number = 10> = [D] extends [never]
//   ? never
//   : T extends object
//   ? {
//       [K in keyof T]-?: K extends string | number
//         ? `${K}` | DotJoin<K, Paths<T[K], Prev[D]>>
//         : never;
//     }[keyof T]
//   : "";

export type SnaseShapePath<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends SnaseObject<infer TShape>
  ? {
      [K in keyof TShape]-?: K extends string | number
        ? // ? TShape[K] extends SnaseObject<any>
          `${K}` | DotJoin<K, SnaseShapePath<TShape[K], Prev[D]>>
        : // : never
          never;
    }[keyof TShape]
  : "";

export type SnaseTypeFromShapePath<
  T,
  Path extends SnaseShapePath<T>
> = T extends SnaseObject<infer TShape>
  ? Path extends `${infer K}.${infer Rest}`
    ? TShape[(K extends `${infer R extends number}` ? R : K) &
        keyof TShape] extends infer S
      ? S extends never
        ? never
        : Rest extends SnaseShapePath<S>
        ? SnaseTypeFromShapePath<S, Rest>
        : never
      : never
    : TShape[(Path extends `${infer R extends number}` ? R : Path) &
        keyof TShape]
  : never;

// export type Leaves<T, D extends number = 10> = [D] extends [never]
//   ? never
//   : T extends object
//   ? { [K in keyof T]-?: DotJoin<K, Leaves<T[K], Prev[D]>> }[keyof T]
//   : "";

// const x = snase.object({
//   hihi: snase.leaf(z.string(), "hihi stuff"),
//   haha: snase.object({
//     hhoho: snase.leaf(z.string()),
//   }),
// });

// type XSnasePaths = SnaseShapePath<typeof x>;

// type XHihiType = SnaseTypeFromShapePath<typeof x, "hihi">;
// type XHahaType = SnaseTypeFromShapePath<typeof x, "haha">;
// type XHahahaHhohoType = SnaseTypeFromShapePath<typeof x, "haha.hhoho">;

// const y = snase.object({});

// type YSnasePaths = SnasePaths<typeof y>;

// const a = snase.object({
//   hihi: snase.leaf(z.string()),
// });

// type APaths = Paths<typeof a>
// type DotJoinTest = DotJoin<'haha', Paths<typeof a>>

// type LeafPaths = SnasePaths<(typeof a)/*["shape"]["hihi"]*/>;
