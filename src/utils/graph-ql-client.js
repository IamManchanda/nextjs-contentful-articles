import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.CONTENTFUL_SPACES_URL}/${process.env.CONTENTFUL_SPACE_ID}`;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

export default graphQLClient;
