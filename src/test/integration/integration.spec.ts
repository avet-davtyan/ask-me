
import request from "supertest";
import app from "../../app";
import { StreamDataType } from "../../modules/context/types";

jest.mock("../../util/embedding.util", () => {
  const { ResOk } = require("../../util/result.util");
  return {
    embedding: {
      embed: jest.fn().mockResolvedValue(ResOk([[0.1, 0.2, 0.3]])),
      embedOne: jest.fn().mockResolvedValue(ResOk([0.1, 0.2, 0.3])),
    },
  };
});

jest.mock("../../modules/db/db.service", () => {
  const { ResOk } = require("../../util/result.util");
  return {
    DBService: class {
      addRecordsMany = jest.fn().mockResolvedValue(ResOk(null));
      getTopKRecordsByCosine = jest.fn().mockResolvedValue(ResOk([]));
    },
  };
});

jest.mock("../../modules/generation/generation.service", () => {
  return {
    GenerationService: class {
      stream = jest.fn().mockImplementation(async function* () {
        yield "Armenia";
      });
    },
  };
});

describe("ingest", () => {
  it("should ingest documents", async () => {
    const ingestPayload = [
      { id: "doc11212", text: "Armenia is a mountainous country in the South Caucasus.", metadata: { source: "wiki" } },
    ];

    await request(app)
      .post("/ingest")
      .send(ingestPayload)
      .expect(200);

    await request(app)
      .post("/ask")
      .send({ query: "What is Armenia known for?", topK: 1, maxTokens: 50 })
      .expect(200)
      .expect("Content-Type", /text\/event-stream/)
      .expect((res) => {
        const chunks = res.text.split("\n\n").filter(chunk => chunk.trim());
        expect(chunks.length).toBeGreaterThan(0);

        const tokenChunks = chunks.filter(chunk => {
          try {
            const data = JSON.parse(chunk.replace("data: ", ""));
            return data.type === StreamDataType.TOKEN;
          } catch {
            return false;
          }
        });
        expect(tokenChunks.length).toBeGreaterThan(0);

        const finalChunk = chunks.find(chunk => {
          try {
            const data = JSON.parse(chunk.replace("data: ", ""));
            return data.type === StreamDataType.FINAL;
          } catch {
            return false;
          }
        });
        expect(finalChunk).toBeDefined();
      })

  });
});
