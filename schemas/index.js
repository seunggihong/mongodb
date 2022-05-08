const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
};
mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("mongo db connect error", error);
    } else {
      console.log("success mongo db connection");
    }
  }
);
mongoose.connection.on("error", (error) => {
  console.log("mongo db connect error", error);
});
mongoose.connection.on("disconnected", () => {
  console.log("redirecting mongodb ...");
  connect();
});

module.exports = connect;
