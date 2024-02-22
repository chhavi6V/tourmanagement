import Tour from "../../(models)/booking";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await Tour.find({});

    return NextResponse.json({ tours }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const booking = body.bookTour;

    await Tour.create(tourData);

    return NextResponse.json({ message: "Tour Created" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
