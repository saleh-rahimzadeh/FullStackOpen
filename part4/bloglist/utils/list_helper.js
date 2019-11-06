const _ = require('lodash')



const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likes = blogs.map(blog => blog.likes)
  const position = likes.indexOf(Math.max.apply(Math, likes))

  return {
    title: blogs[position].title,
    author: blogs[position].author,
    likes: blogs[position].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupedBlogs = _.groupBy(blogs, function(blog) {
    return blog.author
  })

  const authors = _.map(groupedBlogs, (value, key) => {
    return {
      author: key,
      blogs: value.length
    }
  })

  const blogsCollection = authors.map(item => item.blogs)
  const max = blogsCollection.indexOf(Math.max.apply(Math, blogsCollection))

  return authors[max]
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}