import { FC } from "react";
import { FormWithoutSnase } from "./FormWithoutSnase";
import { FormWithSnase } from "./FormWithSnase";

export const App: FC = () => {
  return (
    <>
      <FormWithoutSnase />
      <FormWithSnase />
    </>
  );
};
