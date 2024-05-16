import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest, response: NextResponse) {
  const { subject, emailContent } = await request.json();

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.FC_MAIN, // your SMTP username
      pass: process.env.FC_SEC // your SMTP password
    }
  });

  // Send mail with specified transport object
  let info = await transporter.sendMail({
    from: `"Moonlite Web" <${process.env.FC_MAIN}>`, 
    to: process.env.FC_MAIN, 
    subject: subject, 
    // text: text, 
    html: emailContent, // HTML body content
  });
  return Response.json({});
}