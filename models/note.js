const mongoose = require('mongoose')
// eqW6qilAWbcGRIDf

const password = process.argv[2]
const url = process.env.MONGODB_URI

// const url = `mongodb+srv://scribblerdw:${password}@cluster0.ccrmykj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

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