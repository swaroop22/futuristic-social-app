// GraphQL Resolvers
const authResolvers = require('./authResolvers');
const userResolvers = require('./userResolvers');
const postResolvers = require('./postResolvers');
const messageResolvers = require('./messageResolvers');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
    ...postResolvers.Subscription,
  },
};
