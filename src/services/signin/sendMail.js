import moment from "moment";
import nodemailer from "nodemailer";
import "dotenv/config.js";

const env = process.env.NODE_ENV || "development";

const service = {
  development: {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.DEV_MAIL_USER,
      pass: process.env.DEV_MAIL_PASS,
    },
  },
  production: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
};

const host = process.env.HOST; // Frontend web host

const transporter = nodemailer.createTransport(service[env]);

export default async (data) => {
  moment.locale("pt-br");

  const mailHtml = `
  <html>
    <h1>Entre por este link para recuperar sua senha.</h1>
      <br>
    <h3>${host}/forgot_password/${data.token}</h3>
      <br>
      <br>
    Enviado as ${moment().format("DD/MM/YYYY HH:mm")}
  </html>
  `;

  const mailOptions = {
    from: "Kore <Kore@korex.com>",
    to: `${data.user} <${data.email}>`,
    subject: "Recuperação de senha",
    html: mailHtml,
  };

  return await transporter.sendMail(mailOptions); // send
};
