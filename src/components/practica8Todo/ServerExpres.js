const express = require("express");
const app = express();
const port = 3001;
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const { json } = require("stream/consumers");
const path = require("path");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/
app.use("/public", express.static(path.join(__dirname, "../../../public")));

const router = path.join(__dirname, "db.json");
const { residenteSchema } = require("./validationJOI.js");
const { error } = require("console");
//const { residenteSchema: residenteSchemaYup } = require('./validacioneYUP.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../../public");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    let prefix = "";

    if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext.toLowerCase())) {
      prefix = "img_";
    }

    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "")
      .toLowerCase();

    cb(null, `${prefix}${name}${ext}`);
  },
});
const upload = multer({ storage: storage });

app.get("/residentes", (req, res) => {
  fs.readFile(router, "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error al leer el archivo de usuarios");
    }
    res.send(data);
  });
});

app.get("/residentes/:id", (req, res) => {
  fs.readFile(router, "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error al leer el archivo de usuarios");
    }

    const user = JSON.parse(data).find(
      (user) => user.id === parseInt(req.params.id, 10)
    );

    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    res.send(user);
  });
});

app.post("/residentes", upload.single("Foto"), async (req, res) => {
  console.log("Datos recibidos en el servidor:", req.body);
  console.log("Archivo recibido:", req.file);

  try {
    const lenguajes = Array.isArray(req.body.LenguajesDeProgramacion)
      ? req.body.LenguajesDeProgramacion
      : JSON.parse(req.body.LenguajesDeProgramacion);

    const newUser = {
      Name: req.body.Name,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Gender: req.body.Gender,
      Birthdate: req.body.Birthdate,
      Tel: req.body.Tel.replace(/\D/g, ""),
      Foto: req.file ? req.file.filename : "Sin Foto",
      InstitutoProcedencia: req.body.InstitutoProcedencia,
      Carrera: req.body.Carrera,
      LenguajesDeProgramacion: lenguajes,
      Notas: req.body.Notas || "",
    };

    const valitationResponse = residenteSchema.validate(newUser, {
      abortEarly: false,
    });

    console.log("valitation Response: ", valitationResponse.error);

    if (valitationResponse.error) {
      console.log("entre al if"); // Mensaje en la consola del servidor
      console.log("detalle de mensaje -> ", valitationResponse.error.details);

      return res.status(400).send({
        error: "Error en validación",
        detalles: valitationResponse.error.details,
      });
    }

    fs.readFile(router, "utf8", (error, data) => {
      if (error) return res.status(500).send("Error al leer la base de datos.");

      let users = [];
      try {
        users = JSON.parse(data);
      } catch (error) {
        users = [];
      }

      const maxId =
        users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
      newUser.id = maxId + 1;

      users.push(newUser);
      fs.writeFile(router, JSON.stringify(users, null, 2), (error) => {
        if (error) return res.status(500).send("Error al guardar el usuario.");
        res.status(201).json(newUser);
      });
    });
  } catch (validationError) {
    //return res.status(400).json({ error: "Error en validación", detalles: validationError.errors });
    console.log("entre al catch");
  }
});

app.delete("/residentes/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (!Number.isInteger(userId) || userId <= 0) {
    return res
      .status(400)
      .json({ error: "La ID debe ser un número entero positivo" });
  }

  fs.readFile(router, "utf8", (error, data) => {
    if (error) {
      return res.status(500).send("Error al leer el archivo de usuarios");
    }

    let users = [];
    try {
      users = JSON.parse(data);
      if (!Array.isArray(users)) {
        users = [];
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error al procesar los datos de usuarios");
    }

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      console.log(error);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    users.splice(userIndex, 1);
    fs.writeFile(router, JSON.stringify(users, null, 2), (error) => {
      if (error) {
        return res.status(500).send("Error al guardar los usuarios");
      }
      res.status(204).send();
    });
  });
});

app.put("/residentes/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (!Number.isInteger(userId) || userId < 0) {
    return res
      .status(400)
      .json({ error: "La ID debe ser un número entero positivo" });
  }

  fs.readFile(router, "utf8", (error, data) => {
    if (error) {
      return res.status(500).send("Error al leer el archivo de usuarios");
    }

    let users;
    try {
      users = JSON.parse(data);
      if (!Array.isArray(users)) {
        throw new Error(
          "La base de datos no contiene una lista válida de usuarios."
        );
      }
    } catch (error) {
      return res.status(500).send("Error al procesar los datos de usuarios");
    }

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("Datos recibidos en el backend:", req.body);

    const updatedUser = {
      ...users[userIndex],
      ...req.body,
      Tel: req.body.Tel
        ? req.body.Tel.replace(/\D/g, "")
        : users[userIndex].Tel,
      LenguajesDeProgramacion: req.body.LenguajesDeProgramacion
        ? Array.isArray(req.body.LenguajesDeProgramacion)
          ? req.body.LenguajesDeProgramacion
          : req.body.LenguajesDeProgramacion.split(",")
        : users[userIndex].LenguajesDeProgramacion,
    };

    users[userIndex] = updatedUser;

    fs.writeFile(router, JSON.stringify(users, null, 2), (error) => {
      if (error) {
        return res.status(500).send("Error al guardar los cambios");
      }
      res.status(200).json(updatedUser);
    });
  });
});

app.use((req, res) => {
  res.status(404).send("Error 404: Página no encontrada");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
