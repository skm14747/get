export const MAX_DIFF_CHARS = 100_000;

export type DiffMode = "lines" | "words";

export type DiffChange = {
  type: "added" | "removed" | "unchanged";
  value: string;
};

export type DiffResult =
  | {
      ok: true;
      changes: DiffChange[];
      additionsCount: number;
      deletionsCount: number;
      unchangedCount: number;
      isIdentical: boolean;
    }
  | { ok: false; reason: "too_large" | "empty" };

/**
 * Standard LCS (Longest Common Subsequence) diff implementation for client-side comparison.
 */
function lcsDiff(tokensA: string[], tokensB: string[]): DiffChange[] {
  const m = tokensA.length;
  const n = tokensB.length;

  // Build LCS matrix (bounded to max tokens for memory safety)
  const matrix: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (tokensA[i] === tokensB[j]) {
        matrix[i + 1][j + 1] = matrix[i][j] + 1;
      } else {
        matrix[i + 1][j + 1] = Math.max(matrix[i + 1][j], matrix[i][j + 1]);
      }
    }
  }

  // Backtrack to recover diff chunks
  const changes: DiffChange[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && tokensA[i - 1] === tokensB[j - 1]) {
      changes.unshift({ type: "unchanged", value: tokensA[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
      changes.unshift({ type: "added", value: tokensB[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
      changes.unshift({ type: "removed", value: tokensA[i - 1] });
      i--;
    }
  }

  return changes;
}

export function computeDiff(
  original: string,
  modified: string,
  mode: DiffMode = "lines"
): DiffResult {
  if (original.length > MAX_DIFF_CHARS || modified.length > MAX_DIFF_CHARS) {
    return { ok: false, reason: "too_large" };
  }
  if (original === "" && modified === "") {
    return { ok: false, reason: "empty" };
  }

  if (original === modified) {
    return {
      ok: true,
      changes: [{ type: "unchanged", value: original }],
      additionsCount: 0,
      deletionsCount: 0,
      unchangedCount: 1,
      isIdentical: true,
    };
  }

  let tokensA: string[];
  let tokensB: string[];

  if (mode === "lines") {
    tokensA = original.split("\n");
    tokensB = modified.split("\n");
  } else {
    // Word split keeping whitespace tokens
    tokensA = original.split(/(\s+)/);
    tokensB = modified.split(/(\s+)/);
  }

  const rawChanges = lcsDiff(tokensA, tokensB);

  // Consolidate adjacent changes of the same type for clean rendering
  const changes: DiffChange[] = [];
  for (const item of rawChanges) {
    const last = changes[changes.length - 1];
    const separator = mode === "lines" ? "\n" : "";
    if (last && last.type === item.type) {
      last.value += separator + item.value;
    } else {
      changes.push({ type: item.type, value: item.value });
    }
  }

  let additionsCount = 0;
  let deletionsCount = 0;
  let unchangedCount = 0;

  for (const change of changes) {
    if (change.type === "added") additionsCount++;
    else if (change.type === "removed") deletionsCount++;
    else unchangedCount++;
  }

  return {
    ok: true,
    changes,
    additionsCount,
    deletionsCount,
    unchangedCount,
    isIdentical: false,
  };
}
