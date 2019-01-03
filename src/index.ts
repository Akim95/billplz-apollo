require("dotenv").config();
import { ApolloServer } from "apollo-server";
import BillplzAPI from "./datasource/BillplzAPI";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      billlplz: new BillplzAPI(),
    };
  },
});

server.listen().then(({ url }: any) => console.log(`server run on ${url}`));
