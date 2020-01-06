const { ApolloServer, gql, UserInputError } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')


// Connection to the Database
const MONGODB_URI = 'mongodb://127.0.0.1:27017/app-library'
console.info('Connecting to:', MONGODB_URI)
mongoose.set('useFindAndModify', false)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info('Connected to MongoDB.')
  })
  .catch((error) => {
    console.error('ERROR connecting to MongoDB:', error.message)
  })


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

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`


const resolvers = {
  Query: {
    hello: () => { return "hello world!" },
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
      return result.map(b => ({
        title: b.title,
        published: b.published,
        genres: b.genres,
        author: {
          name: b.author.name,
          born: b.author.born
        }
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
    addBook: async (root, args) => {
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
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
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
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})