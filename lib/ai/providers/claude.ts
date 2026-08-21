import Anthropic from "@anthropic-ai/sdk";
import type { AIProvider, TeachRequest, LearnerContext } from "@/lib/ai/types";

function buildSystemPrompt(learner?: LearnerContext): string {
  const base =
    "You are the AI tutor for VIA Hub, a learning platform. Prioritize " +
    "actually teaching the concept step by step over just answering. " +
    "Use clear explanations, simple examples, and check understanding " +
    "where appropriate.";

  if (!learner || (!learner.educationLevel && !learner.curriculum)) {
    return base;
  }

  const parts: string[] = [];
  if (learner.educationLevel) {
    parts.push(`The learner's education level is: ${learner.educationLevel}.`);
  }
  if (learner.curriculum) {
    parts.push(`Their curriculum/board is: ${learner.curriculum}.`);
  }
  if (learner.grade) {
    parts.push(`Their grade/class is: ${learner.grade}.`);
  }
  if (learner.preferredLanguage) {
    parts.push(`Preferred language for explanations: ${learner.preferredLanguage}.`);
  }

  return `${base} Calibrate depth, vocabulary, and examples accordingly. ${parts.join(" ")}`;
}

/**
 * Lazily instantiated so this file can be imported (e.g. for type
 * checking during build) even before ANTHROPIC_API_KEY exists.
 */
let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export class ClaudeProvider implements AIProvider {
  async *teach(request: TeachRequest): AsyncGenerator<string> {
    const anthropic = getClient();

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: buildSystemPrompt(request.learner),
      messages: request.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        yield event.delta.text;
      }
    }
  }
}
