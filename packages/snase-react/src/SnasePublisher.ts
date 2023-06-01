import { SnaseSubscriber } from "./interfaces";

export class SnasePublisher {
  private subscribers: SnaseSubscriber[] = [];

  public subscribe(node: SnaseSubscriber) {
    this.subscribers.push(node);
    return () => {
      this.unsusbscribe(node);
    };
  }

  protected publish() {
    this.subscribers.forEach((subscriber) => subscriber.notify("Some message"));
  }

  private unsusbscribe(node: SnaseSubscriber) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== node
    );
  }
}
