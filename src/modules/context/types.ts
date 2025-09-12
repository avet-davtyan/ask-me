export interface ICitationDataInternal {
  id: string;
  score: number;
}

export enum StreamDataType {
  TOKEN = "token",
  FINAL = "final",
}

export interface IStreamTokenDataInternal {
  type: StreamDataType.TOKEN;
  text: string;
}

export interface IStreamFinalDataInternal {
  type: StreamDataType.FINAL;
  citations: ICitationDataInternal[];
}

export type IStreamDataInternal = IStreamTokenDataInternal | IStreamFinalDataInternal;
