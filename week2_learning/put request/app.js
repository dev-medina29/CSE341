const axios = require("axios");

const data = {
  name: "Hardik Savani",
  job: "Blog Writer",
};

axios
  .put("https://reqres.in/api/users/2", data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    console.log(`Status: ${res.status}`);
    console.log("Body: ", res.data);
  })
  .catch((err) => {
    console.error("Error:", err.response?.status, err.response?.data);
  });
