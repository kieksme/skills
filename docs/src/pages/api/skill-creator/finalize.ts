import type { APIRoute } from 'astro';
import { normalizeMessages, runOpenAiChat } from '../../../lib/skillCreator/openai';

export const prerender = false;

const FINALIZE_SYSTEM_PROMPT = [
  'Generate a coding-agent skill package as strict JSON.',
  'Return only valid JSON in this exact shape:',
  '{"skillFolderName":"kebab-case-name","files":{"SKILL.md":"...","metadata.json":"..."}}',
  'Rules:',
  '- Include SKILL.md with frontmatter name + description.',
  '- Prefer concise content and practical steps.',
  '- files keys must be relative paths inside the skill folder.',
  '- Do not include README.md unless explicitly asked by user.',
  '- Always include metadata.json with title, description, purpose, tags, source, version.'
].join(' ');

interface FinalizeResult {
  skillFolderName: string;
  files: Record<string, string>;
}

function validateFinalizeResult(payload: unknown): FinalizeResult {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Finalize payload must be a JSON object');
  }
  const skillFolderName = (payload as { skillFolderName?: unknown }).skillFolderName;
  const files = (payload as { files?: unknown }).files;
  if (typeof skillFolderName !== 'string' || skillFolderName.trim().length === 0) {
    throw new Error('skillFolderName is required');
  }
  if (!/^[a-z0-9-]+$/.test(skillFolderName)) {
    throw new Error('skillFolderName must be kebab-case');
  }
  if (!files || typeof files !== 'object' || Array.isArray(files)) {
    throw new Error('files must be an object');
  }

  const normalizedFiles: Record<string, string> = {};
  for (const [path, content] of Object.entries(files as Record<string, unknown>)) {
    if (typeof path !== 'string' || path.trim().length === 0) {
      throw new Error('files contains an invalid path');
    }
    if (typeof content !== 'string' || content.trim().length === 0) {
      throw new Error(`File "${path}" is empty`);
    }
    if (path.includes('..') || path.startsWith('/')) {
      throw new Error(`File path "${path}" is not allowed`);
    }
    normalizedFiles[path] = content;
  }

  if (!normalizedFiles['SKILL.md']) {
    throw new Error('files.SKILL.md is required');
  }
  if (!normalizedFiles['metadata.json']) {
    throw new Error('files.metadata.json is required');
  }

  return { skillFolderName, files: normalizedFiles };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = normalizeMessages(body.messages);
    const withSystem = [{ role: 'system' as const, content: FINALIZE_SYSTEM_PROMPT }, ...messages];
    const responseText = await runOpenAiChat(withSystem);
    const parsed = JSON.parse(responseText) as unknown;
    const result = validateFinalizeResult(parsed);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unexpected error while creating files'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
