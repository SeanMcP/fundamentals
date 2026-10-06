// @ts-expect-error
import test from "node:test";
// @ts-expect-error
import assert from "node:assert/strict";
import { Heap } from "./heap.ts";

test("should maintain the heap property when pushing elements", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(5);
  heap.push(3);
  heap.push(8);
  heap.push(1);
  assert.strictEqual(heap.peek(), 1);
});

test("should handle popping a heap with one item", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(1);
  assert.strictEqual(heap.pop(), 1);
  assert.strictEqual(heap.peek(), undefined);
});

test("should handle popping a heap with zero items", () => {
  const heap = new Heap<number>((a, b) => a - b);
  assert.strictEqual(heap.pop(), undefined);
  assert.strictEqual(heap.peek(), undefined);
});

test("should handle popping a heap with >1 items", () => {
  const heap = new Heap<number>((a, b) => a - b);
  heap.push(5);
  heap.push(3);
  heap.push(8);
  heap.push(1);
  assert.strictEqual(heap.pop(), 1);
  assert.strictEqual(heap.pop(), 3);
  assert.strictEqual(heap.pop(), 5);
  assert.strictEqual(heap.pop(), 8);
  assert.strictEqual(heap.pop(), undefined);
  assert.strictEqual(heap.peek(), undefined);
});

test("should handle max heaps", () => {
  const heap = new Heap<number>((a, b) => b - a);
  heap.push(5);
  heap.push(3);
  heap.push(8);
  heap.push(1);
  assert.strictEqual(heap.peek(), 8);
  assert.strictEqual(heap.pop(), 8);
  assert.strictEqual(heap.pop(), 5);
  assert.strictEqual(heap.pop(), 3);
  assert.strictEqual(heap.pop(), 1);
  assert.strictEqual(heap.pop(), undefined);
  assert.strictEqual(heap.peek(), undefined);
});
