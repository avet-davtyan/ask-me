export interface IHealthCheckInternal {
  vectorCount: number;
  modelInfo: string;
  status: "ok" | "error";
}
