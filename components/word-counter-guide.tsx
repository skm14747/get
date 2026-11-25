import { SENTENCE_ABBREVIATIONS, WORDS_PER_MINUTE } from "@/lib/word-count";

export function WordCounterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use the word and character counter</h2>
        <p className="mt-2">
          Type or paste into the text box. The counts update as you type. Paste, select all, and clear act on that box. Copy counts copies the numbers, not the text itself.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Counting rules: Words, characters with or without spaces, and reading time</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>A word is a stretch of text separated by whitespace. &ldquo;well-known&rdquo; is one word. An emoji with spaces around it is counted as a word. This is not dictionary segmentation. Text written without spaces, including a typical Japanese sentence, counts as one word.</li>
          <li>Characters are Unicode code points. A single emoji such as 👍 is one character even though it uses two UTF-16 code units.</li>
          <li>Characters without spaces exclude characters that JavaScript treats as whitespace, including line breaks.</li>
          <li>Graphemes are what a reader usually sees as one symbol. A family emoji made of several code points can be one grapheme and several characters.</li>
          <li>Lines are separated by line breaks. A trailing line break counts as an extra empty line. An empty box has zero lines.</li>
          <li>Paragraphs are separated by a blank line. A single line break does not start a new paragraph.</li>
          <li>
            Sentences use a heuristic. The text is split on periods, exclamation marks, and question marks. Decimals such as 3.14 are kept together. Initials and these abbreviations are also kept together: {SENTENCE_ABBREVIATIONS.join(", ")}. A block of text with no terminator still counts as one sentence when it contains a letter or number. This is not linguistic sentence segmentation.
          </li>
          <li>Reading time uses {WORDS_PER_MINUTE} words per minute. Under that pace, any text with at least one word is labeled &ldquo;Less than 1 minute&rdquo;. Longer text is rounded up to the next minute. This is an assumption, not a measurement of a reader.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Essay and assignment writing:</strong> Track word count against academic requirements in real time as you draft.</li>
          <li><strong>Blog post optimization:</strong> Aim for a target word count (e.g. 1,500–2,000 words) for SEO-optimized long-form content.</li>
          <li><strong>Social media drafting:</strong> Check character counts for platform-specific limits before posting.</li>
          <li><strong>Reading time estimation:</strong> Display an estimated reading time on blog articles to set reader expectations.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked example: Sentence heuristics and reading time</h2>
        <p className="mt-2">
          &ldquo;Dr. Smith paid 3.14. Then she left.&rdquo; has 7 words, 2 sentences, and 1 paragraph. The abbreviations and the decimal do not create extra sentences.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use the paragraph count to verify document structure — each blank line starts a new paragraph.</li>
          <li>The reading time estimate assumes English prose. Technical content, code, or non-Latin scripts may take longer to read in practice.</li>
          <li>Copy the count summary (not the text) using the Copy counts button for quick pasting into emails or spreadsheets.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why word count matters</h2>
        <p className="mt-2">
          Word count is a standard metric in academic writing (essays, theses, dissertations), journalism (article commissions), SEO (content length optimization), and publishing (manuscript length estimation). Different contexts use different units: academics count words, social media counts characters, and publishers estimate reading time. This tool provides all three perspectives simultaneously.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">100% in-browser privacy: Your text never leaves your device</h2>
        <p className="mt-2">
          The text is counted in this browser. The page does not put it in the address bar or send it to GoEasyTools. Optional measurement, if you allow it and an address is configured, records that the word counter was used. It does not record the text.
        </p>
      </section>
    </div>
  );
}
