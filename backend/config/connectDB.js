const mongoose = require("mongoose");

// connection DB
exports.connectDB = async (URL) => {
  return await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("connect DB");
    })
    .catch((error) => {
      console.log(`can't connect DB because ${error.message}`);
    });
};
