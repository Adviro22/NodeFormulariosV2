import express from "express";
import { auth } from "./auth.js";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import session from "express-session";
import mysql from "mysql2"
import connection, {dbConfig} from "./database/db.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;

export let user_id;
export let user_name;
export let loggedInUser;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/resources", express.static("public"));
app.use("/resources", express.static(import.meta.url + "/public"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
/*
app.get("/register", (req, res) => {
  res.render('register')
});
*/

app.post('/insertarRegistro1', async (req, res) => {
  try {
    // Obtener el id_usuario y id_tipo de variables
    const id_usuario = user_id; 
    const id_tipo_registro = 1;

    // Obtener la fecha y hora actual
    const fecha_creacion = new Date();

    // Consulta SQL para insertar un nuevo registro
    const insertQuery = `
      INSERT INTO Registro (id_usuario, fecha_creacion, id_tipo_registro)
      VALUES (?, ?, ?)
    `;

    // Ejecutar la consulta
    await connection.execute(insertQuery, [id_usuario, fecha_creacion, id_tipo_registro]);

    res.status(201).json({ message: 'Registro insertado correctamente' });
  } catch (error) {
    console.error('Error al insertar el registro:', error);
    res.status(500).json({ error: 'Error al insertar el registro' });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/menuprincipal", auth, (req, res) => {
  res.render("menuprincipal");
});

app.get("/placas_formularios", auth, (req, res) => {
  res.render("placas_formularios");
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

//Autentication
app.post("/auth", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
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
          //creamos una var de session y le asignamos true si INICIO SESSION
          req.session.loggedin = true;
          req.session.userId = results[0].id;
          req.session.user = results[0].user;
          req.session.name = results[0].name;
          user_id = req.session.userId;
          user_name = req.session.name;
          loggedInUser = req.session.user;
          res.render("login", {
            alert: true,
            alertTitle: "Conexión exitosa",
            alertMessage: "¡LOGIN CORRECTO!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "",
          });
        }
      }
    );
  } else {
    res.send("Por favor ingrese un usuario y contraseña");
  }
});

//12 - Método para controlar que está auth en todas las páginas
/*
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
		res.render('index',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});
*/

app.get("/", auth, (req, res) => {
  if (req.session.loggedin) {
    res.render("index", {
      login: true,
      name: req.session.name,
    });
  } else {
    res.render("index", {
      login: false,
      name: "Debe iniciar sesión",
    });
  }
});

//función para limpiar la caché luego del logout
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

//Logout
//Destruye la sesión.
app.get("/logout", function (req, res) {
  req.session.destroy(() => {
    res.redirect("/"); // siempre se ejecutará después de que se destruya la sesión
  });
});

app.listen(PORT, () => {
  console.log("Pagina en: http://localhost:" + PORT);
});

export default app;
