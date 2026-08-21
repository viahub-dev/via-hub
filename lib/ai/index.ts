import type { AIProvider } from "@/lib/ai/types";
import { ClaudeProvider } from "@/lib/ai/providers/claude";

/**
 * Single point of control for which AI vendor is active.
 *
 * Nothing outside this file should decide which provider to use.
 * To add OpenAI/Gemini/etc. later: implement AIProvider in a new
 * file under lib/ai/providers/, then extend this switch. No other
 * file in the app needs to change.
 */
function resolveProvider(): AIProvider {
  const providerName = process.env.AI_PROVIDER ?? "claude";

  switch (providerName) {
    case "claude":
      return new ClaudeProvider();
    default:
      throw new Error(`Unknown AI_PROVIDER: ${providerName}`);
  }
}

export const aiProvider: AIProvider = resolveProvider();
export type { AIProvider, TeachRequest, ChatMessage, LearnerContext } from "@/lib/ai/types";
