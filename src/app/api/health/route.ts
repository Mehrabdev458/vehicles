import connectToMongoDB from "@/db";

export async function GET() {
  console.log("🧪 API HIT");

  await connectToMongoDB();

  return Response.json({ status: "mongo connected" });
}