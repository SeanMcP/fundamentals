type Comparator<T> = (a: T, b: T) => number;

export class Heap<T> {
  private data: Array<T> = [];
  private compare: Comparator<T>;

  constructor(compare: Comparator<T>) {
    // Explicit because paramter properties are odd
    // @see https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
    this.compare = compare;
  }

  get dump() {
    return JSON.stringify(this.data, null, 2);
  }

  get size() {
    return this.data.length;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  push(item: T) {
    this.data.push(item);
    this.siftUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length <= 1) {
      return this.data.pop();
    }
    const first = this.data[0];
    const last = this.data.pop();
    if (last !== undefined) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return first;
  }

  private siftUp(i: number) {
    while (i > 0) {
      const parentIdx = this.getParentIndex(i);

      // If this item should come after its parent, then break
      if (this.compare(this.data[i], this.data[parentIdx]) >= 0) {
        break;
      }
      this.swap(i, parentIdx);
      i = parentIdx;
    }
  }

  private siftDown(i: number) {
    while (true) {
      const leftIdx = this.getChildIndex("L", i);
      const rightIdx = this.getChildIndex("R", i);

      let preferredChildIdx: number;
      if (this.isValidIndex(leftIdx) && this.isValidIndex(rightIdx)) {
        // If left should come after right, then choose right; else left
        preferredChildIdx =
          this.compare(this.data[leftIdx], this.data[rightIdx]) >= 0
            ? rightIdx
            : leftIdx;
      } else if (this.isValidIndex(leftIdx)) {
        preferredChildIdx = leftIdx;
      } else {
        // There is a right child but no left child (bad) OR there are no children
        break;
      }

      // If parent should come before child, then break
      if (this.compare(this.data[i], this.data[preferredChildIdx]) <= 0) {
        break;
      }
      this.swap(i, preferredChildIdx);
      i = preferredChildIdx;
    }
  }

  private swap(i: number, j: number) {
    const original = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = original;
  }

  private getParentIndex(i: number) {
    return Math.floor((i - 1) / 2);
  }

  private getChildIndex(direction: "L" | "R", i: number) {
    return 2 * i + (direction === "L" ? 1 : 2);
  }

  private isValidIndex(i: number): boolean {
    return i >= 0 && i < this.data.length;
  }
}
