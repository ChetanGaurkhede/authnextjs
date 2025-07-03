import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  // Extract data from token
  const userId = getDataFromToken(request);
  const user = User.findOne({ _id: userId }).select("-password"); // "-"means not select

  //Check if there is no user

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
