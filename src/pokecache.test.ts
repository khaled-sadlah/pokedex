import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.each([
  { key: "https://example.com", val: "testdata", interval: 200 },
  { key: "https://example.com/path", val: "moretestdata", interval: 300 },
])("Test Caching %s", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  expect(cache.get(key)).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 250));

  expect(cache.get(key)).toBe(undefined);

  cache.stopReapLoop();
});
