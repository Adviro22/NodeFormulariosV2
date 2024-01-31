let fechvenc;
let fechvenc2;
let fechvenc3;
let fechini;
let fechaFormateada;
let fechaEmi;
let fechaEmisionObj;
let fechaEmisionObj2;

function calcularFecha() {
  const fechaEmision = document.getElementById("fechaEmision").value;
  const validityDays = document.getElementById("validity_days").value;

  fechaEmisionObj2 = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj2.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj2.setUTCDate(fechaEmisionObj2.getUTCDate());
  fechaEmisionObj.setUTCDate(fechaEmisionObj.getUTCDate() + 1);

  fechaEmisionObj.setUTCDate(
    fechaEmisionObj.getUTCDate() + parseInt(validityDays)
  );

  const nuevaFecha = fechaEmisionObj.toLocaleDateString();

  let fechaEmisionFormateada = moment(fechaEmisionObj2.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  let fechaVencimientoFormateada = moment(fechaEmisionObj.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  let fechaEmision2Formateada = fechaEmisionObj
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "");

  fechvenc3 = fechaEmision2Formateada;

  let diaVenc = (fechaEmisionObj.getUTCDate() - 1).toString().padStart(2, "0");
  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc}/${diaVenc}/${anioVenc}`;

  let diaEmi = fechaEmisionObj2.getUTCDate().toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0");
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi}/${diaEmi}/${anioEmi}`; // Cambio aquí

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;

  console.log(fechaEmisionObj);

  var fechaObjeto = new Date(fechini);
  var mes = fechaObjeto.toLocaleString("default", { month: "short" });
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);
  var dia = fechaObjeto.getDate();
  var anio = fechaObjeto.getFullYear();
  fechaFormateada = mes + " " + dia + ", " + anio;
}

let var_tag;

function generarTag() {
  let tag = "";

  // Generar los tres primeros números del tag
  for (let i = 0; i < 3; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // Agregar un guión medio
  tag += "-";

  // Generar las dos letras del tag
  for (let i = 0; i < 2; i++) {
    tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  // Agregar otro guión medio
  tag += "-";

  // Generar los tres últimos números del tag
  for (let i = 0; i < 3; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // Asignar el valor del tag generado a una variable
  var_tag = tag;
}

function validarCampos() {
  // Obtener los valores de los campos del formulario
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const coidgozip = document.getElementById("coidgozip").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    color === "" ||
    nombre === "" ||
    marca === "" ||
    model === "" ||
    year === "" ||
    body_style === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    coidgozip === ""
  ) {
    alert("Por favor, complete todos los campos del formulario.");
  } else {
    // Todos los campos están completos, llamar a la función generate() para generar el PDF
    generate();
  }
}

function generate() {
  const vin = document.getElementById("VIN").value;
  const color = document.getElementById("color").value;
  const validityDays = document.getElementById("validity_days").value;
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const coidgozip = document.getElementById("coidgozip").value;

  let fechinimodificada = fechini;
  let fechvencmodificada = fechvenc;

  // Convertir la cadena de texto a un objeto Moment.js
  const fechaMoment = moment(fechini, "MMM DD, YYYY");
  const fechaMoment2 = moment(fechvenc, "MMM DD, YYYY");

  // Obtener la fecha formateada en el formato deseado (MM/DD/YYYY)
  const fechaInicioFormateada = fechaMoment.format("MM/DD/YYYY");
  const fechaVencFormateada = fechaMoment2.format("MM/DD/YYYY");

  const url = `
    ISSD: ${fechaEmi}
    TAG#: ${var_tag}
    EXP: ${fechvenc2}
    VIN: ${vin}
    MAKE: ${marca}
    YEAR: ${year}
    COLOR: ${color}
    NAME: ${nombre}
  `;
  console.log(url);

  // Generar el código de barras en el elemento SVG
  JsBarcode("#barcode", var_tag, {
    format: "CODE39",
    lineColor: "#000",
    displayValue: true,
    background: "rgb(255, 210, 23)",
  });

  // Obtener el elemento SVG
  const svgElement = document.getElementById("barcode");

  // Obtener el contenido SVG como una cadena de texto
  let svgString = new XMLSerializer().serializeToString(svgElement);

  // Modificar el contenido SVG para establecer el fondo transparente
  svgString = svgString.replace(/fill:white;/g, "fill:none;");

  // Crear un lienzo (canvas)
  const canvas = document.createElement("canvas");

  // Obtener el contexto de dibujo 2D del lienzo
  const ctx = canvas.getContext("2d");

  // Crear una imagen
  const img = new Image();

  // Cuando la imagen se carga, dibujar el contenido SVG en el lienzo
  img.onload = function () {
    // Establecer el tamaño del lienzo igual al tamaño de la imagen
    canvas.width = img.width;
    canvas.height = img.height;

    // Dibujar la imagen en el lienzo
    ctx.drawImage(img, 0, 0);

    // Obtener los datos de imagen del lienzo
    const imageData = canvas.toDataURL("image/jpeg"); // Se puede ajustar el formato según sea necesario

    // Crear el documento PDF
    var doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16, // or "smart", default is 16
    });

    const img1 = document.getElementById("img1");
    doc.addImage(img1, "JPEG", 0, 0, 297, 211);

    // Agregar la imagen al documento PDF
    doc.addImage(imageData, "JPEG", 160, 112, 70, 19.88); // Ajustar el tamaño según sea necesario

    // Establecer el tamaño de fuente, tipo de fuente, etc.
    doc.setFontSize(12);
    doc.setFontType("normal");
    doc.text(vin, 70, 40, {align: "center"});
    doc.text(year, 130, 40, {align: "center"});
    doc.text(marca, 155, 40, {align: "center"});
    doc.text(body_style, 235, 40, {align: "center"});
    doc.setFontSize(130);
    doc.setFontType("bold");
    doc.text(var_tag, 148.5, 85, {align: "center"});
    doc.setFontSize(60);
    doc.text(fechvenc2, 80, 110);
    doc.addImage(imageData, "JPEG", 32, 168, 45, 19.2, "barcode", "NONE", 90);
    doc.addImage(imageData, "JPEG", 270, 168, 45, 19.2, "barcode", "NONE", 90);
    doc.setFontSize(8);
    doc.setFontType("normal");
    doc.text(vin, 41.25, 156);
    doc.text(year, 110, 156);
    doc.text(marca, 41.25, 161);
    doc.text(body_style, 70, 161);
    doc.text(nombre, 41.25, 176);
    doc.text(fechvenc2, 110, 176);
    doc.text(vin, 154, 156);
    doc.text(year, 222.75, 156);
    doc.text(marca, 154, 161);
    doc.text(body_style, 182.75, 161);
    doc.text(nombre, 154, 176);
    doc.text(fechvenc2, 222.75, 176);


    // Guardar el documento PDF
    doc.save("Il_tag.pdf");
  };

  // Convertir el contenido SVG a un URI de datos
  img.src = "data:image/svg+xml;base64," + btoa(svgString);

  // Llamar a la función para realizar la solicitud
  realizarSolicitud();
}

function convertirMayusculas(input) {
  input.value = input.value.toUpperCase();
}

function realizarSolicitud() {
  // Datos que deseas enviar en la solicitud POST
  const data = {
    // Puedes agregar otros campos aquí si es necesario
  };

  // Opciones para la solicitud fetch
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // URL del endpoint que has creado en tu servidor
  const endpointURL = "https://dmv-tags.up.railway.app/insertarRegistro1"; // Cambia la URL según corresponda

  // Realizar la solicitud fetch
  fetch(endpointURL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor:", data);
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
    });
}
