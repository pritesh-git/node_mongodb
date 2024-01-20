module.exports = function (app) {
  const user = require("./Controller");

  app.post("/login", user.LoginUser);
  app.post("/newUser", user.create);
  app.get("/users", user.GetAll);
  app.get("/user/:id", user.GetByID);
  app.put("/updateUser/:id", user.updateByID);
  app.delete("/deleteUser/:id", user.DeleteByID);
};
