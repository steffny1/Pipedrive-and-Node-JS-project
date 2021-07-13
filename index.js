const express = require("express");
const lib = require("pipedrive");

//initialize express app
const app = express();
const port = process.env.PORT || 5000;

lib.Configuration.apiToken = "INSERT API KEY HERE";

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

  const activity =
    await lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser(
      input,
      setTimeoutPromise(120000)
    );
  res.send(JSON.stringify(activity, null, 4));
});

/*
//get all users
app.get("/", async (req, res) => {
  res.header("Content-Type", "application/json");

  const user = await lib.UsersController.getAllUsers();
  //res.send(JSON.stringify(user, null, 4));
  res.send(user);
  //"id":11765267,"name":"Paola",
  //"id":11765255,"name":"Paul Kortman
});
*/

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
