import { ContextService } from "../modules/context/context.service";
import { SingletonManager } from "../util/singleton-manager.util";
import { IsFailed, ResOk, UnWrap } from "../util/result.util";
import { logger } from "../util/logger.util";

async function main() {
  try {
    const contextService = SingletonManager.getInstance(ContextService);

    const texts = [
      "Armenia is a mountainous country in the South Caucasus, known for its rich cultural heritage and ancient monasteries dating back over a thousand years.",
      "The capital of France, Paris, is famous for its art, architecture, and iconic landmarks such as the Eiffel Tower and the Louvre Museum.",
      "Water freezes at 0 degrees Celsius under standard atmospheric conditions, which is a key property in understanding weather, climate, and physical science.",
      "The sun rises in the east and sets in the west due to the rotation of the Earth, creating day and night cycles that govern life on our planet.",
      "Mount Everest, located in the Himalayas, is the highest mountain on Earth, attracting climbers from around the world seeking to reach its summit.",
      "JavaScript is a versatile and widely-used programming language that powers web development, enabling interactive and dynamic experiences in browsers and servers.",
      "Honey is a natural sweet substance produced by bees from flower nectar, and it has been valued for centuries for its taste, medicinal properties, and long shelf life.",
      "William Shakespeare, one of the greatest playwrights of all time, wrote timeless works such as Hamlet, Macbeth, and Romeo and Juliet that continue to influence literature today.",
      "The Pacific Ocean, the largest and deepest ocean on Earth, covers more than 60 million square miles and plays a crucial role in global climate and biodiversity.",
      "Cats are domesticated animals popular worldwide, known for their independent behavior, playful nature, and ability to form close bonds with humans."
    ];

    const ingestPayload = texts.map((text, i) => ({
      id: `doc${i + 1}`,
      text,
      metadata: { source: "seed" },
    }));

    const resultR = await contextService.ingestData(ingestPayload);
    if(IsFailed(resultR)) {
      logger.error("Seed error:", resultR);
      process.exit(1);
    }
    const result = UnWrap(resultR);

    logger.info("Seed finished:", ResOk(result));
    process.exit(0);

  } catch (err) {
    logger.error("Seed error:", err);
    process.exit(1);
  }
}

main();
