const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users API",
    description: "Users API",
  },
  host: "cse341-week1-ot1d.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
