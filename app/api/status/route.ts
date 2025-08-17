import prisma from "@/prisma/db";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ ok: false, error: "Database unreachable" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
