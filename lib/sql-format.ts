export type SqlFormatOptions = {
  indent?: 2 | 4;
  uppercase?: boolean;
};

export type SqlFormatResult =
  | { ok: true; formatted: string }
  | { ok: false; reason: string };

const MAJOR_CLAUSES = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "HAVING",
  "ORDER BY",
  "LIMIT",
  "OFFSET",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE FROM",
  "UNION ALL",
  "UNION",
  "CREATE TABLE",
  "ALTER TABLE",
  "DROP TABLE",
];

const SUB_CLAUSES = [
  "LEFT JOIN",
  "RIGHT JOIN",
  "INNER JOIN",
  "OUTER JOIN",
  "CROSS JOIN",
  "JOIN",
  "ON",
  "AND",
  "OR",
];

const KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "GROUP", "BY", "HAVING", "ORDER", "LIMIT", "OFFSET",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "UNION", "ALL",
  "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "CROSS", "ON", "AND", "OR",
  "AS", "DISTINCT", "NULL", "NOT", "IS", "IN", "LIKE", "BETWEEN", "EXISTS",
  "CASE", "WHEN", "THEN", "ELSE", "END", "ASC", "DESC", "CREATE", "TABLE",
  "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "DEFAULT", "DROP", "ALTER",
  "COUNT", "SUM", "AVG", "MIN", "MAX",
]);

export function minifySql(sql: string): string {
  return sql
    .replace(/\/\*[\s\S]*?\*\/|--.*$/gm, "") // Strip comments
    .replace(/\s+/g, " ")
    .trim();
}

export function formatSql(sql: string, options: SqlFormatOptions = {}): SqlFormatResult {
  const trimmed = sql.trim();
  if (!trimmed) {
    return { ok: false, reason: "Please enter a SQL query to format." };
  }

  const indentSize = options.indent ?? 2;
  const uppercase = options.uppercase ?? true;
  const indentStr = " ".repeat(indentSize);

  // Tokenize preserving comments and string literals
  const tokens: { type: "word" | "string" | "comment" | "punct"; text: string }[] = [];
  let i = 0;
  const len = trimmed.length;

  while (i < len) {
    const char = trimmed[i];

    // Block comment /* ... */
    if (char === "/" && trimmed[i + 1] === "*") {
      const end = trimmed.indexOf("*/", i + 2);
      const comment = end === -1 ? trimmed.slice(i) : trimmed.slice(i, end + 2);
      tokens.push({ type: "comment", text: comment });
      i += comment.length;
      continue;
    }

    // Line comment -- ...
    if (char === "-" && trimmed[i + 1] === "-") {
      let end = trimmed.indexOf("\n", i + 2);
      if (end === -1) end = len;
      const comment = trimmed.slice(i, end);
      tokens.push({ type: "comment", text: comment });
      i = end;
      continue;
    }

    // String literals '...'
    if (char === "'" || char === '"') {
      const quote = char;
      let j = i + 1;
      while (j < len) {
        if (trimmed[j] === "\\" && j + 1 < len) {
          j += 2;
        } else if (trimmed[j] === quote) {
          j++;
          break;
        } else {
          j++;
        }
      }
      tokens.push({ type: "string", text: trimmed.slice(i, j) });
      i = j;
      continue;
    }

    // Whitespace
    if (/\s/.test(char!)) {
      i++;
      continue;
    }

    // Punctuation
    if (/[,();]/.test(char!)) {
      tokens.push({ type: "punct", text: char! });
      i++;
      continue;
    }

    // Words / Identifiers / Operators
    let j = i;
    while (j < len && !/\s|[,();'"\-]/.test(trimmed[j]!)) {
      j++;
    }
    const word = trimmed.slice(i, j);
    tokens.push({ type: "word", text: word });
    i = j;
  }

  // Multi-word phrase grouping
  const normalizedWords: { type: "word" | "string" | "comment" | "punct"; text: string }[] = [];
  for (let k = 0; k < tokens.length; k++) {
    const cur = tokens[k]!;
    const next = tokens[k + 1];

    if (cur.type === "word" && next && next.type === "word") {
      const pair = `${cur.text.toUpperCase()} ${next.text.toUpperCase()}`;
      if (
        pair === "GROUP BY" ||
        pair === "ORDER BY" ||
        pair === "LEFT JOIN" ||
        pair === "RIGHT JOIN" ||
        pair === "INNER JOIN" ||
        pair === "CROSS JOIN" ||
        pair === "UNION ALL" ||
        pair === "INSERT INTO" ||
        pair === "DELETE FROM" ||
        pair === "CREATE TABLE" ||
        pair === "DROP TABLE" ||
        pair === "ALTER TABLE"
      ) {
        normalizedWords.push({
          type: "word",
          text: uppercase ? pair : `${cur.text} ${next.text}`,
        });
        k++;
        continue;
      }
    }

    if (cur.type === "word" && uppercase && KEYWORDS.has(cur.text.toUpperCase())) {
      normalizedWords.push({ type: "word", text: cur.text.toUpperCase() });
    } else {
      normalizedWords.push(cur);
    }
  }

  // Line & Indent Assembler
  const lines: string[] = [];
  let currentLine = "";

  for (let k = 0; k < normalizedWords.length; k++) {
    const token = normalizedWords[k]!;
    const upperText = token.text.toUpperCase();

    if (MAJOR_CLAUSES.includes(upperText)) {
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trimEnd());
      }
      currentLine = token.text + " ";
      continue;
    }

    if (SUB_CLAUSES.includes(upperText)) {
      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trimEnd());
      }
      currentLine = `${indentStr}${token.text} `;
      continue;
    }

    if (token.text === ",") {
      currentLine = currentLine.trimEnd() + ",\n" + indentStr;
      continue;
    }

    if (token.text === "(") {
      currentLine += "(";
      continue;
    }

    if (token.text === ")") {
      currentLine = currentLine.trimEnd() + ") ";
      continue;
    }

    if (token.text === ";") {
      currentLine = currentLine.trimEnd() + ";";
      continue;
    }

    currentLine += token.text + " ";
  }

  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trimEnd());
  }

  return { ok: true, formatted: lines.join("\n").trim() };
}
