import { config } from '../config';

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * A single provider-agnostic entrypoint. Swap providers purely via
 * LLM_PROVIDER + LLM_API_KEY env vars — no route/service code changes needed.
 *
 * Each branch below calls the provider's real HTTP API. Nothing here is a
 * mock: if LLM_PROVIDER is unset (default 'none'), callers get a clear
 * "not configured" error rather than a fabricated response.
 */
export async function completeChat(messages: LlmMessage[]): Promise<string> {
  switch (config.llm.provider) {
    case 'openai':
      return callOpenAI(messages);
    case 'anthropic':
      return callAnthropic(messages);
    case 'gemini':
      return callGemini(messages);
    default:
      throw new Error(
        'No LLM provider configured. Set LLM_PROVIDER=openai|anthropic|gemini and LLM_API_KEY in .env ' +
          'to enable AI Summary / Chat with PDF.'
      );
  }
}

async function callOpenAI(messages: LlmMessage[]): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.llm.apiKey}`,
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.3 }),
  });
  if (!res.ok) throw new Error(`OpenAI API error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as any;
  return data.choices?.[0]?.message?.content ?? '';
}

async function callAnthropic(messages: LlmMessage[]): Promise<string> {
  const system = messages.find((m) => m.role === 'system')?.content;
  const rest = messages.filter((m) => m.role !== 'system');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.llm.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system,
      messages: rest.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as any;
  return data.content?.map((c: any) => c.text).join('') ?? '';
}

async function callGemini(messages: LlmMessage[]): Promise<string> {
  const prompt = messages.map((m) => `${m.role}: ${m.content}`).join('\n\n');
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.llm.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  if (!res.ok) throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as any;
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

/** Very simple in-memory chunk retrieval for "Chat with PDF" (keyword overlap, not embeddings). */
export function retrieveRelevantChunks(fullText: string, question: string, maxChunks = 4): string[] {
  const chunks = fullText
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter((c) => c.length > 40);
  const qTerms = question.toLowerCase().split(/\W+/).filter((t) => t.length > 3);

  const scored = chunks.map((chunk) => {
    const lower = chunk.toLowerCase();
    const score = qTerms.reduce((acc, term) => acc + (lower.includes(term) ? 1 : 0), 0);
    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map((s) => s.chunk);
}
