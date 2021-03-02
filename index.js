const express = require('express')
const cors = require('cors')

let notes = [
	{
		id: "1",
		content: "HTML is easy",
		important: true
	},
	{
		id: "2",
		content: "Browser can execute only JavaScript",
		important: false
	},
	{ 
		id: "3",
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true
	}
]

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
	res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
	const id = req.params.id
	const note = notes.find(n => n.id === id)
	
	if (note) {
		res.json(note)
	} else {
		res.statusMessage = `resource at url: /api/notes/:${id} not exist`
		res.status(404).end()
	}
})

const idGenerator = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => Number(n.id)))
		: 0
	
	return String(maxId + 1)
}

app.post('/api/notes', (req, res) => {
	const body = req.body

	if (!body.content) {
		res.status(400).json({
			error: 'content missing'
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		id: idGenerator()
	}

	notes = notes.concat(note)

	console.log(note)
	res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
	const id = req.params.id
	notes = notes.filter(n => n.id !== id)

	res.status(204).end()
})

const PORT = 3009
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})