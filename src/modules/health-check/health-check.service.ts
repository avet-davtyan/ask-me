import {
  IsFailed,
  Res,
  ResErr,
  ResOk,
  UnWrap,
} from "../../util/result.util";
import { SingletonManager } from "../../util/singleton-manager.util";
import { DBService } from "../db/db.service";
import { IDBRecordInternal } from "../db/types";

export class HealthCheckService {

  private readonly dbService: DBService;

  constructor() {
    this.dbService = SingletonManager.getInstance(DBService);
  }

  public async checkHealth(): Promise<Res<IDBRecordInternal[]>> {

    const recordsR = await this.dbService.getRecordsAll();
    if (IsFailed(recordsR)) { return ResErr(recordsR); }
    const records = UnWrap(recordsR);

    return ResOk(records);

  }

}
