const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to The Home Page !");
  } catch {
    res.status(404).send({
      msg: "Page Not Found !",
    });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: req.body });
  } catch {
    res.status(404).json("Page Not Found !");
  }
};

module.exports = { home, register };
