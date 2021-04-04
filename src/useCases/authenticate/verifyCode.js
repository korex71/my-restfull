import db from '../../config/database.js'
export default async (req, res) => {
  const {email, code} = req.body;
  const isExisting = await db.collection("auths").findOne({ email });
  if (isExisting) {
    const Match = speakeasy.totp.verify({
      secret: isExisting.twoFactors, // Ascii de IsTest
      token: code, // Token atual no app Google Authenticator para verificação.
      encoding: "ascii",
    });
    return Match;
  }
  
  return res.status(401).send({error: 'Unexpected error.'})
}