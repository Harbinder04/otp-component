import express from "express";
import { Resend } from "resend";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
console.log(process.env.RESEND_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/send", async (req, res) => {
  const { email } = req.query;
  console.log(email);
  const reandomOtp = Math.floor(1000 + Math.random() * 9000);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "hello world",
    html: `<strong>it works!</strong> <br> Your OTP is ${reandomOtp}`,
  });

  if (error) {
    console.log(error);
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
