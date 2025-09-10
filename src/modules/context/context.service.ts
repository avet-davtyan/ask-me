import { SingletonManager } from "../../util/singleton-manager.util";
import { EmbeddingService } from "../embedding/embedding.service";
import { TokenizerService } from "../tokenizer/tokenizer.service";
import { IIngestDataOptions } from "./types.option";

export class ContextService {

  private readonly tokenizerService: TokenizerService;

  constructor() {
    this.tokenizerService = SingletonManager.getInstance(TokenizerService);
  }

  public async ingestData(
    options: IIngestDataOptions
  ): Promise<number[][]> {

    const embeddingService = await EmbeddingService.createOrGet();

    const {
      text,
    } = options;

    const chunks = await this.tokenizerService.chunkTextWithOverlap(text);

    const embeddings = await embeddingService.embed(chunks);
    return embeddings;

  }
}
