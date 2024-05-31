const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const errMessage = err.errors[0].message;
    res.status(400).json({ msg: errMessage });
  }
};

module.exports = validate;
