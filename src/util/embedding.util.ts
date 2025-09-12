import { normalize } from "./cosine.util";
import { Res, ResOk } from "./result.util";
import { IEmbeddingModel, IEmbeddings } from "./types";

let embeddingModel: null | IEmbeddingModel = null;

export async function getEmbeddingModel(): Promise<IEmbeddingModel> {
  if (embeddingModel) { return embeddingModel; }

  const TransformersApi = Function("return import('@xenova/transformers')")();
  const { pipeline } = await TransformersApi;

  embeddingModel = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2") as IEmbeddingModel;
  return embeddingModel;
}

export class Embedding implements IEmbeddings {

  async embed(texts: string[]): Promise<Res<number[][]>> {

    const model = await getEmbeddingModel();

    const embeddings: number[][] = [];
    for (const text of texts) {
      const embedding = await model(text, {
        pooling: "mean",
        normalize: false,
      });
      embeddings.push(normalize(Array.from(embedding.data)));
    }
    return ResOk(embeddings);

  }

  async embedOne(text: string): Promise<Res<number[]>> {
    const model = await getEmbeddingModel();
    const embedding = await model(text, {
      pooling: "mean",
      normalize: true,
    });
    return ResOk(Array.from(embedding.data));
  }
}

export const embedding = new Embedding();
