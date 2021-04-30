import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: "Token não informado." });

  const token = authHeader.slice(7, authHeader.length);

  jwt.verify(token, process.env.SESS_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token inválido." });

    req.userId = decoded.id;
    return next();
  });
};
