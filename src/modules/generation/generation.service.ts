import OpenAI from "openai";
import ENV from "../../util/env.util";
import { LLM } from "./types";

export class GenerationService implements LLM {

  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: ENV.OPENAI_API_KEY,
    });
  }

  public async *stream(
    prompt: string,
    opts?: { maxTokens?: number },
  ): AsyncIterable<string> {

    const stream = await this.client.chat.completions.create({
      model: "gpt-4o",
      // eslint-disable-next-line camelcase
      max_completion_tokens: opts?.maxTokens || null,
      messages: [
        { role: "user", content: prompt },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }

  }

}
