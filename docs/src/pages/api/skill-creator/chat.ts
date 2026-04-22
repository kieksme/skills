import type { APIRoute } from 'astro';
import { normalizeMessages, runOpenAiChat } from '../../../lib/skillCreator/openai';

export const prerender = false;

const CHAT_SYSTEM_PROMPT = [
  'You are an assistant that helps users design reusable coding-agent skills.',
  'Ask concise follow-up questions when key details are missing.',
  'Keep replies practical and focused on deliverables for a skill package.',
  'Do not mention internal policies.'
].join(' ');

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = normalizeMessages(body.messages);
    const withSystem = [{ role: 'system' as const, content: CHAT_SYSTEM_PROMPT }, ...messages];
    const assistantReply = await runOpenAiChat(withSystem);
    return new Response(JSON.stringify({ message: assistantReply }), {
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
