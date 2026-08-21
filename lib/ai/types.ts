/**
 * AI Provider Abstraction — shared types.
 *
 * Nothing outside lib/ai/ should ever import a vendor SDK (Anthropic,
 * OpenAI, etc.) directly. Routes and components talk only to the
 * AIProvider interface defined here, via lib/ai/index.ts.
 */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/**
 * Learner context used to personalize AI responses.
 *
 * Deliberately open-ended (rather than a single flat string) so a
 * future Education Level -> Curriculum/Board -> Grade structure can
 * populate these fields without changing this interface. All fields
 * optional: a guest with no profile still gets a valid request.
 */
export interface LearnerContext {
  educationLevel?: string; // e.g. "secondary", "undergraduate"
  curriculum?: string; // e.g. "sindh_board", "a_levels"
  grade?: string; // reserved for future use (e.g. "Class 9")
  preferredLanguage?: string; // e.g. "english", "roman_urdu"
}

export interface TeachRequest {
  messages: ChatMessage[];
  learner?: LearnerContext;
}

/**
 * The interface every AI provider implementation must satisfy.
 * Only "teach" is needed for Stage 2. Quiz generation and answer
 * evaluation methods will be added to this interface in Stage 3.
 */
export interface AIProvider {
  teach(request: TeachRequest): AsyncGenerator<string>;
}
