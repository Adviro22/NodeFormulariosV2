let fechvenc;
let fechvenc2;
let fechvenc3
let fechini;
let fechaFormateada;
let fechaEmi;
let fechaEmisionObj; // Variable global para fechaEmisionObj
let fechaEmisionObj2; // Variable global para fechaEmisionObj2

function calcularFecha() {
  // Obtener la fecha establecida en la variable existente
  const fechaEmision = document.getElementById("fechaEmision").value;

  // Obtener la cantidad de días seleccionados en el select
  const validityDays = document.getElementById("validity_days").value;

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

  // Convertir la nueva fecha a un formato legible
  const nuevaFecha = fechaEmisionObj.toLocaleDateString();

  // Formatear la fecha de emisión en el formato deseado (MMM DD, YYYY)
  let fechaEmisionFormateada = moment(fechaEmisionObj2.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de vencimiento en el formato deseado (MMM DD, YYYY)
  let fechaVencimientoFormateada = moment(fechaEmisionObj.toISOString())
    .format("MMM DD, YYYY")
    .toUpperCase();

  // Formatear la fecha de emisión 2 en el formato deseado (MMDDYYYY)
  let fechaEmision2Formateada = fechaEmisionObj
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "");

  fechvenc3 = fechaEmision2Formateada

  // Guardar la fecha de vencimiento formateada en "mm/dd/aaaa"
  let diaVenc = fechaEmisionObj.getUTCDate().toString().padStart(2, "0");
  let mesVenc = (fechaEmisionObj.getUTCMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 porque los meses van de 0 a 11
  let anioVenc = fechaEmisionObj.getUTCFullYear().toString();
  fechvenc2 = `${mesVenc}/${diaVenc}/${anioVenc}`;

  let diaEmi = fechaEmisionObj2.getUTCDate().toString().padStart(2, "0");
  let mesEmi = (fechaEmisionObj2.getUTCMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 porque los meses van de 0 a 11
  let anioEmi = fechaEmisionObj2.getUTCFullYear().toString();
  fechaEmi = `${mesEmi}/${diaEmi}/${anioEmi}`;

  fechvenc = fechaVencimientoFormateada;
  fechini = fechaEmisionFormateada;

  console.log(fechaEmisionObj);

  // Convierte la fecha original en un objeto de fecha
  var fechaObjeto = new Date(fechini);

  // Obtiene el mes en formato de texto con la primera letra en mayúscula
  var mes = fechaObjeto.toLocaleString("default", { month: "short" });

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
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;
  const price1 = document.getElementById("price1").value;
  const price2 = document.getElementById("price2").value;
  const total = document.getElementById("total").value;

  // Validar si algún campo está vacío
  if (
    vin === "" ||
    color === "" ||
    nombre === "" ||
    marca === "" ||
    year === "" ||
    body_style === "" ||
    mailingaddress === "" ||
    ciudad === "" ||
    estado === "" ||
    codigozip === ""
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
  const nombre = document.getElementById("nombre").value;
  const marca = document.getElementById("make").value;
  const year = document.getElementById("year").value;
  const body_style = document.getElementById("body_style").value;
  const mailingaddress = document.getElementById("mailingaddress").value;
  const ciudad = document.getElementById("ciudad").value;
  const estado = document.getElementById("estado").value;
  const codigozip = document.getElementById("codigozip").value;
  const validityDays = document.getElementById("validity_days").value;
  const fechaEmision = document.getElementById("fechaEmision").value;
  const cityStateCodzip = ciudad + ", " + estado + " " + codigozip;
  const price1 = document.getElementById("price1").value;
  const price2 = document.getElementById("price2").value;
  const total = document.getElementById("total").value;

  // Obtener la hora actual
  const ahora = new Date();

  // Extraer las horas y minutos
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  // Determinar si es AM o PM
  let amPM = horas >= 12 ? "PM" : "AM";

  // Convertir las horas al formato de 12 horas y asegurar que siempre haya dos dígitos
  horas = (horas % 12 || 12).toString().padStart(2, "0");

  // Asegurar que siempre haya dos dígitos en los minutos
  minutos = minutos.toString().padStart(2, "0");

  // Formatear la hora actual en el formato deseado "hh:mm AM/PM"
  const horaActual = `${horas}:${minutos} ${amPM}`;

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

  const url = `https://www.nhtsa.gov/recalls?vin=${vin}`;
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
  doc.addImage(img1, 0, 0, 300, 215);
  doc.setFontSize(170);
  doc.setFontType("bold");
  const imgQR = document.getElementById("qrImage");
  doc.addImage(imgQR, 240, 32, 30, 30);
  // Define el texto que deseas centrar
  var text = var_tag;

  // Obtiene la anchura del texto
  var textWidth = doc.getTextWidth(text);

  // Calcula la posición x para centrar el texto
  var xPos = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Dibuja el texto centrado en el eje de las x
  doc.text(text, xPos, 110);
  //doc.text(vin, 40, 120)
  doc.setFontSize(70);
  doc.text(fechvenc, 67, 55);
  doc.setFontSize(23);
  doc.text(year, 13, 132);
  doc.text(marca, 13, 142);

  var x = 286;
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
  var texto = fechvenc3;

  // Iterar sobre cada letra del texto
  for (var i = 0; i < texto.length; i++) {
    var letra = texto[i];

    // Calcular las coordenadas y para cada letra
    var letraY = y + i * spacing;

    // Agregar la letra verticalmente
    doc.setFontSize(fontSize);
    doc.text(letra, x, letraY);
  }

  //Justificado en el VIN
  // Coordenadas iniciales para la posición X y Y
  //doc.text(vin, 190, 135);
  doc.setTextColor(negro); // Negro en formato hexadecimal
  let position_x = 270.3; // Posición inicial en el eje X
  let position_y = 132; // Posición en el eje Y para mostrar el texto
  let spacingFactor = 1.25; // Factor de espaciado (puedes ajustarlo según tus preferencias)
  
  // Calcular el ancho total de la cadena vin
  let totalWidth = 0;
  for (let i = 0; i < vin.length; i++) {
    const letter = vin.charAt(i);
    totalWidth += doc.getTextWidth(letter);
  }
  
  // Calcular el ancho promedio por carácter (incluyendo letras y números)
  let averageWidth = totalWidth / vin.length;
  
  // Aumentar el espaciado entre letras y números
  let increasedSpacing = averageWidth * spacingFactor;
  
  // Recorrer la cadena de texto de derecha a izquierda
  for (let i = vin.length - 1; i >= 0; i--) {
    const letter = vin.charAt(i);
    doc.text(letter, position_x, position_y);
    
    // Calcular el ancho del carácter actual (letra o número)
    let characterWidth = doc.getTextWidth(letter);
    
    // Calcular el espaciado adicional para que todos los caracteres tengan el mismo espaciado
    let additionalSpacing = increasedSpacing - characterWidth;
    
    // Ajustar la posición en X para agregar el siguiente carácter con el espaciado aumentado
    position_x = position_x - (characterWidth + additionalSpacing);
  }
  


  //Segunda Pagina
  doc.addPage("a4", "p");
  doc.setFontType("normal");
  const img2 = document.getElementById("img2");
  doc.addImage(img2, 0, 0, 208, 208);

  let yearAndMarca = year + " / " + marca

  // Agrega los valores al documento PDF
  doc.setFontSize(8);
  doc.setTextColor(negro);
  doc.text(validityDays, 29, 18.5);
  doc.text(var_tag, 45, 42.5);
  doc.text(fechaEmi, 95, 37);
  doc.text(fechaEmi, 167, 37);
  doc.text(horaActual, 95, 40.5);
  doc.text(horaActual, 167, 41.5);
  doc.text(fechvenc2, 113, 48.5);
  doc.text(horaActual, 167, 48.5);
  doc.text(nombre, 23,55)
  doc.text(mailingaddress, 23,58.5)
  doc.text(cityStateCodzip, 23,62)

  doc.text(vin, 75, 112.5);

  doc.text(yearAndMarca, 41, 117.5);
  /*
  doc.text(year, 41, 117.5);
  doc.text(marca, 51.5, 117.5);
  */

  doc.text(color, 47, 122.5);
  doc.text(validityDays, 23, 139.5);
  doc.text(validityDays, 103, 130.3);
  doc.text(body_style, 128, 119);
  doc.text(price1, 185, 130);
  doc.text(price2, 185, 133.5);
  doc.text(total, 185, 140.5);
  doc.text(total, 185, 150.7);
  doc.text(total, 185, 158);

  /*
	doc.text(fechini, 150, 29);
	doc.text(fechvenc, 150, 34);
	doc.text(fechaFormateada, 62, 58.3);
	doc.text(model, 150, 74.8);
	doc.text(nombre, 105, 115);
	doc.text(mailingaddress, 105, 120.5);
	doc.text(cityandstate, 105, 126);
	doc.text(coidgozip, 105, 131.5);
	*/
  /*
	//Tercera Pagina
	doc.addPage("a4","p");
	doc.setFontType("normal");
	const img3 = document.getElementById('img3');
	doc.addImage(img3, 0, 0, 208, 208)
				  	
	// Agrega los valores al documento PDF
	doc.setFontSize(10);
	doc.setTextColor(negro);
	doc.text(var_tag, 62, 29);
	doc.text(fechini, 150, 29);
	doc.text(fechvenc, 150, 34); 
	doc.text(fechaFormateada, 62, 41.3); //comienzo
	doc.text(vin, 62, 46.8);
	doc.text(color, 62, 63.3);
	doc.text(marca, 62, 57.8);
	doc.text(year, 62, 52.3);
	doc.text(body_style, 150, 52.3)
	doc.text(model, 150, 57.8);
	doc.text(nombre, 105, 96);
	doc.text(mailingaddress, 105, 101.5);
	doc.text(cityandstate, 105, 107);
	doc.text(coidgozip, 105, 112.5);
    */
  doc.save("Tx_tag.pdf");
}
function convertirMayusculas(input) {
  input.value = input.value.toUpperCase();
}
