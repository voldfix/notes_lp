require('dotenv').config()
const mongoose = require('mongoose')

// const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => console.log('error connecting o MongoDB^ ', err.message))

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (doc, retrunedObj) => {
    retrunedObj.id = retrunedObj._id.toString()
    delete retrunedObj._id
    delete retrunedObj.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)