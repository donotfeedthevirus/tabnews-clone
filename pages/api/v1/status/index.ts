import { NextApiRequest, NextApiResponse } from "next";

export default function status(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  res.status(200).json({ status: "ok" });
}
