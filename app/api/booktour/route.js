import Booking from "../../(models)/booking"; // Corrected the import path
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const book = await Booking.find({});

    return NextResponse.json({ book }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, selectedDate} = body; // Extract userName and tourId from the request body

    // Create a new booking with the userName, selectedDate, and tourId
    await Booking.create({
      username,
      selectedDate: new Date(selectedDate) // Ensure selectedDate is a Date object
    });

    return NextResponse.json({ message: "Tour booked" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
