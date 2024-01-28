import express from "express";
import { auth } from "./auth.js";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import mysql from "mysql2";
import connection, { dbConfig } from "./database/db.js";
import cookieSession from "cookie-session";
import { DateTime } from "luxon";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/resources", express.static("public"));
app.use("/resources", express.static(import.meta.url + "/public"));

app.set("view engine", "ejs");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"], // Claves de cifrado, cámbialas por valores secretos
    maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (1 día)
  })
);

app.post("/insertarRegistro1", async (req, res) => {
  try {
    // Obtener el id_usuario de la cookie de sesión
    const id_usuario = req.session.user.id; // Suponiendo que el ID de usuario se almacena en req.session.user

    // Obtener la fecha y hora actual de Ecuador
    const fecha_creacion = DateTime.now().setZone("America/Guayaquil").toISO();

    // Consulta SQL para insertar un nuevo registro con conversión de zona horaria
    const insertQuery = `
      INSERT INTO Registro (id_usuario, fecha_creacion, id_tipo_registro)
      VALUES (?, CONVERT_TZ(?, 'UTC', 'America/Guayaquil'), ?)
    `;

    // Ejecutar la consulta
    await connection.execute(insertQuery, [
      id_usuario,
      fecha_creacion,
      1, // Asignar el valor de id_tipo_registro según sea necesario
    ]);

    res.status(201).json({ message: "Registro insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    res.status(500).json({ error: "Error al insertar el registro" });
  }
});

app.post("/insertarRegistro4", async (req, res) => {
  try {
    // Obtener el id_usuario de la cookie de sesión
    const id_usuario = req.session.user.id; // Suponiendo que el ID de usuario se almacena en req.session.user

    // Obtener la fecha y hora actual de Ecuador
    const fecha_creacion = DateTime.now().setZone("America/Guayaquil").toISO();

    // Consulta SQL para insertar un nuevo registro con conversión de zona horaria
    const insertQuery = `
      INSERT INTO Registro (id_usuario, fecha_creacion, id_tipo_registro)
      VALUES (?, CONVERT_TZ(?, 'UTC', 'America/Guayaquil'), ?)
    `;

    // Ejecutar la consulta
    await connection.execute(insertQuery, [
      id_usuario,
      fecha_creacion,
      4, // Asignar el valor de id_tipo_registro según sea necesario
    ]);

    res.status(201).json({ message: "Registro insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    res.status(500).json({ error: "Error al insertar el registro" });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/index", auth, (req, res) => {
  res.render("index");
});

app.get("/menuprincipal", auth, (req, res) => {
  res.render("menuprincipal");
});

app.get("/placas_formularios", auth, (req, res) => {
  res.render("placas_formularios");
});

app.get("/aseguranzas_formularios", auth, (req, res) => {
  res.render("aseguranzas_formularios");
});

app.get("/formulario1", auth, (req, res) => {
  res.render("formulario1");
});

app.get("/formulario2", auth, (req, res) => {
  res.render("formulario2");
});

app.get("/formulario3", auth, (req, res) => {
  res.render("formulario3");
});

app.get("/formulario4", auth, (req, res) => {
  res.render("formulario4");
});

app.get("/formulario5", auth, (req, res) => {
  res.render("formulario5");
});

app.get("/formulario6", auth, (req, res) => {
  res.render("formulario6");
});

app.get("/formulario7", auth, (req, res) => {
  res.render("formulario7");
});

app.get("/formulario8", auth, (req, res) => {
  res.render("formulario8");
});

app.get("/formulario9", auth, (req, res) => {
  res.render("formulario9");
});

app.get("/formulario10", auth, (req, res) => {
  res.render("formulario10");
});

app.get("/formulario11", auth, (req, res) => {
  res.render("formulario11");
});

app.get("/formulario12", auth, (req, res) => {
  res.render("formulario12");
});

app.get("/formulario13", auth, (req, res) => {
  res.render("formulario13");
});

//Ver Datos del usuario logeado
app.get("/user_data", auth, (req, res) => {
  const userId = req.session.userId;
  const username = req.session.user;
  const name = req.session.name;

  console.log("ID del usuario:", user_id);
  console.log("Nombre de usuario:", loggedInUser);
  console.log("Nombre:", user_name);
});

//Register
app.post("/register", async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  connection.query(
    "INSERT INTO users SET ?",
    { user: user, name: name, pass: passwordHaash },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("REGISTRO EXITOSO");
      }
    }
  );
});

// Dentro de tu ruta de autenticación ("/auth")
app.post("/auth", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHash = await bcryptjs.hash(pass, 8);
  if (user && pass) {
    connection.query(
      "SELECT * FROM users WHERE user = ?",
      [user],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(pass, results[0].pass))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "USUARIO y/o PASSWORD incorrectas",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          // Crear un objeto de usuario
          const userInfo = {
            id: results[0].id,
            user: results[0].user,
            name: results[0].name,
          };

          // Almacena el objeto de usuario en la sesión de la cookie
          req.session.user = userInfo;

          // Establece una cookie para indicar que el usuario está autenticado
          req.session.loggedin = true;

          // Redirige al usuario a la página principal después del inicio de sesión
          res.redirect("/");
        }
      }
    );
  } else {
    res.send("Por favor ingrese un usuario y contraseña");
  }
});


// La ruta "/" ahora se encarga de la redirección después del inicio de sesión
app.get("/", (req, res) => {
  if (req.session.loggedin) {
    // El usuario está autenticado, puedes redirigirlo a la página deseada, por ejemplo, "/menuprincipal"
    res.render("index", {
      login: true,
      name: req.session.user.name,
    });
  } else {
    // El usuario no está autenticado, muéstrale la página de inicio de sesión
    res.render("index", {
      login: false,
      name: "Debe iniciar sesión",
    });
  }
});

// La ruta de cierre de sesión
app.get("/logout", function (req, res) {
  req.session = null; // Destruye la sesión eliminándola
  res.redirect("/"); // Redirige al inicio u otra página después de cerrar sesión
});

app.listen(PORT, () => {
  console.log("Pagina en: http://localhost:" + PORT);
});

export default app;
