import { CASE_LOCALE, CASE_OPTIONS } from "@/lib/case-convert";

export function CaseGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-medium">Cases</h2>
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
        <h2 className="text-xl font-medium">Rules and limits</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Letter case uses the {CASE_LOCALE} locale. Turkish and other languages have different casing rules, so this page is an English converter.</li>
          <li>Title case capitalizes the first letter of a word and lowercases the rest. “iPhone” becomes “Iphone”. Small words such as “of” are capitalized. An apostrophe does not start a new word, so “don’t stop” becomes “Don’t Stop”.</li>
          <li>Sentence case lowercases the text, then capitalizes the first letter and the letter after a period, exclamation mark, or question mark. “e.g. hello” becomes “E.G. Hello” because each period starts a new capital. That is a limitation of the rule, not a grammar correction.</li>
          <li>camelCase, PascalCase, snake_case, and kebab-case split on spaces, underscores, hyphens, and a lowercase-to-uppercase boundary. Punctuation is removed. “HTML parser” becomes “htmlParser”, “HtmlParser”, “html_parser”, and “html-parser”. Acronyms are not detected.</li>
          <li>Emoji and letters outside a simple Latin split can be preserved inside a word or dropped when they are separators. Check the output before using it as an identifier.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-medium">Example</h2>
        <p className="mt-2">
          “hello world” becomes HELLO WORLD, hello world, Hello World, Hello world, helloWorld, HelloWorld, hello_world, and hello-world.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p className="mt-2">The text stays in this browser. Measurement does not receive it.</p>
      </section>
    </div>
  );
}
