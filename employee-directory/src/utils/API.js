import axios from "axios";

export default {
  getEmployees: () => axios.get("https://randomuser.me/api/?results=50")
}