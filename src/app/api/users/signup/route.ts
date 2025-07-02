import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"; //using for increaption of password
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 }
      );
    }

    //hashing password

    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // adding new user to db
    const newUser = new User({
      username: username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // savedUser.then(() => {
    //   console.log("new user added: ", newUser);
    // })
    // .catch((error: any) => {
    //   console.log({ error: error.message });
    // });

    // mailer

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User register successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
