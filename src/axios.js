import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-c64da.cloudfunctions.net/api",
  // "http://localhost:5001/clone-c64da/us-central1/api",
});

export default instance;
