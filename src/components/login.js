import axios from "axios";

const login = async (code) => {
  console.log("🚀 ~ file: googleAuth.js ~ line 2 ~ login ~ code", code);
  return axios("http://192.168.1.11:5000/api/users/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ code }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
};

export { login };
