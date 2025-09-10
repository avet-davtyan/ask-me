import { TokenTextSplitter } from "langchain/text_splitter";

export class TokenizerService {

  private readonly splitter: TokenTextSplitter;

  constructor() {
    this.splitter = new TokenTextSplitter({
      chunkSize: 800,
      chunkOverlap: 100,
    });
  }

  async chunkTextWithOverlap(
    text: string,
  ): Promise<string[]> {
    return this.splitter.splitText(text);
  }
}
