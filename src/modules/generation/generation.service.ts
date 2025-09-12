import OpenAI from "openai";
import ENV from "../../util/env.util";
import { IStreamResponseOptions } from "./types.option";
import { Res, ResOk } from "../../util/result.util";

export class GenerationService {

  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: ENV.OPENAI_API_KEY,
    });
  }

  public async streamResponse(
    options: IStreamResponseOptions,
  ): Promise<Res<null>> {

    const {
      userContent,
      assistantContent,
      maxTokens,
      onChunk,
      onFinal,
    } = options;

    const stream = await this.client.chat.completions.create({
      model: "gpt-4o",
      // eslint-disable-next-line camelcase
      max_completion_tokens: maxTokens,
      messages: [
        { role: "user", content: userContent },
        { role: "assistant", content: assistantContent },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        onChunk(content);
      }
    }
    onFinal();
    return ResOk(null);
  }

}
