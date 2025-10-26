const express = require('express')
const cors = require('cors')
const app = express()

// Use CORS middleware
app.use(cors())
// For parsing JSON request bodies
app.use(express.json())

let items = [
  { id: 1, name: 'Item1', price: 2.5 },
  { id: 2, name: 'Item2', price: 3.0 },
  { id: 3, name: 'Item3', price: 5.0 }
]

// Retrieve all items
app.get('/items', (req, res) => {
  res.json(items)
})

// Retrieve a specific item by ID
app.get('/items/:id', (req, res) => {
  console.log(req.params)
  const itemId = parseInt(req.params.id)
  const item = items.find((i) => i.id === itemId)

  if (!item) {
    return res.status(404).json({ message: `Item with id ${itemId} not found` })
  }
  res.json(item)
})

// POST request to add a new item
app.post('/items', (req, res) => {
  const { id, name, price } = req.body
  console.log(req.body)

  if (!id || !name || !price) {
    return res.status(400).json({ message: 'Please provide id, name, and price' })
  }

  const newItem = { id, name, price }
  items.push(newItem);
  res.status(201).json({ message: 'Item created', item: newItem })
})

// PUT request to replace a specific item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const { name, price } = req.body
  const itemIndex = items.findIndex((i) => i.id === itemId)

  if (itemIndex === -1) {
    return res.status(404).json({ message: `Item with id ${itemId} not found` })
  }

  items[itemIndex] = { id: itemId, name, price };
  res.json({ message: `Item ${itemId} fully updated`, item: items[itemIndex] })
})

// PATCH request to update only the price of a specific item by ID
app.patch('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const { price } = req.body
  const item = items.find((i) => i.id === itemId)

  if (!item) {
    return res.status(404).json({ message: `Item with id ${itemId} not found` })
  }

  if (price === undefined) {
    return res.status(400).json({ message: 'Please provide a price to update' })
  }

  item.price = price
  res.json({ message: `Price for item ${itemId} updated`, item })
})

// DELETE request to remove a specific item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id)
  const itemIndex = items.findIndex((i) => i.id === itemId)

  if (itemIndex === -1) {
    return res.status(404).json({ message: `Item with id ${itemId} not found` })
  }

  const deletedItem = items.splice(itemIndex, 1);
  res.json({ message: `Item ${itemId} deleted`, item: deletedItem[0] })
});

app.listen(3000, () => console.log('Server is running on port 3000'))