import qrcode from 'qrcode';
import speakeasy from 'speakeasy';
import sendMail from './sendMail.js';
import userModel from '../../models/User.js'
import db from '../../config/database.js'

class User {

  async #getSecretAndBase64(user){
    const secret = speakeasy.generateSecret({user}); // Generate2FA Secret
    const base64 = await qrcode.toDataURL(secret.otpauth_url) // Generate QR Base64

    return {
      ascii: secret.ascii,
      base64
    }
  }

  async createUser(data){
    const {user, email, password} = data;

    if(await userModel.findOne({ email }))
      throw new Error("Email already exists.");
    if(await userModel.findOne({ user }))
      throw new Error("User already exists");

    const {ascii, base64} = await this.#getSecretAndBase64(user);

    await userModel.create({
      user: user,
      email: email,
      twoFactors: ascii,
      password: password,
    })
    
    console.time(emailTime)

    await sendMail({ email, user, base64})
    console.timeEnd(emailTime)
  }

  getUsers(res){
    db.auths /* Caralho de método toArray que não funciona no model. */
      .find({})
      .toArray((err, result) => {
        if (err) res.status(500).json({ message: "Erro interno." });
        result.length // > 0 // true // have a user //
          ? res.status(200).json(result)
          : res.status(200).json({ message: "Nenhum usuário." });
      });
  }

  getUser(user){

  }

  async deleteUsers(res){
    userModel
      .deleteMany({})
      .then(query => {
        if(query.deletedCount)
          res.status(200).json({message: 'Success', removed: query.deletedCount})
        else
          res.status(400).json({message: 'Does not have any user to remove.'})
      })
      .catch(e => {
        throw new Error (e.message || 'Unexpected error.')
      })
  }

  async deleteUser(req, res){
    userModel
      .deleteOne({email: req.params.email})
      .then(query => {
        if(query.deletedCount)
          res.status(200)
          .json({
            message: "Usuário removido."
          })
        else
          res.status(404)
            .json({ Email: req.params.email, message: "Usuário não encontrado." });
      })
  }
}

export default new User;

// 1. Delete user if email is not sent
// 2. Add a new route to "re-send email verification"

// const deleteUser = (email) => {
//   userModel
//     .deleteOne({email})
//     .catch(err => { throw err });
// }