import db from '../../config/database.js'

export default async (req, res, next) => {
  const {token, email} = req.body;

  if(!token) res.status(401).send({error: 'Token not provided.'});
  if(!email) res.status(401).send({error: 'Email not provided.'});

  const info = await db.collection('auths').findOne({email})
  if(info) {
    if(!info.passwordResetToken) res.status(401).send({error: 'Código expirado ou req. inválida.'})
    if(info.passwordResetToken == token) next()
  }

  
}