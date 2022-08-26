import axios from "axios";

const http = axios.create({ baseURL: "https://poetrydb.org/" });

const getPoem = (category: string, term: string) => http.get(`${category}/${term}`);

export default getPoem;
