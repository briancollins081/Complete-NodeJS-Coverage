const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post{
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }
    input PostInputData{
        title: String!
        content: String!
        imageUrl: String!
    }
    input LoginInput{
        email: String!
        password: String!
    }
    type AuthData {
        token: String!
        userId: String!
    }
    type PostsData{
        posts: [Post!]!
        totalPosts: Int!
    }
    type RootMutation {
        createUser(userInput: UserInputData):User!
        createPost(postInput: PostInputData):Post!
    }

    type RootQuery {
        login(loginInput: LoginInput):AuthData!
        posts(page: Int!):PostsData!
        post(postId: ID!):Post!
    }

    schema {
        mutation: RootMutation
        query: RootQuery
    }
`);