const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { PubSub } = require('apollo-server')


// Consts
const JWT_SECRET = '1234567890'
const MONGODB_URI = 'mongodb://127.0.0.1:27017/app-library'


// Connection to the Database
console.info('Connecting to:', MONGODB_URI)
mongoose.set('useFindAndModify', false)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info('Connected to MongoDB.')
  })
  .catch((error) => {
    console.error('ERROR connecting to MongoDB:', error.message)
  })

// Subscriber
const pubsub = new PubSub()


// GraphQL Schema
const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`


const resolvers = {
  Query: {
    hello: () => { return "hello world!" },
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author', { name: 1, born: 1 })
      /*
      if (args.author) {
        result = result.filter(b => b.author === args.author)
      }
      */
      if (args.genre) {
        result = result.filter(b => b.genres.includes(args.genre))
      }
      const books = await Book.find({}).populate('author', { _id: 1, name: 1 } )
      return result.map(b => ({
        title: b.title,
        published: b.published,
        genres: b.genres,
        author: {
          name: b.author.name,
          born: b.author.born
        },
        bookCount: books.filter(b => b.author && b.author.name === a.name).length
      }))
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author', { _id: 1, name: 1 } )
      return authors.map(a => ({
        name: a.name,
        born: a.born,
        bookCount: (() => books.filter(b => b.author && b.author.name === a.name).length)()
      }))
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (!args.author) {
        throw new UserInputError("Author is required")
      }
      if (args.title.length < 2) {
        throw new UserInputError("Title must be at least 2 character")
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ 
            name: args.author
          })
          author = await author.save()
        }
        const book = new Book({ 
          title: args.title, 
          published: args.published, 
          genres: args.genres, 
          author: author._id
        })
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book})
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }      
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        author.save()
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      if (args.favoriteGenre) {
        user.favoriteGenre = args.favoriteGenre
      }
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== '123') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})