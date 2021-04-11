import moment from "moment";
import nodemailer from "nodemailer";
import inlineBase64 from 'nodemailer-plugin-inline-base64';
import 'dotenv/config.js'

const env = process.env.NODE_ENV || "development";

const service = {
  development: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.DEV_MAIL_USER,
      pass: process.env.DEV_MAIL_PASS
    }
  },
  production: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  }
}

const transporter = nodemailer.createTransport(service[env])

export default async (data) => {

  moment.locale("pt-br");

  // const base64Image = data.base64.split(";base64,").pop(); //Extract only B64 code

  const mailHtml = `
  <html>
    <h1>Utilize com Google Authenticator.</h1>
      <br>
    <h2>Olá ${data.user}</h2>
      <br>
    <img src="${data.base64}">
      <br>
    Enviado as ${moment().format("DD/MM/YYYY HH:mm")}
  </html>
  `;

  const mailOptions = {
    from: "Kore <Kore@korex.com>",
    to:`${data.user} <${data.email}>`,
    subject: "Use este QRCODE em Google Authenticator",
    html: mailHtml,
  };

  transporter.use('compile', inlineBase64({cidPrefix: 'qrcode'}))

  return await transporter.sendMail(mailOptions) // send
}