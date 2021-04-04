import speakeasy from "speakeasy";
import db from "../config/database";

export function generate(name) {
  const Secret = speakeasy.generateSecret({ name });

  return {
    user: name,
    Secret,
  };
}

export async function verifyCodeByUser(email, code) {
  const isExisting = await db.collection("auths").findOne({ email });
  if (isExisting && isExisting.email === email) {
    const Match = speakeasy.totp.verify({
      secret: isExisting.twoFactors, // Ascii de IsTest
      token: code, // Token atual no app Google Authenticator para verificação.
      encoding: "ascii",
    });
    return Match;
  }
}
