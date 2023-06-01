import { AnySnaseLeaf, SnaseLeaf } from "./SnaseLeaf";
import { SnasePublisher } from "./SnasePublisher";
import { SnaseSubscriber, SnaseValueGetter } from "./interfaces";
import { SnaseShapePath, SnaseTypeFromShapePath } from "./typeHelpers";

export type AnySnaseObject = SnaseObject<any>;

export class SnaseObject<
    TShape extends {
      [k: string]: AnySnaseObject | AnySnaseLeaf;
    }
  >
  extends SnasePublisher
  implements
    SnaseSubscriber,
    SnaseValueGetter<{ [k in keyof TShape]: TShape[k]["value"] }>
{
  // private children: Array<AnySnaseObject | AnySnaseLeaf> = [];

  constructor(private readonly shape: TShape) {
    super();
    Object.values(shape).forEach((node) => {
      node.subscribe(this);
    });

    // this.children.forEach((child) => child.subscribe(this));
  }

  public notify(message: any) {
    this.publish();
  }

  public get value() {
    const r: any = {};
    Object.entries(this.shape).forEach(([key, node]) => {
      r[key] = node.value;
    });
    return r as { [k in keyof TShape]: TShape[k]["value"] };
  }

  public get<Path extends SnaseShapePath<this>>(
    path: Path
  ): SnaseTypeFromShapePath<this, Path> {
    const keys = path.split(".");
    const level1Key = keys.shift();
    if (!level1Key) {
      throw new Error("Key not provided");
    }
    const sub = this.shape[level1Key];
    if (sub instanceof SnaseObject) {
      return sub.get(keys.join("."));
    } else if (sub instanceof SnaseLeaf) {
      return sub as SnaseTypeFromShapePath<this, Path>;
    }
    throw new Error("Unexpected value ");
  }

  public validate() {}
}

export const createSnaseObject = <
  TShape extends {
    [k: string]: AnySnaseObject | AnySnaseLeaf;
  }
>(
  shape: ConstructorParameters<typeof SnaseObject<TShape>>[0]
) => new SnaseObject(shape);
