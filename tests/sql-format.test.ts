import { describe, expect, it } from "vitest";
import { formatSql, minifySql } from "@/lib/sql-format";

describe("SQL Formatter", () => {
  it("formats standard SELECT queries with proper indentation", () => {
    const raw = "select id, name, email from users where active = 1 order by name asc;";
    const res = formatSql(raw);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.formatted).toContain("SELECT");
    expect(res.formatted).toContain("FROM users");
    expect(res.formatted).toContain("WHERE active = 1");
    expect(res.formatted).toContain("ORDER BY name ASC;");
  });

  it("indents sub-clauses like JOIN and AND", () => {
    const raw =
      "select u.name, o.total from users u left join orders o on u.id = o.user_id where o.status = 'completed' and o.total > 100";
    const res = formatSql(raw);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.formatted).toContain("LEFT JOIN orders o");
    expect(res.formatted).toContain("ON u.id = o.user_id");
    expect(res.formatted).toContain("AND o.total > 100");
  });

  it("preserves string literals with spaces and special characters", () => {
    const raw = "select * from logs where message = 'Error: connection lost; retry later'";
    const res = formatSql(raw);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.formatted).toContain("'Error: connection lost; retry later'");
  });

  it("minifies SQL query by removing excess whitespace and comments", () => {
    const query = `
      -- Fetch active users
      SELECT id, name
      FROM users
      /* multi-line comment */
      WHERE active = 1;
    `;
    const minified = minifySql(query);
    expect(minified).toBe("SELECT id, name FROM users WHERE active = 1;");
  });

  it("supports 4-space indentation option", () => {
    const raw = "select a, b from table join other on table.id = other.id";
    const res = formatSql(raw, { indent: 4 });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.formatted).toContain("    JOIN other");
  });

  it("rejects empty input", () => {
    const res = formatSql("   ");
    expect(res.ok).toBe(false);
  });
});
