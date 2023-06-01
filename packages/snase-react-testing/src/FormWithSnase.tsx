import { snase, useSnaseLeaf, useSnaseRoot } from "@qte/snase-react";
import { z } from "zod";
import { FC } from "react";
import { SnaseLeaf } from "@qte/snase-react/dist/SnaseLeaf";

const InputThing: FC<{ leaf: SnaseLeaf<string> }> = ({ leaf }) => {
  const { value, setValue } = useSnaseLeaf(leaf);
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};

export const FormWithSnase: FC = () => {
  const form = useSnaseRoot({
    firstName: snase.leaf(z.string(), ""),
    kalas: snase.object({
      bing: snase.leaf(z.string(), ""),
      bong: snase.leaf(z.string(), ""),
    }),
  });
  return (
    <div>
      <h1>With Snase</h1>
      <InputThing leaf={form.get("firstName")} />
      <InputThing leaf={form.get("kalas.bing")} />
      <InputThing leaf={form.get("kalas.bong")} />
    </div>
  );
};
