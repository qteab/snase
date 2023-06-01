import { useSnaseRoot } from "~/hooks";
import { snase } from "..";
import { renderHook } from "@testing-library/react";
import z from "zod";

describe("useSnase", () => {
  it("does some things", () => {
    const leaf2 = snase.leaf(z.string(), "leaf 2 stuff");
    const rootHook = renderHook(() =>
      useSnaseRoot({
        hihi: snase.leaf(z.string(), "hihi stuff"),
        haha: snase.object({
          hhoho: leaf2,
        }),
      })
    );

    // const x = useSnase({
    //   hihi: snase.leaf(z.string()),
    //   haha: snase.object({
    //     hhoho: leaf2,
    //   }),
    // });

    // const leafHook = render

    // console.log(rootHook.result);

    // console.log(rootHook.result.current.value);

    console.log("Get", rootHook.result.current.get("haha.hhoho"));
    // const kalas = snase.object({
    //   hihi: snase.leaf(z.string()),
    //   haha: snase.object({
    //     hhoho: leaf2,
    //   }),
    // });

    leaf2.value = "Hejsan hoppsan";

    expect(true).toBe(true);
  });
});
