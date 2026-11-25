import { MAX_DIFF_CHARS } from "@/lib/text-diff";

export function TextDiffGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Paste your original text in the left panel and modified text in the right panel. The diff algorithm compares both inputs and highlights additions in green and deletions in red. Choose between line-by-line comparison (for code and lists) and word-by-word comparison (for articles and prose).
        </p>
        <p className="mt-2">
          The comparison runs in real time as you edit either panel. The result shows exactly what was added, removed, or unchanged between the two versions, making it easy to review changes at a glance.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">How the diff algorithm works</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Longest Common Subsequence (LCS):</strong> Employs Myers diff algorithm to find the shortest edit script that transforms the original string into the modified string with minimal change tokens.</li>
          <li><strong>Line diff mode:</strong> Compares text on newline boundaries. Added lines and deleted lines are clearly indicated, matching standard git diff outputs.</li>
          <li><strong>Word diff mode:</strong> Tokenizes on whitespace, highlighting exact phrase substitutions and minor editorial tweaks inside long sentences.</li>
          <li><strong>Safety limits:</strong> Input is limited to {MAX_DIFF_CHARS.toLocaleString()} characters per box to guarantee smooth real-time comparison without freezing the browser thread.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Code review:</strong> Compare two versions of a configuration file, SQL query, or code snippet to spot unintended changes before deployment.</li>
          <li><strong>Legal document review:</strong> Identify exact clause modifications between contract drafts without relying on &ldquo;Track Changes&rdquo; in Word.</li>
          <li><strong>Content editing:</strong> Compare article drafts to see what an editor changed — additions, deletions, and rewording become immediately visible.</li>
          <li><strong>Data validation:</strong> Diff two CSV exports or JSON responses to verify that a data migration preserved all records correctly.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use line diff mode for structured content like code, CSV data, and configuration files where line breaks are meaningful.</li>
          <li>Use word diff mode for prose, articles, and legal text where changes within a paragraph matter more than whole-line additions.</li>
          <li>Trim trailing whitespace in both inputs before comparing to avoid spurious differences caused by invisible spaces.</li>
          <li>For very long documents, focus on one section at a time to keep the visual diff manageable.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding the Myers diff algorithm</h2>
        <p className="mt-2">
          The Myers diff algorithm finds the shortest edit distance between two sequences — the minimum number of insertions and deletions needed to transform the original into the modified version. It runs in O(ND) time where N is the total length and D is the edit distance, making it very fast for texts with few changes. This is the same algorithm used by <code className="rounded bg-line px-1 py-0.5 text-xs">git diff</code> to compare file versions.
        </p>
        <p className="mt-2">
          The algorithm works by exploring an edit graph where moving horizontally represents a deletion and moving vertically represents an insertion. The shortest path through this graph corresponds to the minimal set of changes needed.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: zero server uploads</h2>
        <p className="mt-2">
          Many popular online diff checkers upload your text to external cloud servers, which introduces confidentiality hazards when comparing proprietary source code, legal contracts, or customer data. GoEasyTools executes all comparison math locally in your browser memory. Your text never leaves your device, is never cached, and is discarded entirely when you close the tab.
        </p>
      </section>
    </div>

  );
}
