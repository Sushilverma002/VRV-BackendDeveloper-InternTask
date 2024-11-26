import transporter from "../config/mailerConfig.js";

const mailSender = async (email, title, body) => {
  try {
    let info = await transporter.sendMail({
      from: "thank you for registration at vrv security",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Email information", info);
    return info;
  } catch (error) {
    return error;
  }
};

export default mailSender;
