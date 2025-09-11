import { Res } from "./result.util";

export type IEmbeddingModel = (
  text: string,
  options: {
    pooling: string,
    normalize: boolean,
  }) => Promise<{
    data: number[],
  }>;

export interface IEmbeddings {
  embed(texts: string[]): Promise<Res<number[][]>>;
}
