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
    res.status(200).send("Welcome to the Registration Page !");
  } catch {
    res.status(404).send("Page Not Found !");
  }
};

module.exports = { home, register };
