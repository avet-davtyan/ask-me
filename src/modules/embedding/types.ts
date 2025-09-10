export interface Embeddings {
  embed(text: string[]): Promise<number[][]>;
}
