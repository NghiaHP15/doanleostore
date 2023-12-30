const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successs");
  } catch {
    console.log("Connect fail");
  }
}
module.exports = { connect };
