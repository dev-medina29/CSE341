const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
module.exports = (mongoose) => {
  const Temple = mongoose.model(
    "temples",
    mongoose.Schema(
      {
        temple_id: Number,
        name: String,
        location: String,
        dedicated: String,
        additionalInfo: Boolean,
      },
      { timestamps: true },
    ),
  );

  return Temple;
};
