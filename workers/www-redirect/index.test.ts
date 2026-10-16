import { describe, expect, it } from "vitest";
import worker, { redirectTarget } from "./index";

describe("www redirect", () => {
  it("keeps path and query", () => {
    expect(redirectTarget("https://www.anagram-solver.co/tools/word-finder?q=abc")).toBe(
      "https://anagram-solver.co/tools/word-finder?q=abc",
    );
  });
  it("returns 301", () => {
    const r = worker.fetch(new Request("http://www.anagram-solver.co/"));
    expect(r.status).toBe(301);
    expect(r.headers.get("location")).toBe("https://anagram-solver.co/");
  });
});
