export interface IStreamResponseOptions {
  userContent: string;
  assistantContent: string;
  maxTokens: number;
  onChunk: (chunk: string) => void;
  onFinal: () => void;
}
