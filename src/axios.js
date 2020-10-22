import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-20e78.cloudfunctions.net/api", // API URL, cloud function url
});

export default instance;
