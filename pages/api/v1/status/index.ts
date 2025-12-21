import { NextApiRequest, NextApiResponse } from "next";
import database from "infra/database";

export default async function status(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const updatedAt = new Date().toISOString();

  const versionResult = await database.query("SHOW server_version;");
  const version = versionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const openConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE state = 'active' AND datname = $1;",
    values: [databaseName],
  });
  const openConnections = openConnectionsResult.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: parseInt(maxConnections),
        open_connections: openConnections,
      },
    },
  });
}
