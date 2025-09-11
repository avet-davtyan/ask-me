import { embedding } from "../../util/embedding.util";
import { IsFailed, Res, ResErr, ResOk, UnWrap } from "../../util/result.util";
import { SingletonManager } from "../../util/singleton-manager.util";
import { DBService } from "../db/db.service";
import { IDBRecordInternal } from "../db/types";
import { TokenizerService } from "../tokenizer/tokenizer.service";
import { IIngestDataOptions, IIngestDataResponse } from "./types.option";

export class ContextService {

  private readonly tokenizerService: TokenizerService;
  private readonly dbService: DBService;

  constructor() {
    this.tokenizerService = SingletonManager.getInstance(TokenizerService);
    this.dbService = SingletonManager.getInstance(DBService);
  }

  public async ingestData(
    options: IIngestDataOptions[]
  ): Promise<Res<IIngestDataResponse>> {

    const startTime = Date.now();

    const chunkList: string[][] = [];

    for (const option of options) {
      const chunksR = await this.tokenizerService.chunkTextWithOverlap(option.text);
      if(IsFailed(chunksR)) { return ResErr(chunksR); }
      const chunks = UnWrap(chunksR);
      chunkList.push(chunks);
    }

    const embeddingsList: number[][][] = [];

    for (const chunks of chunkList) {
      const embeddingsR = await embedding.embed(chunks);
      if(IsFailed(embeddingsR)) { return ResErr(embeddingsR); }
      const embeddings = UnWrap(embeddingsR);
      embeddingsList.push(embeddings);
    }

    const recordsR = await this.constructRecords(options, chunkList, embeddingsList);
    if(IsFailed(recordsR)) { return ResErr(recordsR); }
    const records = UnWrap(recordsR);

    const addRecordsManyR = await this.dbService.addRecordsMany(records);
    if(IsFailed(addRecordsManyR)) { return ResErr(addRecordsManyR); }

    const response: IIngestDataResponse = {
      docCount: options.length,
      chunkCount: chunkList.flat().length,
      processingTimeMs: Date.now() - startTime,
    };

    return ResOk(response);

  }

  private async constructRecords(
    options: IIngestDataOptions[],
    chunkList: string[][],
    embeddingList: number[][][]
  ): Promise<Res<IDBRecordInternal[]>> {

    const records: IDBRecordInternal[] = [];
    for (let i = 0; i < chunkList.length; i++) {
      for (let j = 0; j < chunkList[i].length; j++) {

        const record: IDBRecordInternal = {
          id: `${options[i].id}#chunk${i}`,
          text: chunkList[i][j],
          vector: embeddingList[i][j],
          metadata: options[i].metadata,
        };

        records.push(record);
      };

    }

    return ResOk(records);

  }

}
