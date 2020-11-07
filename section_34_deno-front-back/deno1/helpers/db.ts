import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.13.0/mod.ts";

let db: Database;

// Defining schema interface
export interface TodosSchema {
  _id: { $oid: string };
  text: string;
}

export const connect = () => {
  const client = new MongoClient();
  client.connectWithUri("mongodb://127.0.0.1:27017");
  db = client.database("deno-todo-app");
};

export const getDB = () => {
  return db;
};

// export const todosCollection = () => db.collection<TodosSchema>("todos");
