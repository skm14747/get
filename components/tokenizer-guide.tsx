export function TokenizerGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is a token?</h2>
        <p className="mt-2">
          Tokens are the basic unit that large language models use to read and generate text.
          A token is a group of characters — sometimes a whole word, sometimes a subword or
          punctuation mark. The number of tokens in a piece of text is usually higher than the
          word count because uncommon words, numbers, and special characters are split into
          multiple tokens.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use this tokenizer</h2>
        <p className="mt-2">
          Choose a model from the dropdown, then type or paste text. The tool shows the token
          count alongside word and character counts. For OpenAI models, you also see the
          individual tokens color-coded in a side panel, plus tables of the most expensive
          words and most frequent tokens.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How each provider is counted</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>OpenAI GPT-4o / GPT-4o-mini</strong> uses the <code>o200k_base</code> encoding
            with a vocabulary of roughly 200,000 tokens. Tokenization runs entirely in your browser
            using <code>js-tiktoken</code>. The count is exact.
          </li>
          <li>
            <strong>OpenAI GPT-4 / GPT-3.5-turbo</strong> uses the older <code>cl100k_base</code> encoding
            with roughly 100,000 tokens. Also runs entirely in your browser. The count is exact.
          </li>
          <li>
            <strong>Anthropic Claude</strong> does not publish its tokenizer. The count shown is an
            estimate using approximately 3.5 characters per token for English text. Actual counts
            may vary by roughly ±15%.
          </li>
          <li>
            <strong>Google Gemini</strong> does not publish its tokenizer. The count shown is an
            estimate using approximately 4 characters per token for English text.
          </li>
          <li>
            <strong>xAI Grok</strong> does not publish its tokenizer. The count shown is an
            estimate using approximately 3.7 characters per token for English text.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Why token counts matter</h2>
        <p className="mt-2">
          Every model provider bills per token, not per word, and every model has a context
          window measured in tokens. Knowing the token count tells you two things: what a prompt
          costs, and whether it fits in the model&apos;s context window.
        </p>
        <p className="mt-2">
          Counts are not comparable across providers. The same sentence can produce a different
          number of tokens for each model, so always check with the model you plan to use.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Most expensive words and most frequent tokens</h2>
        <p className="mt-2">
          The &ldquo;most expensive words&rdquo; table shows words that are split into the
          most tokens by the encoder. These are usually domain-specific terms, rare compound
          words, or non-English text. Rephrasing these can reduce your token usage and API cost.
        </p>
        <p className="mt-2">
          The &ldquo;most frequent tokens&rdquo; table shows which tokens appear most often in
          your text. These tables are available only for OpenAI models because they require a
          client-side tokenizer to inspect individual tokens.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Limitations</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            Claude, Gemini, and Grok counts are estimates, not exact. They use average
            characters-per-token ratios from English benchmarks and will be less accurate
            for non-Latin scripts, code, or text with many special characters.
          </li>
          <li>
            The token count covers only the text you enter. It does not include system prompts,
            message framing tokens, or other overhead that the provider adds.
          </li>
          <li>
            The OpenAI tokenizer data (BPE vocabulary) is loaded on demand the first time
            you select an OpenAI model. This is a one-time download of a few megabytes.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">100% in-browser privacy: Your text never leaves your device</h2>
        <p className="mt-2">
          All tokenization and estimation runs in this browser. The page does not send your text
          to GoEasyTools or any third party. No API keys are needed. Optional measurement, if
          you allow it and an address is configured, records that the tokenizer was used. It does
          not record the text.
        </p>
      </section>
    </div>
  );
}
