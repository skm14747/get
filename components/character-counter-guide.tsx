export function CharacterCounterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Type or paste your text into the editor. The total characters with spaces and characters without spaces update in real time. Enter an optional numeric limit to check remaining characters before reaching a platform cutoff.
        </p>
        <p className="mt-2">
          The counter processes every keystroke instantly with no server round-trip, so you see accurate counts as you type. This is especially useful for iterating on social media posts or meta descriptions where every character matters.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Character counting rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Characters with spaces:</strong> Counts every Unicode code point in the text, including whitespace, tabs, and line breaks.</li>
          <li><strong>Characters without spaces:</strong> Counts characters while filtering out JavaScript whitespace characters (\s) and line terminators.</li>
          <li><strong>Emojis and Unicode:</strong> Standard emojis are counted as Unicode code points. Compound emojis with zero-width joiners represent multiple code points.</li>
          <li><strong>Character limit threshold:</strong> If a limit is specified, the tool computes remaining characters. An empty limit provides an open-ended count without cutoff warnings.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common platform limits</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>X (Twitter) post:</strong> 280 characters for standard accounts.</li>
          <li><strong>SMS message:</strong> 160 standard 7-bit characters per single segment.</li>
          <li><strong>Google search title tag:</strong> Recommended around 50–60 characters to avoid SERP truncation.</li>
          <li><strong>Google meta description:</strong> Recommended around 150–160 characters for optimal snippet display.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>SEO optimization:</strong> Craft title tags and meta descriptions that fit within Google&apos;s display limits to avoid truncation in search results.</li>
          <li><strong>Social media posts:</strong> Write tweets, LinkedIn posts, or Instagram captions that stay within platform character limits.</li>
          <li><strong>Form field validation:</strong> Test input strings against database column lengths or API field limits before submission.</li>
          <li><strong>Academic writing:</strong> Some abstracts and essay prompts specify character limits rather than word limits — count precisely here.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Set the character limit to your platform&apos;s maximum before you start writing, so you can see the remaining count decrease as you type.</li>
          <li>Remember that emojis may count as 1 or 2+ characters depending on the platform — Twitter counts some compound emojis as 2 characters.</li>
          <li>Use &ldquo;characters without spaces&rdquo; when platforms or forms exclude whitespace from their limits.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Characters vs. bytes vs. graphemes</h2>
        <p className="mt-2">
          A &ldquo;character&rdquo; in Unicode is a code point — a single entry in the Unicode standard. A byte is a unit of storage; characters can take 1–4 bytes in UTF-8 encoding. A grapheme is what a human perceives as a single symbol — a flag emoji is one grapheme but may be two code points (and 8 bytes in UTF-8). This tool counts code points, which is what most platform character limits measure.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Counting runs client-side in your browser. Typed text is never uploaded to remote servers or saved in session history. No content is logged or transmitted.
        </p>
      </section>
    </div>
  );
}
