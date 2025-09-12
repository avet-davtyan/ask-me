import { cosine } from "../../util/cosine.util";

describe("cosine", () => {
  it("should return higher similarity for more similar vectors", () => {
    const a = [1, 0];
    const b = [1, 0];
    const c = [0, 1];
    const d = [-1, 0];

    const pairs = [
      { v: b, score: cosine(a, b) },
      { v: c, score: cosine(a, c) },
      { v: d, score: cosine(a, d) },
    ];

    pairs.sort((x, y) => y.score - x.score);

    expect(pairs[0].v).toEqual(b);
    expect(pairs[1].v).toEqual(c);
    expect(pairs[2].v).toEqual(d);
  });
});
