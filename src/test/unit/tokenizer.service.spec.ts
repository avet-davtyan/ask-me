import { TokenizerService } from "../../modules/tokenizer/tokenizer.service";
import { IsFailed, UnWrap } from "../../util/result.util";

describe("TokenizerService", () => {
  let service: TokenizerService;

  beforeEach(() => {
    service = new TokenizerService();
  });

  it("should split text into chunks with overlap", async () => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50);

    const chunksR = await service.chunkTextWithOverlap(text);
    if(IsFailed(chunksR)) { fail(chunksR); }
    const chunks = UnWrap(chunksR);

    expect(Array.isArray(chunks)).toBe(true);
    expect(chunks.length).toBeGreaterThan(1);
  });

  it("should handle short text gracefully", async () => {
    const text = "short text";
    const chunksR = await service.chunkTextWithOverlap(text);
    if(IsFailed(chunksR)) { fail(chunksR); }
    const chunks = UnWrap(chunksR);

    expect(chunks.length).toBe(1);
    expect(chunks[0]).toEqual(text);
  });
});
