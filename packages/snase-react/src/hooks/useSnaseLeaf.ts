import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import z from "zod";
import { SnaseLeaf } from "../SnaseLeaf";

export const useSnaseLeaf = <
  TOutput,
  TDef extends z.ZodTypeDef = z.ZodTypeDef,
  TInput = TOutput
>(
  leaf: SnaseLeaf<TOutput, TDef, TInput>
) => {
  type Return = {
    value: TInput;
    setValue: (value: TInput) => void;
    valid: boolean;
  };
  console.log("Render hook");
  // const leafRef = useRef(leaf);
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return leaf.subscribe({
        notify: () => {
          console.log("Notifying react");
          onStoreChange();
        },
      });
    },
    [leaf]
  );

  const cacheRef = useRef<Return>({
    value: leaf.value,
    valid: leaf.valid,
    setValue: (value: TInput) => {
      leaf.value = value;
    },
  });

  const getSnapshot = useCallback((): Return => {
    if (
      leaf.value !== cacheRef.current.value ||
      leaf.valid !== cacheRef.current.valid
    ) {
      cacheRef.current = {
        ...cacheRef.current,
        value: leaf.value,
        valid: leaf.valid,
      };
    }
    return cacheRef.current;
  }, [leaf]);

  const { value, setValue, valid } = useSyncExternalStore(
    subscribe,
    getSnapshot
  );

  return {
    value,
    setValue,
    valid,
  };
};
