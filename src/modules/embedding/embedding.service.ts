import { Embeddings } from "./types";
// import { pipeline } from "@xenova/transformers";

export class EmbeddingService implements Embeddings {

  private embeddingModel: any;
  private static instance: EmbeddingService;

  private constructor(embeddingModel: any) {
    this.embeddingModel = embeddingModel;
  }

  static async createOrGet(): Promise<EmbeddingService> {

    const TransformersApi = Function("return import('@xenova/transformers')")();
    const { pipeline } = await TransformersApi;

    if (this.instance) {
      return this.instance;
    }
    const embeddingModel = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    );
    this.instance = new EmbeddingService(embeddingModel);
    return this.instance;
  }

  async embed(texts: string[]): Promise<number[][]> {
    const embeddings: number[][] = [];
    for (const text of texts) {
      const output = await this.embeddingModel(text, {
        pooling: "mean",
        normalize: true,
      });
      embeddings.push(Array.from(output.data));
    }
    return embeddings;
  }
}
