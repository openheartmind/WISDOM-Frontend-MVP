import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to extract the token from the Authorization header
function getToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

// Mock data store - in a real app this would be a database
let mockProfile = {
  email: "",
  displayName: "",
  fullName: "",
  phone: "",
  country: "",
};

export async function GET() {
  try {
    return NextResponse.json(mockProfile, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();

    // Update profile
    mockProfile = {
      ...mockProfile,
      ...updates,
    };

    return NextResponse.json(mockProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
