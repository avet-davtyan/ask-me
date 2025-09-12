import { Response } from "express";

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

export interface IGenerateResponseOptions {
  userQuery: string;
  topK: number;
  maxTokens: number;
  response: Response;
}
