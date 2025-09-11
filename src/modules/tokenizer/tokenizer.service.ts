import { TokenTextSplitter } from "langchain/text_splitter";
import { Res, ResOk } from "../../util/result.util";

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
  ): Promise<Res<string[]>> {

    const chunks = await this.splitter.splitText(text);
    return ResOk(chunks);

  }
}
