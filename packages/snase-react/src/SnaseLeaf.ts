import { z } from "zod";
import { SnasePublisher } from "./SnasePublisher";
import { SnaseValueGetter, SnaseValueSetter } from "./interfaces";

// const x = z.string();
// z.tuple();

export type AnySnaseLeaf = SnaseLeaf<any, any, any>;

type SnaseLeafOptions = {
  mode: "onChange" | "all";
};

export class SnaseLeaf<
    TOutput,
    TDef extends z.ZodTypeDef = z.ZodTypeDef,
    TInput = TOutput
  >
  extends SnasePublisher
  implements SnaseValueGetter<TInput>, SnaseValueSetter<TInput>
{
  private _value: TInput;
  private _valid: boolean = false;
  private _touched: boolean = false;

  private options: SnaseLeafOptions;
  // private changed: boolean = false;

  constructor(
    private readonly schema: z.ZodType<TOutput, TDef, TInput>,
    initialValue: TInput,
    options?: Partial<SnaseLeafOptions>
  ) {
    super();
    this._value = initialValue;
    this.options = {
      mode: "onChange",
      ...options,
    };
  }

  // parse() {
  //   return this.schema.parse(this.value);
  // }

  public get value() {
    return this._value;
  }

  public set value(value: typeof this._value) {
    this._value = value;
    if (this.options.mode === "onChange" || this.options.mode === "all") {
      this.validate();
    }
    this.publish();
  }

  public get touched() {
    return this._touched;
  }

  public get valid() {
    return this._valid;
  }

  public validate() {
    const result = this.schema.safeParse(this._value);
    this._valid = result.success;
    return result;
  }

  // public set state(value: any) {
  //   this.publish();
  // }

  // public get state() {
  //   return {
  //     value: this.value,
  //     touched: this.touched,
  //     changed: this.changed,
  //   };
  // }
}

export const createSnaseLeaf = <
  TOutput,
  TDef extends z.ZodTypeDef = z.ZodTypeDef,
  TInput = TOutput
>(
  schema: z.ZodType<TOutput, TDef, TInput>,
  initialValue: TInput
) => new SnaseLeaf(schema, initialValue);
