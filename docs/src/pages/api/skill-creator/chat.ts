import type { APIRoute } from 'astro';
import { normalizeMessages, runOpenAiChat } from '../../../lib/skillCreator/openai';

export const prerender = false;

const CHAT_SYSTEM_PROMPT = [
  'You are an assistant that helps users design reusable coding-agent skills.',
  'When key details are missing, ask concise follow-up questions with selectable options.',
  'Keep replies practical and focused on deliverables for a skill package.',
  'Do not mention internal policies.',
  'Return strict JSON only with this shape:',
  '{"message":"string","questions":[{"id":"string","label":"string","multiSelect":boolean,"options":["string"]}]}',
  'questions is optional. When provided, include 1-4 questions with 2-6 options each.',
  'For every yes/no question, always return exactly two options: ["Ja", "Nein"] and set multiSelect to false.'
].join(' ');

interface ChatQuestion {
  id: string;
  label: string;
  multiSelect: boolean;
  options: string[];
}

interface ChatResponsePayload {
  message: string;
  questions?: ChatQuestion[];
}

function isBinaryOption(option: string) {
  return ['ja', 'nein', 'yes', 'no', 'true', 'false'].includes(option.trim().toLowerCase());
}

function normalizeChatResponse(rawText: string): ChatResponsePayload {
  try {
    const parsed = JSON.parse(rawText) as unknown;
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Chat response must be an object');
    }
    const message = (parsed as { message?: unknown }).message;
    const questions = (parsed as { questions?: unknown }).questions;
    if (typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('message is required');
    }

    if (!questions) {
      return { message: message.trim() };
    }

    if (!Array.isArray(questions)) {
      throw new Error('questions must be an array');
    }

    const normalizedQuestions = questions.slice(0, 4).map((item, index) => {
      if (!item || typeof item !== 'object') {
        throw new Error('question must be an object');
      }
      const id = (item as { id?: unknown }).id;
      const label = (item as { label?: unknown }).label;
      const multiSelect = (item as { multiSelect?: unknown }).multiSelect;
      const options = (item as { options?: unknown }).options;
      if (typeof label !== 'string' || label.trim().length === 0) {
        throw new Error('question label is required');
      }
      if (!Array.isArray(options) || options.length < 2) {
        throw new Error('question options must include at least 2 items');
      }

      const normalizedOptions = options
        .filter((option): option is string => typeof option === 'string' && option.trim().length > 0)
        .slice(0, 6);
      if (normalizedOptions.length < 2) {
        throw new Error('question options are invalid');
      }

      const binaryByOptions = normalizedOptions.length === 2 && normalizedOptions.every((option) => isBinaryOption(option));
      const binaryByLabel = /ja\/nein|yes\/no|true\/false/i.test(label);
      const shouldUseJaNein = binaryByOptions || binaryByLabel;

      return {
        id: typeof id === 'string' && id.trim().length > 0 ? id : `question-${index + 1}`,
        label: label.trim(),
        multiSelect: shouldUseJaNein ? false : Boolean(multiSelect),
        options: shouldUseJaNein ? ['Ja', 'Nein'] : normalizedOptions
      };
    });

    return {
      message: message.trim(),
      questions: normalizedQuestions
    };
  } catch {
    return { message: rawText.trim() };
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = normalizeMessages(body.messages);
    const withSystem = [{ role: 'system' as const, content: CHAT_SYSTEM_PROMPT }, ...messages];
    const assistantReply = await runOpenAiChat(withSystem);
    const payload = normalizeChatResponse(assistantReply);
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unexpected error while generating response'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
