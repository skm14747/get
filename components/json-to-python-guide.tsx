export function JsonToPythonGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is JSON to Python model conversion?</h2>
        <p className="mt-2">
          JSON to Python model conversion analyzes arbitrary JSON payloads and automatically generates Python classes with type annotations. It supports Pydantic BaseModel (v2) for runtime data validation, standard library dataclasses for lightweight data structures, and TypedDict for dictionary typing.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Paste your JSON data into the left input editor or click Load sample. Choose your target framework (Pydantic, @dataclass, or TypedDict), specify your root class name, and toggle PEP 8 snake_case formatting. Copy the generated Python code directly into your FastAPI, Django, Flask, or backend data engineering service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Comparing Pydantic, dataclasses, and TypedDict</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Pydantic BaseModel:</strong> Industry standard for modern Python web frameworks like FastAPI and AI libraries (LangChain, LlamaIndex). Provides automatic runtime data validation, coercion, serialization, and JSON schema export.
          </li>
          <li>
            <strong>Standard Library @dataclass:</strong> Introduced in Python 3.7. Lightweight in-memory classes without third-party dependencies, ideal for internal business logic and microservices where validation overhead is not needed.
          </li>
          <li>
            <strong>typing.TypedDict:</strong> Static type hinting for standard Python dictionaries. Useful when interacting with legacy codebases or third-party APIs that require raw dictionaries without object instantiation.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>API client development:</strong> Paste a sample API response and generate typed Pydantic models to safely parse responses in your Python backend.</li>
          <li><strong>Database schema modeling:</strong> Convert JSON database exports into dataclass models for ORM-free data handling.</li>
          <li><strong>AI/ML pipeline typing:</strong> Create typed structures for LLM API responses (OpenAI, Anthropic) to ensure safe field access in your data pipelines.</li>
          <li><strong>Configuration management:</strong> Generate Pydantic settings models from JSON config files for validated application configuration.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">PEP 8 snake_case conversion and Field aliases</h2>
        <p className="mt-2">
          Python code style (PEP 8) requires variable and property names to use <code className="rounded bg-line px-1 py-0.5 text-xs">snake_case</code>, whereas web APIs frequently return <code className="rounded bg-line px-1 py-0.5 text-xs">camelCase</code> keys. When snake_case is enabled, this tool automatically converts keys like <code className="rounded bg-line px-1 py-0.5 text-xs">userId</code> to <code className="rounded bg-line px-1 py-0.5 text-xs">user_id</code> and adds <code className="rounded bg-line px-1 py-0.5 text-xs">Field(alias=&quot;userId&quot;)</code> in Pydantic to ensure seamless parsing of external API responses.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use Pydantic for any code that processes external input — its runtime validation catches malformed data before it reaches your business logic.</li>
          <li>Use dataclasses for internal-only data structures where validation overhead is unnecessary.</li>
          <li>Always enable snake_case conversion when the source JSON uses camelCase to follow Python naming conventions.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for backend payloads</h2>
        <p className="mt-2">
          API schemas, configuration files, and database JSON exports frequently contain confidential fields or proprietary data models. GoEasyTools executes all schema analysis and Python code compilation in your browser memory. Data is never uploaded to remote servers, logged, or retained.
        </p>
      </section>
    </div>
  );
}
