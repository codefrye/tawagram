const bodyParser = require('body-parser')
const { configDotenv } = require('dotenv').config()
const express = require ('express')
const { default: mongoose } = require('mongoose')
const app = express()
const AuthRoute =require('./Routes/AuthRoute')
const UserRoute =require ('./Routes/UserRoute')
const PostRoute =require('./Routes/PostRoute')
const ChatRoute =require('./Routes/ChatRoute')
const MessageRoute =require('./Routes/MesssageRoute')
const cors =require('cors')
const UploadRoute =require('./Routes/UploadRoute')
app.use(cors())
app.use(bodyParser.json({limit:'30mb',extended:"true"})) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded( { extended: true, limit: '30mb' })); // to support URL-encoded
mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log("connected to the tawagram database");
})
.catch((err) => {
    console.log(err);
})


app.get('/', (req, res) => res.send('tawagram API'))
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`))
// to serve images for public
app.use(express.static('public')); 
app.use('/images', express.static('images'))
// usage of routes
app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/post', PostRoute)
  app.use('/upload',UploadRoute)
  app.use('/chat',ChatRoute)
  app.use('/message',MessageRoute)