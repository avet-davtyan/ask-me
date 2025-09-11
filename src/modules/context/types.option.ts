export interface IIngestDataOptions {
  id: string;
  text: string;
  metadata?: Record<string, string>;
}

export interface IIngestDataResponse {
  docCount: number;
  chunkCount: number;
  processingTimeMs: number;
}
