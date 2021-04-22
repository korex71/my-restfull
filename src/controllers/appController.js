const user = (req, res) => {
  res.json({ user: req.userId });
};

const update = (req, res) => {
  res.json({ user: req.userId });
};

const forgot = (req, res) => {
  res.json({ user: req.userId });
};

export default { user, update, forgot };
