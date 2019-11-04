/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

const http   = require('http')
const app    = require('./app')
const config = require('./utils/config')
const uri    = require('./utils/uri')


const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log('Starting Application [', (new Date()).toLocaleTimeString(), ']')
  console.log(`URL: http://localhost:${config.PORT}${uri.API_URI}`)
})