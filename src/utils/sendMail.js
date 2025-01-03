import nodemailer from 'nodemailer';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST', null),
  port: Number(env('SMTP_PORT', null)),
  secure: false,
  auth: {
    user: env('SMTP_USER', null),
    pass: env('SMTP_PASSWORD', null),
  },
});

export async function sendMail(message) {
  return await transporter.sendMail(message);
}
