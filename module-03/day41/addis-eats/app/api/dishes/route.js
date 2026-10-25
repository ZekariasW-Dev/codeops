import { getDishPage } from "../../menu/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const query = searchParams.get("q") ?? "";

  return Response.json(
    getDishPage({
      page: Number.isNaN(requestedPage) ? 1 : requestedPage,
      query,
    }),
  );
}
