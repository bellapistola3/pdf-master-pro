import { diffLines, Change } from 'diff';
import { extractText } from './textExtract';

export interface CompareResult {
  additions: string[];
  removals: string[];
  changedPageCount: number; // heuristic: pages whose text differs at all
  totalPagesA: number;
  totalPagesB: number;
  unifiedDiff: string;
}

const FORM_FEED = '\f';

export async function comparePdfs(bufferA: Buffer, bufferB: Buffer): Promise<CompareResult> {
  const [textA, textB] = await Promise.all([extractText(bufferA), extractText(bufferB)]);

  const pagesA = textA.split(FORM_FEED);
  const pagesB = textB.split(FORM_FEED);

  const changes: Change[] = diffLines(textA, textB);
  const additions: string[] = [];
  const removals: string[] = [];
  let unified = '';

  for (const part of changes) {
    const lines = part.value.split('\n').filter((l) => l.length > 0);
    if (part.added) {
      additions.push(...lines);
      unified += lines.map((l) => `+ ${l}`).join('\n') + '\n';
    } else if (part.removed) {
      removals.push(...lines);
      unified += lines.map((l) => `- ${l}`).join('\n') + '\n';
    }
  }

  const maxPages = Math.max(pagesA.length, pagesB.length);
  let changedPageCount = 0;
  for (let i = 0; i < maxPages; i++) {
    if ((pagesA[i] ?? '') !== (pagesB[i] ?? '')) changedPageCount++;
  }

  return {
    additions,
    removals,
    changedPageCount,
    totalPagesA: pagesA.length,
    totalPagesB: pagesB.length,
    unifiedDiff: unified,
  };
}
