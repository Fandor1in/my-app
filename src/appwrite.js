import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6412b1ac9373bb604423");

export const account = new Account(client);
export const databases = new Databases(client);