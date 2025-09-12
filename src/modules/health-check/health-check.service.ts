import {
  IsFailed,
  Res,
  ResErr,
  ResOk,
  UnWrap,
} from "../../util/result.util";
import { SingletonManager } from "../../util/singleton-manager.util";
import { DBService } from "../db/db.service";
import { IHealthCheckInternal } from "./types";

export class HealthCheckService {

  private readonly dbService: DBService;

  constructor() {
    this.dbService = SingletonManager.getInstance(DBService);
  }

  public async checkHealth(): Promise<Res<IHealthCheckInternal>> {

    const recordsCountR = await this.dbService.getRecordsCount();
    if (IsFailed(recordsCountR)) { return ResErr(recordsCountR); }
    const recordsCount = UnWrap(recordsCountR);

    return ResOk({
      vectorCount: recordsCount,
      modelInfo: "Embedding: Xenova/all-MiniLM-L6-v2, Response: gpt-4o",
      status: "ok",
    });

  }

}
