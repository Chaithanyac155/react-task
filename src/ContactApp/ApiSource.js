import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/",
});
// json-server --watch data/contacts.json --port 8000
