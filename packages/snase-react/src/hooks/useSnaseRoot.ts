import { AnySnaseObject, createSnaseObject } from "../SnaseObject";
import { useRef } from "react";
import { AnySnaseLeaf } from "../SnaseLeaf";

export const useSnaseRoot = <
  TShape extends {
    [k: string]: AnySnaseObject | AnySnaseLeaf;
  }
>(
  shape: TShape
) => {
  // // useSyncExternalStore();
  // const stateRef = useRef({
  //   kalas: new TextField(z.string(), "Tjoho"),
  // });

  const rootRef = useRef(createSnaseObject(shape));

  // const subscribe = () => {};

  // const child = () => {};

  // return {
  //   subscribe,
  // };
  return rootRef.current;
};
