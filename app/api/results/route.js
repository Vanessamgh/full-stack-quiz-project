/**
 * app/api/results/route.js
 * Saves/reads quiz results, scoped per anonymous visitor (no login system —
 * see lib/visitor.js for how the visitor ID is generated).
 */

export async function POST(request) {
  const body = await request.json();

  if (!process.env.DATABASE_URL) {
    return Response.json({ saved: false, reason: "no-database-configured" });
  }

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);

  // A quiz can end in a tie between two (or more) archetypes — e.g. owl and
  // dolphin both scoring 5. Find every archetype at the top score, not just
  // whichever one Array.sort() happens to put first, and store all of them
  // joined with "+" (e.g. "dolphin+owl") so hybrid results aren't silently
  // collapsed into a single winner.
  const topScore = Math.max(...Object.values(body.scores));
  const winnerId = Object.entries(body.scores)
    .filter(([, score]) => score === topScore)
    .map(([id]) => id)
    .sort()
    .join("+");

  const [row] = await sql`
    INSERT INTO results (archetype, scores, visitor_id)
    VALUES (${winnerId}, ${JSON.stringify(body.scores)}, ${body.visitorId || null})
    RETURNING id, archetype, created_at
  `;

  return Response.json(row);
}

export async function GET(request) {
  if (!process.env.DATABASE_URL) {
    return Response.json([]);
  }

  const { searchParams } = new URL(request.url);
  const visitorId = searchParams.get("visitor_id");

  if (!visitorId) {
    // No visitor ID sent — don't return anyone's data.
    return Response.json([]);
  }

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(process.env.DATABASE_URL);

  const rows = await sql`
    SELECT archetype, created_at FROM results
    WHERE visitor_id = ${visitorId}
    ORDER BY created_at DESC LIMIT 20
  `;

  return Response.json(rows);
}
