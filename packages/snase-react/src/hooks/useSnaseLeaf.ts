import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import z from "zod";
import { SnaseLeaf } from "../SnaseLeaf";

type Snapshot<
  TOutput,
  TDef extends z.ZodTypeDef = z.ZodTypeDef,
  TInput = TOutput
> = {
  value: TInput;
  setValue: (valueOrFn: TInput | ((prev: TInput) => TInput)) => void;
  valid: boolean;
};

const getSnapshot = <
  TOutput,
  TDef extends z.ZodTypeDef = z.ZodTypeDef,
  TInput = TOutput
>(
  leaf: SnaseLeaf<TOutput, TDef, TInput>,
  cache: Snapshot<TOutput, TDef, TInput> | null
) => {
  if (!cache || leaf.value !== cache.value || leaf.valid !== cache.valid) {
    return {
      value: leaf.value,
      valid: leaf.valid,
      setValue: (valueOrFn: TInput | ((prev: TInput) => TInput)) => {
        if (typeof valueOrFn === "function") {
          leaf.value = (valueOrFn as (prev: TInput) => TInput)(leaf.value);
        } else {
          leaf.value = valueOrFn;
        }
      },
    };
  }
  return cache;
};

export const useSnaseLeaf = <
  TOutput,
  TDef extends z.ZodTypeDef = z.ZodTypeDef,
  TInput = TOutput
>(
  leaf: SnaseLeaf<TOutput, TDef, TInput>
) => {
  // const leafRef = useRef(leaf);
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return leaf.subscribe({
        notify: () => {
          onStoreChange();
        },
      });
    },
    [leaf]
  );

  const cacheRef = useRef<Snapshot<TOutput, TDef, TInput>>(
    getSnapshot(leaf, null)
  );

  const getSnapshotMemoized = useCallback(
    (): Snapshot<TOutput, TDef, TInput> => getSnapshot(leaf, cacheRef.current),
    [leaf]
  );

  const { value, setValue, valid } = useSyncExternalStore(
    subscribe,
    getSnapshotMemoized
  );

  return {
    value,
    setValue,
    valid,
  };
};
