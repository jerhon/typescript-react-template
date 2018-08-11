import { MongoClient } from "mongodb";

const MONGODB_CONNECT_STRING = "mongodb://localhost/react-sample" || process.env.MONGODB_CONNECT_STRING;

export default async function connect() {
  return await MongoClient.connect(MONGODB_CONNECT_STRING);
}
