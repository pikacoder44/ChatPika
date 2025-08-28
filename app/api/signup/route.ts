import { NextResponse } from "next/server";
import mongoose from "mongoose";
// export async function POST(req) {
//   let user = await req.json();
//   if (!user || !user.name || !user.createdAt) {
//     return NextResponse.json(
//       { error: "Name and createdAt are required." },
//       { status: 400 }
//     );
//   }
//   // Process data pending : Save to DB

//   return NextResponse.json(
//     {
//       message: "User Added",
//       user: `${user.name} and created at: ${user.createdAt}:00`,
//     },
//     { status: 200 }
//   );
// }

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log("MongoDb Connected")
  } catch (error) {
    console.log("Error", error);
  }
}
