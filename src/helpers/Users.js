import authModel from "../models/User";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

const getSecretAndBase64 = async (user) => {
  const secret = speakeasy.generateSecret({ user }); // Generate2FA Secret
  const base64 = await qrcode.toDataURL(secret.otpauth_url); // Generate QR Base64

  return {
    ascii: secret.ascii,
    base64,
  };
};

const userExists = async (props) => {
  const [user, email] = [
    await authModel.findOne({ user: props }),
    await authModel.findOne({ email: props }),
  ];

  console.log("*** Helper [ UserExists ] \n*** ", { user, email });

  return {
    exists: Boolean(user || email),
    user: user || email,
  };
};

const verifyCodeByUser = async (email, code) => {
  const { exists, user } = await userExists(email);

  if (!exists) return new Error("User not exists.");

  const opts = {
    secret: user.twoFactors, // Secret do token do usuário em ascii.
    token: code, // Token para para verificação.
    encoding: "ascii",
  };

  return speakeasy.totp.verify(opts);
};

export default {
  userExists,
  getSecretAndBase64,
  verifyCodeByUser,
};
