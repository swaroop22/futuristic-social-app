const { gql } = require('apollo-server-express');

module.exports = gql`
  # User Type
  type User {
    id: ID!
    email: String!
    username: String
    avatar: String
    bio: String
    createdAt: String!
  }

  # Post Type
  type Post {
    id: ID!
    content: String!
    media: [String]
    author: User!
    likes: Int!
    comments: [Comment!]!
    createdAt: String!
    updatedAt: String!
  }

  # Comment Type
  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
  }

  # Message Type
  type Message {
    id: ID!
    content: String!
    sender: User!
    receiver: User!
    read: Boolean!
    createdAt: String!
  }

  # Feed Type
  type Feed {
    posts: [Post!]!
    hasMore: Boolean!
  }

  # Auth Response
  type AuthResponse {
    user: User!
    token: String!
  }

  # Queries
  type Query {
    me: User
    user(id: ID!): User
    feed(limit: Int, offset: Int): Feed!
    post(id: ID!): Post
    messages(userId: ID!): [Message!]!
  }

  # Mutations
  type Mutation {
    # Auth
    loginWithGoogle(token: String!): AuthResponse!
    loginWithMagicLink(email: String!): String!
    loginWithWallet(address: String!, signature: String!): AuthResponse!
    
    # User
    updateProfile(username: String, bio: String, avatar: String): User!
    
    # Post
    createPost(content: String!, media: [String]): Post!
    deletePost(id: ID!): Boolean!
    likePost(id: ID!): Post!
    
    # Comment
    addComment(postId: ID!, content: String!): Comment!
    deleteComment(id: ID!): Boolean!
    
    # Message
    sendMessage(receiverId: ID!, content: String!): Message!
    markAsRead(messageId: ID!): Message!
  }

  # Subscriptions (for real-time)
  type Subscription {
    newMessage(userId: ID!): Message!
    newPost: Post!
  }
`;
