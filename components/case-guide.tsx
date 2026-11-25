import { CASE_LOCALE, CASE_OPTIONS } from "@/lib/case-convert";

export function CaseGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Type or paste text into the editor and click any case conversion button. The tool transforms your text to the selected format in real time. You can apply multiple conversions in sequence — each one operates on the current text in the editor.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Available cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          {CASE_OPTIONS.map((option) => (
            <li key={option.id}>
              <span className="font-medium">{option.label}. </span>
              {option.description}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Rules and limits</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Letter case uses the {CASE_LOCALE} locale. Turkish and other languages have different casing rules, so this page is an English converter.</li>
          <li>Title case capitalizes the first letter of a word and lowercases the rest. &ldquo;iPhone&rdquo; becomes &ldquo;Iphone&rdquo;. Small words such as &ldquo;of&rdquo; are capitalized. An apostrophe does not start a new word, so &ldquo;don&apos;t stop&rdquo; becomes &ldquo;Don&apos;t Stop&rdquo;.</li>
          <li>Sentence case lowercases the text, then capitalizes the first letter and the letter after a period, exclamation mark, or question mark. &ldquo;e.g. hello&rdquo; becomes &ldquo;E.G. Hello&rdquo; because each period starts a new capital. That is a limitation of the rule, not a grammar correction.</li>
          <li>camelCase, PascalCase, snake_case, and kebab-case split on spaces, underscores, hyphens, and a lowercase-to-uppercase boundary. Punctuation is removed. &ldquo;HTML parser&rdquo; becomes &ldquo;htmlParser&rdquo;, &ldquo;HtmlParser&rdquo;, &ldquo;html_parser&rdquo;, and &ldquo;html-parser&rdquo;. Acronyms are not detected.</li>
          <li>Emoji and letters outside a simple Latin split can be preserved inside a word or dropped when they are separators. Check the output before using it as an identifier.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Variable naming:</strong> Convert natural language descriptions into camelCase, PascalCase, snake_case, or kebab-case for use as variable names, function names, CSS classes, or URL slugs.</li>
          <li><strong>Title formatting:</strong> Quickly title-case blog post headlines, presentation slide titles, or email subject lines.</li>
          <li><strong>Data cleanup:</strong> Normalize inconsistent casing in imported data — convert everything to lowercase or UPPERCASE before processing.</li>
          <li><strong>Code generation:</strong> Convert database column names (snake_case) to JavaScript property names (camelCase) or class names (PascalCase).</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Example</h2>
        <p className="mt-2">
          &ldquo;hello world&rdquo; becomes HELLO WORLD, hello world, Hello World, Hello world, helloWorld, HelloWorld, hello_world, and hello-world.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>When converting to programming identifiers (camelCase, snake_case), review the output for edge cases with numbers and special characters.</li>
          <li>Use UPPERCASE for constants in code (e.g. MAX_RETRIES), and kebab-case for CSS class names and URL paths.</li>
          <li>Title case is not the same as sentence case — title case capitalizes every word, while sentence case only capitalizes the first word and words after sentence-ending punctuation.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">The text stays in this browser. Measurement does not receive it. No text content is logged or sent to any server.</p>
      </section>
    </div>
  );
}
