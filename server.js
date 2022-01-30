const express = require("express");
const cors = require("cors");
// var bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/db/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to dilpadil application." });
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/background.routes")(app);
require("./app/routes/digitalEnvelope.routes")(app);
require("./app/routes/faq.routes")(app);
require("./app/routes/fitur.routes")(app);
require("./app/routes/invitation.routes")(app);
require("./app/routes/logActivity.routes")(app);
require("./app/routes/loveStory.routes")(app);
require("./app/routes/mainLanding.routes")(app);
require("./app/routes/message.routes")(app);
require("./app/routes/music.routes")(app);
require("./app/routes/mySocialMedia.routes")(app);
require("./app/routes/myTheme.routes")(app);
require("./app/routes/orderStep.routes")(app);
require("./app/routes/photoGallery.routes")(app);
require("./app/routes/presence.routes")(app);
require("./app/routes/price.routes")(app);
require("./app/routes/prokes.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/socialMedia.routes")(app);
require("./app/routes/superiority.routes")(app);
require("./app/routes/testimonial.routes")(app);
require("./app/routes/theme.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/youtube.routes")(app);
require("./app/routes/coupon.routes")(app);
require("./app/routes/invoice.routes")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/status.routes")(app);
require("./app/routes/transaction.routes")(app);
require("./app/routes/userTest.routes")(app);

app.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).send({
      message: "error",
      error: [
        {
          msg: "File is too big",
        },
      ],
    });
    return;
  }

  // Handle any other errors
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "admin",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "user",
  });
}
