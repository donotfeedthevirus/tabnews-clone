import { NextApiRequest, NextApiResponse } from "next";
import database from "../../../../infra/database.ts";

export default async function status(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows[0].sum);
  res.status(200).json({ status: "ok" });
}
