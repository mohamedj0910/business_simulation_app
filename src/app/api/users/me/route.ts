import { getDB } from "@/lib/get-db";
import jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token:any = req.cookies.get('token')
  if(!token){
    return NextResponse.json({
      message:"No user logged in"
    })
  }
  const decoded:any = jwt.verify(token.value, process.env.JWT_SECRETE!)
  const db = await getDB();
  console.log(decoded)
  const user = await db.getUserByEmail(decoded.email)
  console.log('user',user)
  return NextResponse.json({user})
}