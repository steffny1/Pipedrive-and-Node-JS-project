const express = require("express");
const lib = require("pipedrive");

//initialize express app
const app = express();
const port = process.env.PORT || 5000;

lib.Configuration.apiToken = "4aaf3dc71669d84f5198c16d3ad9e7ff7c214ad5";

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

//await only works on promises
//setTimeout does not return a promise so cannot be awaited
const setTimeoutPromise = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

//route
app.get("/", async (req, res) => {
  res.header("Content-Type", "application/json");

  var input = {};
  input["user_id"] = 11765267;
  input["assigned_to_user_id"] = 11765267;
  input["filter_id"] = 11765267;

  try {
    const activity =
      await lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser(
        input,
        setTimeoutPromise(120000)
      );
    res.send(JSON.stringify(activity, null, 4));
  } catch (error) {
    console.log(error);
  }
});

//get all users
app.get("/users", async (req, res) => {
  res.header("Content-Type", "application/json");

  try {
    const user = await lib.UsersController.getAllUsers();
    res.send(JSON.stringify(user, null, 4));
  } catch (error) {
    console.log(error);
  }

  //"id":11765267,"name":"Paola",
  //"id":11765255,"name":"Paul Kortman
});

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
