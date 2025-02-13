const express = require('express')
const app = express()
const port = 3002
const fs = require('fs')
const { json } = require('stream/consumers')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/*
app.get('/users', (req, res) => {
    const name = req.query.name || ''
    const lastName = req.query.lastName || ''
    res.send(`Hola ${name} ${lastName}`)
})
*/
app.get('/users', (req, res) => {
    fs.readFile('src\\components\\practica7\\users.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
            return res.status(500).send('Error al leer el archivo de usuarios');
        }
        res.send(data)
    })
})

app.get('/users/:id', (req, res) => {
    fs.readFile('src\\components\\practica7\\users.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
            return res.status(500).send('Error al leer el archivo de usuarios');
        }

        const user = JSON.parse(data).find(user => user.id === parseInt(req.params.id, 10));

        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        // res.json(user);
        res.send(user)
    })
})
//req = request(consulta) 
// res = response(respuesta)

app.post('/users', (req, res) => {
    /*
        console.log(req.body)
        res.json(req.body)
    */
    fs.readFile('src\\components\\practica7\\users.json', 'utf8', (error, data) => {
        if (error) {
            return res.status(500).send('Error al leer el archivo de usuarios');
        }

        let users = [];
        try {
            users = JSON.parse(data);
            if (!Array.isArray(users)) {
                users = [];
            }
        } catch (error) {
            console.log("Error al parsear JSON:", error);
            users = [];
        }


        
        const userId = req.body.id;
        const parametersUsers = {
            id: userId,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            gender: req.body.gender
        };

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({ error: 'La ID debe ser un número entero positivo' });
        }
        if (users.some(user => user.id === userId)) {
            return res.status(400).json({ error: 'El ID ya existe, elige otro' });
        }

        users.push(parametersUsers);
        console.log(users);

        fs.writeFile('src\\components\\practica7\\users.json', JSON.stringify(users, null, 2), (error) => {
            if (error) {
                console.log("Error al escribir el archivo:", error);
                return res.status(500).send('Error al guardar el usuario');
            }
            res.status(201).json(parametersUsers);
        });
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: 'La ID debe ser un número entero positivo' });
    }
    fs.readFile('src\\components\\practica7\\users.json', 'utf8', (error, data) => {
        if (error) {
            return res.status(500).send('Error al leer el archivo de usuarios');
        }
        let users = [];
        try {
            users = JSON.parse(data);
            if (!Array.isArray(users)) {
                users = [];
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al procesar los datos de usuarios');
        }

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            console.log(error);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        users.splice(userIndex, 1);
        fs.writeFile('src\\components\\practica7\\users.json', JSON.stringify(users, null, 2), (error) => {
            if (error) {
                return res.status(500).send('Error al guardar los usuarios');
            }
            res.status(204).send();
        });
    }
    );
})




app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: 'La ID debe ser un número entero positivo' });
    }

    fs.readFile('src\\components\\practica7\\users.json', 'utf8', (error, data) => {
        if (error) {
            return res.status(500).send('Error al leer el archivo de usuarios');
        }

        let users = [];
        try {
            users = JSON.parse(data);
            if (!Array.isArray(users)) {
                users = [];
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error al procesar los datos de usuarios');
        }


        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }


        users[userIndex] = { ...users[userIndex], ...req.body };


        fs.writeFile('src\\components\\practica7\\users.json', JSON.stringify(users, null, 2), (error) => {
            if (error) {
                return res.status(500).send('Error al guardar los cambios');
            }
            res.status(200).json(users[userIndex]);
        });
    });
});



app.use((req, res) => {
    res.status(404).send('Error 404: Página no encontrada');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/*
function getAPIUsuarios() {
    fetch('http://localhost:3002/users?name={}&lastName={}')
        .then(response => response.json())
        .then(data => setDataUser(data))
        .catch(error => console.log(error))
}*/