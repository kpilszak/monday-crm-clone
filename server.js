const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios');

require('dotenv').config()

const app = express()
app.use((cors()))
app.use(express.json())

const url = 'https://2a580f2e-9564-46f0-a84c-ea0be7ef52b9-eu-west-1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/tasks'
const token = process.env.ASTRA_DB_APPLICATION_TOKEN

app.post('/tickets', async (req, res) => {
    const formData = req.body.formData

    const options = {
        method: 'POST',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
            'Content-Type': 'application/json'
        },
        data: formData
    }

    try {
        const response = await axios(url, options)
        res.status(200).json(response.data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
} )

app.listen(PORT, () => console.log('server running on PORT ' + PORT))