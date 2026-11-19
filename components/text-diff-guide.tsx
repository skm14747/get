import { MAX_DIFF_CHARS } from "@/lib/text-diff";

export function TextDiffGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste your original text in the left panel and modified text in the right panel. The diff algorithm compares both inputs and highlights additions in green and deletions in red. Choose between line-by-line comparison (for code and lists) and word-by-word comparison (for articles and prose).
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
        <h2 className="text-xl font-semibold">Privacy: zero server uploads</h2>
        <p className="mt-2">
          Many popular online diff checkers upload your text to external cloud servers, which introduces confidentiality hazards when comparing proprietary source code, legal contracts, or customer data. GoEasyTools executes all comparison math locally in your browser memory. Your text never leaves your device.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">
          Developers, writers, and legal professionals regularly need to compare text drafts, code snippets, or configuration files without risking confidential leaks to cloud-hosted diff services.
        </p>
      </section>
    </div>
  );
}
