const express = require('express');
// adds apollo to host express
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');

// imports schemas to server for GraphQL to read
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

// sets port and Apollo server, then runs Express
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if in production, serves client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// creates new instance of Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// calls async function to start server
startApolloServer();