export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 6000;

function readApiKey() {
  const apiKey = import.meta.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  return apiKey;
}

function readModel() {
  return import.meta.env.OPENAI_MODEL ?? 'gpt-4o-mini';
}

export function normalizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) {
    throw new Error('messages must be an array');
  }
  const normalized = messages
    .slice(-MAX_MESSAGES)
    .map((item) => {
      if (!item || typeof item !== 'object') {
        throw new Error('message must be an object');
      }
      const maybeRole = (item as { role?: unknown }).role;
      const maybeContent = (item as { content?: unknown }).content;
      if (!['system', 'user', 'assistant'].includes(String(maybeRole))) {
        throw new Error('message role is invalid');
      }
      if (typeof maybeContent !== 'string' || maybeContent.trim().length === 0) {
        throw new Error('message content must be a non-empty string');
      }

      return {
        role: maybeRole as ChatRole,
        content: maybeContent.slice(0, MAX_MESSAGE_LENGTH)
      };
    });

  if (normalized.length === 0) {
    throw new Error('messages must not be empty');
  }

  return normalized;
}

export async function runOpenAiChat(messages: ChatMessage[]): Promise<string> {
  const apiKey = readApiKey();
  const model = readModel();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorBody.slice(0, 280)}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = payload.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('OpenAI returned an empty response');
  }
  return text;
}
