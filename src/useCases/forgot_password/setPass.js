import userModel from "../../models/User";
import bcrypt from 'bcryptjs'

export default async (req, res) => {
  const {email, password} = req.body;
  if(!password) res.status(401).send({error: 'Token correto porém campo senha vazio'});

  const user = await userModel.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({ error: "Usuário não encontrado." });
  const hash = await bcrypt.hash(password, 10);
  await userModel.findByIdAndUpdate(user.id, {
    $unset: {
      passwordResetToken: '',
      passwordResetExpires: '',
    },
    $set: {
      password: password,
    }
  });
  
}