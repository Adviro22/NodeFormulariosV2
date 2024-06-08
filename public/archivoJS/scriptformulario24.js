let fechvenc;
let fechvenc2;
let fechini;
let fechaFormateada;
let fechaEmisionObj; // Variable global para fechaEmisionObj
let fechaEmisionObj2; // Variable global para fechaEmisionObj2
let fechaEmi;
let fechaEmi2;

function formatTwoDigits(number) {
  return number < 10 ? "0" + number : number;
}

function calcularFecha() {
  // Obtener la fecha establecida en la variable existente
  const fechaEmision = document.getElementById("fechaEmision").value;

  // Obtener la cantidad de días seleccionados en el select
  const validityDays = document.getElementById("validity_days").value;

  // Crear fecha de emisión
  let fechaEmisionObj2 = new Date(fechaEmision);
  fechaEmisionObj2.setDate(fechaEmisionObj2.getDate() + 1);
  let diaemi = formatTwoDigits(fechaEmisionObj2.getDate());
  let mesemi = formatTwoDigits(fechaEmisionObj2.getMonth() + 1);
  let añoemi = fechaEmisionObj2.getFullYear();
  fechaEmi = `${mesemi}/${diaemi}/${añoemi}`;
  fechaEmi2 = `${mesemi}${diaemi}${añoemi.toString().slice(-2)}`;

  // Convertir la fecha a un objeto Date
  fechaEmisionObj2 = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj2.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj = new Date(fechaEmision + "T00:00:00Z");
  fechaEmisionObj.setUTCHours(0, 0, 0, 0);

  fechaEmisionObj2.setUTCDate(fechaEmisionObj2.getUTCDate() + 1);
  fechaEmisionObj.setUTCDate(fechaEmisionObj.getUTCDate() + 1);

  // Agregar los días seleccionados a la fecha existente
  fechaEmisionObj.setUTCDate(
    fechaEmisionObj.getUTCDate() + parseInt(validityDays)
  );

  // Establecer el idioma de moment en inglés
  moment.locale("en");

  // Formatear la fecha de emisión en el formato deseado (MMM DD, YYYY)
  let fechaEmisionFormateada = moment(fechaEmisionObj2)
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de vencimiento en el formato deseado (MMM DD, YYYY)
  let fechaVencimientoFormateada = moment(fechaEmisionObj)
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de emisión 2 en el formato deseado (MMDDYYYY)
  let fechaEmision2Formateada = moment(fechaEmisionObj)
    .format("MMDDYYYY")
    .toUpperCase();

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;
  fechvenc2 = fechaEmision2Formateada;

  // Formatear la fecha original en el formato deseado (MMM DD, YYYY)
  let fechaObjeto = moment(fechini, "MMM DD, YYYY").toDate();

  // Obtiene el mes en formato de texto con la primera letra en mayúscula
  var mes = moment(fechaObjeto).format("MMM");

  // Capitaliza el primer carácter del mes
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);

  // Obtiene el día del mes
  var dia = fechaObjeto.getDate();

  // Obtiene el año
  var anio = fechaObjeto.getFullYear();

  // Combina los valores en el formato deseado: 'May 30, 2023'
  fechaFormateada = mes + " " + dia + ", " + anio;
}

let var_tag;

function generarTag() {
  let tag = "";

  // generar los cuatro números del tag
  for (let i = 0; i < 4; i++) {
    tag += Math.floor(Math.random() * 10);
  }

  // agregar una letra al tag
  tag += String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // agregar los dos últimos números del tag
  for (let i = 0; i < 2; i++) {
    tag += Math.floor(Math.random() * 10);
  }
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
    generarAleatorio();
  }
}

let tag;

function generarAleatorio() {
  let numeros = "";
  let letras = "";
  let posiblesLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Generar 2 números aleatorios
  for (let i = 0; i < 2; i++) {
    numeros += Math.floor(Math.random() * 10);
  }

  // Generar 2 letras aleatorias en mayúscula
  for (let i = 0; i < 2; i++) {
    letras += posiblesLetras.charAt(Math.floor(Math.random() * posiblesLetras.length));
  }

  // Concatenar números y letras
  tag = numeros + letras;

  tag = fechaEmi2 + tag

  generate()
}


function generate() {
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
  const cityandstate = ciudad + ", " + estado;
  const coidgozip = document.getElementById("coidgozip").value;

  //QR codigo
  const qrContainer = document.getElementById("qrContainer");
  // Crear las variables sin espacios
  //

  let fechinimodificada = fechini;
  let fechvencmodificada = fechvenc;

  // Convertir la cadena de texto a un objeto Moment.js
  const fechaMoment = moment(fechini, "MMM DD, YYYY");
  const fechaMoment2 = moment(fechvenc, "MMM DD, YYYY");

  // Obtener la fecha formateada en el formato deseado (MM/DD/YYYY)
  const fechaInicioFormateada = fechaMoment.format("MM/DD/YYYY");
  const fechaVencFormateada = fechaMoment2.format("MM/DD/YYYY");

  const url = `https://dmv-tags-code.up.railway.app/doc2/?tag=${var_tag}&fecha1=${fechaInicioFormateada}&fecha2=${fechaVencFormateada}&vin=${vin}&year=${year}&body_style=${body_style}&color=${color}&marca=${marca}&v_code=${tag}`;
  console.log(url);

  const qrcode = new QRCode(qrContainer, {
    text: url,
    width: 200,
    height: 200,
  });

  const qrCodeDataURL = qrcode._el.querySelector("canvas").toDataURL();

  const imgElement = document.createElement("img");
  imgElement.src = qrCodeDataURL;
  imgElement.id = "qrImage";
  imgElement.style.display = "none";

  qrContainer.innerHTML = "";
  qrContainer.appendChild(imgElement);
  // Agregar la imagen al documento PDF
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16, // or "smart", default is 16
  });

  const img1 = document.getElementById("img1");
  doc.addImage(img1, 0, 0, 297, 211);
  doc.setFontSize(170);
  doc.setFontType("bold");
  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 241, 52, 30, 30);
  doc.text(var_tag, 150, 130, { align: "center" });
  //doc.text(vin, 40, 120)
  doc.setFontSize(70);
  doc.text(fechvenc, 77, 82);
  doc.setFontSize(40);
  doc.text(year, 13, 143);
  doc.text(marca, 13, 155);

  var x = 288;
  var y = 70;

  var blanco = "#FFFFFF"; // Blanco en formato hexadecimal
  var negro = "#000000"; // Negro en formato hexadecimal

  // Establecer el color de texto
  doc.setTextColor(blanco);
  // Definir el espaciado entre las letras
  var spacing = 10;

  // Definir el tamaño de fuente
  var fontSize = 20;

  // Agregar las letras verticalmente
  var texto = tag;
  console.log(texto)
  console.log(texto.length)

  // Iterar sobre cada letra del texto
  for (var i = 0; i < texto.length; i++) {
    var letra = texto[i];

    // Calcular las coordenadas y para cada letra
    var letraY = y + i * spacing;

    // Agregar la letra verticalmente
    doc.setFontSize(fontSize);
    doc.text(letra, x - 2, letraY);
  }

  doc.setTextColor(negro); // Negro en formato hexadecimal
  doc.setFontSize(42);
  doc.text(vin, 269.5, 143, { align: "right" });

  //Segunda Pagina
  doc.addPage("a4", "p");
  doc.setFontType("normal");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 211, 297);

  // Agrega los valores al documento PDF
  doc.setFontSize(10);
  doc.setTextColor(negro);
  doc.text(var_tag, 62, 31.5);
  doc.text(fechini, 150, 31.5);
  doc.text(fechvenc, 150, 37);

  doc.text(fechaFormateada, 62, 63);
  doc.text(vin, 62, 69.8);
  doc.text(year, 62, 75.3);
  doc.text(marca, 62, 80.8);
  doc.text(color, 62, 86.5);

  doc.text(body_style, 150, 75.3);
  doc.text(model, 150, 80.8);

  doc.text(nombre, 105, 124);
  doc.text(mailingaddress, 105, 129);
  doc.text(cityandstate, 105, 133.5);
  doc.text(coidgozip, 105, 138);

  //Tercera Pagina
  doc.addPage("a4", "p");
  doc.setFontType("normal");
  const img3 = document.getElementById("img3");
  doc.addImage(img3, 0, 0, 211, 297);

  // Agrega los valores al documento PDF
  doc.setFontSize(10);
  doc.setTextColor(negro);
  doc.text(var_tag, 62, 31.5);
  doc.text(fechini, 150, 31.5);
  doc.text(fechvenc, 150, 37);

  doc.text(fechaFormateada, 62, 45.5);
  doc.text(vin, 62, 52.3);
  doc.text(year, 62, 57.8);
  doc.text(marca, 62, 63.5);
  doc.text(color, 62, 69.3);

  doc.text(body_style, 150, 57.3);
  doc.text(model, 150, 63.3);

  doc.text(nombre, 105, 106.5);
  doc.text(mailingaddress, 105, 111.5);
  doc.text(cityandstate, 105, 116);
  doc.text(coidgozip, 105, 120.5);

  doc.save("Tx_tag2.pdf");

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
