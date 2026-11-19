export type PythonTarget = "pydantic" | "dataclass" | "typeddict";

export type JsonToPythonOptions = {
  rootName?: string;
  target?: PythonTarget;
  snakeCase?: boolean;
};

export type JsonToPythonSuccess = {
  ok: true;
  code: string;
};

export type JsonToPythonFailure = {
  ok: false;
  reason: string;
};

export type JsonToPythonResult = JsonToPythonSuccess | JsonToPythonFailure;

const PYTHON_KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break",
  "class", "continue", "def", "del", "elif", "else", "except", "finally",
  "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal",
  "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
  "type", "id", "input", "object",
]);

function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .toLowerCase()
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function capitalize(name: string): string {
  if (!name) return "Anonymous";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function sanitizeIdentifier(name: string): string {
  let cleaned = name.replace(/[^a-zA-Z0-9_]/g, "_");
  if (/^[0-9]/.test(cleaned)) {
    cleaned = `_${cleaned}`;
  }
  return cleaned || "field";
}

export function jsonToPython(
  jsonStr: string,
  options: JsonToPythonOptions = {}
): JsonToPythonResult {
  const trimmed = jsonStr.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter JSON to generate Python models." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Invalid JSON syntax.";
    return { ok: false, reason: `JSON Syntax Error: ${msg}` };
  }

  const target = options.target ?? "pydantic";
  const convertSnake = options.snakeCase ?? true;
  const rootName = (options.rootName?.trim() || "RootModel").replace(/[^a-zA-Z0-9_]/g, "") || "RootModel";

  const classDefinitions: string[] = [];
  const generatedNames = new Set<string>();
  let needsList = false;
  let needsOptional = false;
  let needsAny = false;
  let needsField = false;

  function getUniqueName(base: string): string {
    let name = capitalize(base);
    let counter = 1;
    while (generatedNames.has(name)) {
      name = `${capitalize(base)}${++counter}`;
    }
    generatedNames.add(name);
    return name;
  }

  function resolveType(val: unknown, keyHint: string): string {
    if (val === null) {
      needsOptional = true;
      needsAny = true;
      return "Optional[Any]";
    }
    if (typeof val === "string") return "str";
    if (typeof val === "number") return Number.isInteger(val) ? "int" : "float";
    if (typeof val === "boolean") return "bool";

    if (Array.isArray(val)) {
      needsList = true;
      if (val.length === 0) {
        needsAny = true;
        return "List[Any]";
      }
      const itemTypes = Array.from(
        new Set(val.map((item) => resolveType(item, `${keyHint}Item`)))
      );
      if (itemTypes.length === 1) {
        return `List[${itemTypes[0]}]`;
      }
      return `List[Any]`;
    }

    if (typeof val === "object") {
      const obj = val as Record<string, unknown>;
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        needsAny = true;
        return "dict[str, Any]";
      }

      const className = getUniqueName(keyHint);
      const lines: string[] = [];

      for (const k of keys) {
        const propType = resolveType(obj[k], k);
        let fieldName = convertSnake ? toSnakeCase(k) : sanitizeIdentifier(k);

        const isCollision = PYTHON_KEYWORDS.has(fieldName) || fieldName !== k;
        if (PYTHON_KEYWORDS.has(fieldName)) {
          fieldName = `${fieldName}_`;
        }

        if (target === "pydantic") {
          if (isCollision && k !== fieldName) {
            needsField = true;
            lines.push(`    ${fieldName}: ${propType} = Field(alias="${k}")`);
          } else {
            lines.push(`    ${fieldName}: ${propType}`);
          }
        } else if (target === "typeddict") {
          lines.push(`    ${JSON.stringify(k)}: ${propType}`);
        } else {
          // dataclass
          lines.push(`    ${fieldName}: ${propType}`);
        }
      }

      let classDef = "";
      if (target === "pydantic") {
        classDef = `class ${className}(BaseModel):\n${lines.join("\n")}`;
      } else if (target === "typeddict") {
        classDef = `class ${className}(TypedDict):\n${lines.join("\n")}`;
      } else {
        classDef = `@dataclass\nclass ${className}:\n${lines.join("\n")}`;
      }

      classDefinitions.push(classDef);
      return className;
    }

    needsAny = true;
    return "Any";
  }

  // Handle root
  if (Array.isArray(parsed)) {
    needsList = true;
    if (parsed.length === 0) {
      needsAny = true;
      classDefinitions.push(`${capitalize(rootName)} = List[Any]`);
    } else {
      const elemType = resolveType(parsed[0], `${rootName}Item`);
      classDefinitions.push(`${capitalize(rootName)} = List[${elemType}]`);
    }
  } else if (typeof parsed === "object" && parsed !== null) {
    const obj = parsed as Record<string, unknown>;
    const keys = Object.keys(obj);
    const className = capitalize(rootName);
    generatedNames.add(className);

    const lines: string[] = [];
    for (const k of keys) {
      const propType = resolveType(obj[k], k);
      let fieldName = convertSnake ? toSnakeCase(k) : sanitizeIdentifier(k);

      const isCollision = PYTHON_KEYWORDS.has(fieldName) || fieldName !== k;
      if (PYTHON_KEYWORDS.has(fieldName)) {
        fieldName = `${fieldName}_`;
      }

      if (target === "pydantic") {
        if (isCollision && k !== fieldName) {
          needsField = true;
          lines.push(`    ${fieldName}: ${propType} = Field(alias="${k}")`);
        } else {
          lines.push(`    ${fieldName}: ${propType}`);
        }
      } else if (target === "typeddict") {
        lines.push(`    ${JSON.stringify(k)}: ${propType}`);
      } else {
        lines.push(`    ${fieldName}: ${propType}`);
      }
    }

    let rootDef = "";
    if (target === "pydantic") {
      rootDef = `class ${className}(BaseModel):\n${lines.join("\n")}`;
    } else if (target === "typeddict") {
      rootDef = `class ${className}(TypedDict):\n${lines.join("\n")}`;
    } else {
      rootDef = `@dataclass\nclass ${className}:\n${lines.join("\n")}`;
    }
    classDefinitions.push(rootDef);
  } else {
    const primType = resolveType(parsed, rootName);
    classDefinitions.push(`${capitalize(rootName)} = ${primType}`);
  }

  // Header imports
  const headerParts: string[] = [];

  if (target === "pydantic") {
    const pydanticImports = ["BaseModel"];
    if (needsField) pydanticImports.push("Field");
    headerParts.push(`from pydantic import ${pydanticImports.join(", ")}`);
  } else if (target === "dataclass") {
    headerParts.push(`from dataclasses import dataclass`);
  }

  const typingImports: string[] = [];
  if (target === "typeddict") typingImports.push("TypedDict");
  if (needsList) typingImports.push("List");
  if (needsOptional) typingImports.push("Optional");
  if (needsAny) typingImports.push("Any");

  if (typingImports.length > 0) {
    headerParts.push(`from typing import ${typingImports.join(", ")}`);
  }

  const finalCode = `${headerParts.join("\n")}\n\n${classDefinitions.join("\n\n")}`;
  return { ok: true, code: finalCode };
}
