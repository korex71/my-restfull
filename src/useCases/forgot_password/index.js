import crypto from "crypto";
import userModel from "../../models/User"

export default async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({ error: "Usuário não encontrado." });

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await userModel.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });
    
    res.status(200).send({message: "Verifique seu email."})
  } catch (err) {
    res.status(400).send({ error: "Erro ao recuperar a senha." });
  }
}