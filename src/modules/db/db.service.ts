import fs from "fs";
import path from "path";
import { DBRecordSchema, IDBRecordInternal } from "./types";
import z from "zod";
import { IsFailed, Res, ResErr, ResOk, UnWrap } from "../../util/result.util";

export class DBService {

  private readonly vectorsPath: string;

  constructor() {
    this.vectorsPath = path.resolve(__dirname, "vectors.json");
    if (!fs.existsSync(this.vectorsPath)) {
      fs.writeFileSync(this.vectorsPath, JSON.stringify([]));
    }
  }

  public async getRecordsAll(): Promise<Res<IDBRecordInternal[]>> {

    const vectorsPath = path.resolve(__dirname, "vectors.json");
    const fileContent = fs.readFileSync(vectorsPath, "utf8");
    if (!fileContent.trim()) { return ResOk([]); }
    const vectors = JSON.parse(fileContent);

    const vectorsParsed = await z.array(DBRecordSchema).parseAsync(vectors);

    return ResOk(vectorsParsed);

  }

  public async addRecord(
    record: IDBRecordInternal
  ): Promise<Res<null>> {

    const vectorsR = await this.getRecordsAll();
    if (IsFailed(vectorsR)) { return ResErr(vectorsR); }
    const vectors = UnWrap(vectorsR);

    if (vectors.some(v => v.id === record.id)) {
      return ResErr(`Record with id "${record.id}" already exists`);
    }

    const saveRecordsR = await this.saveRecords([...vectors, record]);
    if (IsFailed(saveRecordsR)) { return ResErr(saveRecordsR); }

    return ResOk(null);
  }

  public async addRecordsMany(
    records: IDBRecordInternal[]
  ): Promise<Res<null>> {

    const vectorsR = await this.getRecordsAll();
    if (IsFailed(vectorsR)) { return ResErr(vectorsR); }
    const vectors = UnWrap(vectorsR);

    for (const record of records) {
      if (vectors.some(v => v.id === record.id)) {
        return ResErr(`Record with id "${record.id}" already exists`);
      }
    }

    const saveRecordsR = await this.saveRecords([...vectors, ...records]);
    if (IsFailed(saveRecordsR)) { return ResErr(saveRecordsR); }

    return ResOk(null);
  }

  private async saveRecords(
    records: IDBRecordInternal[]
  ): Promise<Res<null>> {
    fs.writeFileSync(this.vectorsPath, JSON.stringify(records));
    return ResOk(null);
  }

}
