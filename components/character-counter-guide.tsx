export function CharacterCounterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Type or paste your text into the editor. The total characters with spaces and characters without spaces update in real time. Enter an optional numeric limit to check remaining characters before reaching a platform cutoff.
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
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Counting runs client-side in your browser. Typed text is never uploaded to remote servers or saved in session history.
        </p>
      </section>
    </div>
  );
}
