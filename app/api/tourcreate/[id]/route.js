import Tour from "../../../(models)/tour";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  const foundTour = await Tour.findOne({ _id: id });
  return NextResponse.json({ foundTour }, { status: 200 });
}