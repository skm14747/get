export type JsonToTsOptions = {
  rootName?: string;
  useInterface?: boolean;
};

export type JsonToTsSuccess = {
  ok: true;
  code: string;
};

export type JsonToTsFailure = {
  ok: false;
  reason: string;
};

export type JsonToTsResult = JsonToTsSuccess | JsonToTsFailure;

function isValidIdentifier(name: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
}

function formatKey(key: string): string {
  return isValidIdentifier(key) ? key : JSON.stringify(key);
}

function capitalize(name: string): string {
  if (!name) return "Anonymous";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function jsonToTypeScript(
  jsonStr: string,
  options: JsonToTsOptions = {}
): JsonToTsResult {
  const trimmed = jsonStr.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter JSON to generate TypeScript interfaces." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Invalid JSON syntax.";
    return { ok: false, reason: `JSON Syntax Error: ${msg}` };
  }

  const rootName = (options.rootName?.trim() || "Root").replace(/[^a-zA-Z0-9_$]/g, "") || "Root";
  const useInterface = options.useInterface ?? true;
  const keyword = useInterface ? "interface" : "type";
  const assignment = useInterface ? "" : " =";

  const typeDefinitions: string[] = [];
  const generatedNames = new Set<string>();

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
    if (val === null) return "any";
    if (typeof val === "string") return "string";
    if (typeof val === "number") return "number";
    if (typeof val === "boolean") return "boolean";

    if (Array.isArray(val)) {
      if (val.length === 0) return "any[]";
      const itemTypes = Array.from(
        new Set(val.map((item) => resolveType(item, `${keyHint}Item`)))
      );
      if (itemTypes.length === 1) {
        return `${itemTypes[0]}[]`;
      }
      return `(${itemTypes.join(" | ")})[]`;
    }

    if (typeof val === "object") {
      const obj = val as Record<string, unknown>;
      const keys = Object.keys(obj);
      if (keys.length === 0) return "Record<string, any>";

      const typeName = getUniqueName(keyHint);
      const lines: string[] = [];

      for (const k of keys) {
        const propType = resolveType(obj[k], k);
        lines.push(`  ${formatKey(k)}: ${propType};`);
      }

      const body = `export ${keyword} ${typeName}${assignment} {\n${lines.join("\n")}\n}`;
      typeDefinitions.push(body);
      return typeName;
    }

    return "any";
  }

  // Handle root object or array
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      return { ok: true, code: `export type ${rootName} = any[];` };
    }
    const elemType = resolveType(parsed[0], `${rootName}Item`);
    typeDefinitions.push(`export type ${rootName} = ${elemType}[];`);
  } else if (typeof parsed === "object" && parsed !== null) {
    const obj = parsed as Record<string, unknown>;
    const keys = Object.keys(obj);
    generatedNames.add(capitalize(rootName));

    const lines: string[] = [];
    for (const k of keys) {
      const propType = resolveType(obj[k], k);
      lines.push(`  ${formatKey(k)}: ${propType};`);
    }

    const rootDef = `export ${keyword} ${capitalize(rootName)}${assignment} {\n${lines.join("\n")}\n}`;
    typeDefinitions.push(rootDef);
  } else {
    const primType = resolveType(parsed, rootName);
    return { ok: true, code: `export type ${rootName} = ${primType};` };
  }

  // Reverse so helper interfaces come before root, or root is visible at top
  return { ok: true, code: typeDefinitions.join("\n\n") };
}
