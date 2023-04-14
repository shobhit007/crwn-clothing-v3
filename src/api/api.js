import axios from "axios";

export default axios.create({
  baseURL: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_HM_API_KEY}`,
    "X-RapidAPI-Host": `${process.env.REACT_APP_HM_API_HOST}`,
  },
});
