const nodemailer = require("nodemailer");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const configEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(options);
};

const emailController = {
  SendMail: async (req, res) => {
    try {
      const { to, subject, html } = req.body;
      await configEmail(to, subject, html);
      res.status(201).json({
        status: "success",
        message: "Gửi thành công",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = emailController;
