import authModel from '../models/User'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'

const getSecretAndBase64 = async (user) => {
    const secret = speakeasy.generateSecret({user}); // Generate2FA Secret
    const base64 = await qrcode.toDataURL(secret.otpauth_url) // Generate QR Base64

    return {
      ascii: secret.ascii,
      base64
    }
}

const userExists = async (props) => {
  const [
    user,
    email
  ] = [
    await authModel.findOne({username: props}),
    await authModel.findOne({email: props})
  ]

  console.log('*** Helper [ UserExists ] \n*** ', {user, email})

  return {
    exists: Boolean(user || email),
    user: user && email && null
  }
}

const verifyCodeByUser = async (email, code) => {
  const {exists, user} = await userExists(email)
  if(!exists) 
    return new Error('User not exists.')

  return speakeasy.totp.verify({
    secret: user.twoFactors, // Ascii de IsTest
    token: code, // Token atual no app Google Authenticator para verificação.
    encoding: "ascii",
  });

}

export default {
  userExists,
  getSecretAndBase64,
  verifyCodeByUser
}