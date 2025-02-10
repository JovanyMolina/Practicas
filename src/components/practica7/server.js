const express = require('express')
const app = express()
const port = 3002

app.get('/users', (req, res) => {
    const name = req.query.name || 'Juan'
    const lastName = req.query.lastName || 'juan'
    res.send(`Hola ${name} ${lastName}`)
})

/*
function getAPIUsuarios() {
    fetch('http://localhost:3002/users?name={}&lastName={}')
        .then(response => response.json())
        .then(data => setDataUser(data))
        .catch(error => console.log(error))
}*/

app.post('/users', (req, res) => {
    res.send('Se ha recibido una solicitud POST en /users')
})

app.put('/users', (req, res) => {
    res.send('Se ha recibido una solicitud PUT en /users')
})

app.delete('/users', (req, res) => {
    res.send('Se ha recibido una solicitud DELETE en /users')
})


app.use((req, res) => {
    res.status(404).send('Error 404: Página no encontrada');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})