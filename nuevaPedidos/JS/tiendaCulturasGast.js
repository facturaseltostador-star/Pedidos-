// =============================
// FIREBASE
// =============================
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Asegurar que Firebase esté disponible
function getDB() {
  if (!window.db) {
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "Firebase no está inicializado. Recargue la página.",
    });
    throw new Error("Firebase no inicializado");
  }
  return window.db;
}

// =============================
// Catálogo (tu catálogo original completo puede ir aquí)
// =============================
const productos = {
  frutas: [
    { id: 1, nombre: "Aguacate Kilo", imagen: "aguacate.jpg" },
    { id: 2, nombre: "Cebolla Kilo", imagen: "cebolla.jpg" },
    { id: 3, nombre: "Chile unidad", imagen: "chileDulce.jpeg" },
    // { id: 4, nombre: "Congelada Mix Fresa - Papaya Unidad", imagen: "mangoFresa.jpg" },
    // { id: 5, nombre: "Congelada Mix Fresa - Papaya - Piña Unidad", imagen: "mangoFresa.jpg" },
    // { id: 6, nombre: "Congelada Mix Mango - Fresa Unidad", imagen: "mangoFresa.jpg" },
    // { id: 7, nombre: "Congelada Mix Piña - Fresa Unidad", imagen: "piñaFresa.jpg" },
    // { id: 8, nombre: "Congelada Mix Piña - Papaya Unidad", imagen: "papayaPiña.jpg" },
    // { id: 9, nombre: "Congelado Cas Unidad", imagen: "casCongelado.jpg" },
    // { id: 10, nombre: "Congelado Fresa Unidad", imagen: "fresaCongelado.jpg" },
    // { id: 11, nombre: "Congelado Mango Unidad", imagen: "mangoCongelado.jpg" },
    // { id: 12, nombre: "Congelado Mora Unidad", imagen: "moraCongelado.jpg" },
    // { id: 13, nombre: "Congelado Papaya Unidad", imagen: "papaya.jpg" },
    // { id: 14, nombre: "Congelado Piña Unidad", imagen: "mangoCongelado.jpg" },
    // { id: 15, nombre: "Congelado Sandía Unidad", imagen: "fresaCongelado.jpg" },
    { id: 16, nombre: "Culantro rollo", imagen: "culantro.jpeg" },
    { id: 17, nombre: "Lechuga Paquete de 500 gramos", imagen: "lechuga.webp" },
    { id: 18, nombre: "Pepino Kilo", imagen: "pepino.avif" },
    { id: 20, nombre: "Repollo Pelota", imagen: "repollo.jpg" },
    { id: 21, nombre: "Tomate Kilo", imagen: "tomate.webp" },
    { id: 22, nombre: "Zanahoria Unidad", imagen: "zanahoria.webp" }
  ],
  reposteria: [
    { id: 23, nombre: "Arreglado Unidad", imagen: "arreglado.jpg" },
    { id: 72, nombre: "Arrollado maní", imagen: "arrolladoMani.jpg" },
    { id: 73, nombre: "Arrollado Tiramizú", imagen: "arrolladoTiramizu.jpg" },
    { id: 24, nombre: "Cangrejo Unidad", imagen: "cangrejo.jpg" },
    { id: 25, nombre: "Cheesecake 12 porciones", imagen: "imagenes/cheesecake.jpg" },
    { id: 26, nombre: "Chocomani Blanco Caja 10", imagen: "chocomaniBlanco.jpg" },
    { id: 27, nombre: "Chocomani Negro Caja 10", imagen: "chocomaniNegro.jpg" },
    { id: 28, nombre: "Churro Hueco Paquete 25 Unidades", imagen: "churroHueco.jpg" },
    { id: 29, nombre: "Churro Palito Paquete 60 Unidades", imagen: "churroPalito.jpg" },
    { id: 72, nombre: "Congelado Enchilada Unidad", imagen: "#" },
    { id: 73, nombre: "Congelado Prusiano Unidad", imagen: "#" },
    { id: 74, nombre: "Congelado Empanada de Carne Unidad", imagen: "#" },
    { id: 75, nombre: "Congelado Empanada de Pollo Unidad", imagen: "#" },
    { id: 76, nombre: "Congelado Strudel de manzana Unidad", imagen: "#" },
    { id: 30, nombre: "Empanada de carne Unidad", imagen: "empanadaCarne.jpg" },
    { id: 31, nombre: "Empanada de masa frijol y queso Bolsa 6 Unidades", imagen: "empanadaMasa.jpg" },
    { id: 32, nombre: "Empanada de masa papa Bolsa 6 Unidades", imagen: "empanadaMasa.jpg" },
    { id: 33, nombre: "Empanada de masa pollo Bolsa 6 Unidades", imagen: "empanadaMasa.jpg" },
    { id: 34, nombre: "Empanada de pollo Unidad", imagen: "empanadaPollo.jpg" },
    { id: 35, nombre: "Enchilada Unidad", imagen: "enchilada.jpg" },
    { id: 36, nombre: "Pan de Hamburguesa Bolsa 6 Unidades", imagen: "panHamburguesa.jpg" },
    { id: 37, nombre: "Pan Hamburguesa Pequeña Bolsa 6 Unidades", imagen: "panHamburguesaMini.jpg" },
    { id: 38, nombre: "Pan Integral Bolsa 6 unidades", imagen: "panIntegral.jpg" },
    { id: 39, nombre: "Pan para desayuno Bolsa 30 unidades", imagen: "panDesayuno.jpg" },
    { id: 40, nombre: "Pan para panini Bolsa 12 Unidades", imagen: "panPanini.jpg" },
    { id: 41, nombre: "Pie de limón 12 porciones", imagen: "pieLimon.jpg" },
    { id: 42, nombre: "Pie de pecanas 10 porciones", imagen: "piePecanas.jpg" },
    { id: 43, nombre: "Prusiano Jamón y Queso Unidad", imagen: "prusiano.jpg" },
    { id: 44, nombre: "Queque de banano 8 porciones", imagen: "quequeBanano.jpg" },
    { id: 45, nombre: "Queque de chocolate 12 porciones" },
    { id: 46, nombre: "Queque de Zanahoria con Nuez 10 porciones", imagen: "zanahoriaConNuez.jpg" },
    { id: 48, nombre: "Queque seco 10 porciones", imagen: "quequeSeco.jpg" },
    { id: 49, nombre: "Struddel de manzana Unidad", imagen: "strudel.jpg" },
    { id: 50, nombre: "Tamal Piña 2 Unidades", imagen: "tamalPiña.jpg" },
    { id: 51, nombre: "Torta Zanahoria Fria 12 porciones", imagen: "tortaZanahoria.jpg" }
  ],
  comida: [
    { id: 52, nombre: "Arroz con pollo Kilo", imagen: "arrozConPollo.jpg" },
    { id: 53, nombre: "Bistec Kilo", imagen: "bisteck.jpg" },
    { id: 54, nombre: "Carne mechada arreglada en salsa Kilo", imagen: "carneEnSalsa.jpg" },
    { id: 55, nombre: "Carne Mechada Paquete 2K", imagen: "imagenes/carne_salsa.jpg" },
    { id: 56, nombre: "Chuleta Kilo", imagen: "#" },
    { id: 57, nombre: "Churrasco Kilo", imagen: "churrasco.jpg" },
    { id: 58, nombre: "Gallo Pinto Kilo", imagen: "imagenes/gallo_pinto.jpg" },
    { id: 59, nombre: "Hielo Bolsa 5k", imagen: "hielo.jpeg" },
    { id: 60, nombre: "Lasaña de carne Bandeja 6", imagen: "lasaña.jpg" },
    { id: 61, nombre: "Lasaña de pollo Bandeja 6", imagen: "lasaña.jpg" },
    { id: 62, nombre: "Pechuga de Pollo Cocinada Kilo", imagen: "pechugaPollo.jpg" },
    { id: 63, nombre: "Pico de gallo Kilo", imagen: "picoDeGallo.jpg" },
    { id: 64, nombre: "Plátanos maduros Kilo", imagen: "platanoMaduro.jpeg" },
    { id: 65, nombre: "Plátanos maduros mitades Kilo", imagen: "platanosMadurosMitades.jpg" },
    { id: 66, nombre: "Pollo Arreglado Kilo", imagen: "polloArreglado.jpg" },
    { id: 67, nombre: "Pollo Asado Entero" },
    { id: 68, nombre: "Pechuga de pollo cruda Kilo", imagen: "polloKilo.jpg" },
    { id: 69, nombre: "Pollo Mechado Paquete 2K", imagen: "polloMechado.jpg" },
    { id: 70, nombre: "Ribeye Kilo", imagen: "ribeye.jpg" },
    { id: 71, nombre: "Trozos de carne en salsa Paquete de 2 Kilos", imagen: "trozosCarneSalsa.jpg" },
    { id: 19, nombre: "Tilapia Caja 4.54 Kilos", imagen: "#" }
  ]
};


// =============================
// MOSTRAR PRODUCTOS
// =============================
function mostrarProductos(lista, divId) {
  const contenedor = document.getElementById(divId);
  contenedor.innerHTML = "";

  lista.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3 mb-4";

    col.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${p.imagen || 'https://via.placeholder.com/200x150.png?text=Sin+Imagen'}"
             class="card-img-top" alt="${p.nombre}"
             style="object-fit: cover; height: 150px;">
        <div class="card-body text-center">
          <h6 class="fw-semibold mb-3">${p.nombre}</h6>

          <div class="input-group input-group-sm justify-content-center mb-2" style="width:120px;margin:auto;">
            <button class="btn btn-outline-secondary" type="button" onclick="cambiarCantidadInput(this, -1)">−</button>
            <input type="number" class="form-control text-center cantidad-prod" min="1" value="1" style="max-width:60px;">
            <button class="btn btn-outline-secondary" type="button" onclick="cambiarCantidadInput(this, 1)">+</button>
          </div>

          <button class="btn btn-primary btn-sm" onclick="agregarDesdeInput(${p.id}, '${p.nombre}', this)">Agregar</button>
        </div>
      </div>`;
    contenedor.appendChild(col);
  });
}

// Cargar productos en las secciones
mostrarProductos(productos.frutas, "productosFrutas");
mostrarProductos(productos.reposteria, "productosReposteria");
mostrarProductos(productos.comida, "productosComida");

// =============================
// CANTIDAD Y CARRITO
// =============================
const tablaCarrito = document.getElementById("tablaCarrito");
const btnCarrito = document.getElementById("btnCarrito");
const modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));
let carrito = [];

// Cambiar cantidad con los botones + y −
window.cambiarCantidadInput = (btn, delta) => {
  const input = btn.parentElement.querySelector(".cantidad-prod");
  let valor = parseInt(input.value) || 1;
  valor = Math.max(1, valor + delta);
  input.value = valor;
};

// Agregar producto desde el input
window.agregarDesdeInput = (id, nombre, btn) => {
  const input = btn.parentElement.querySelector(".cantidad-prod");
  const cantidad = parseInt(input.value) || 1;

  const existe = carrito.find(i => i.id === id);
  if (existe) existe.cantidad += cantidad;
  else carrito.push({ id, nombre, cantidad });

  actualizarCarrito();

  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `${nombre} x${cantidad} fue añadido al carrito.`,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

// Actualizar tabla del carrito
function actualizarCarrito() {
  tablaCarrito.innerHTML = carrito.map((item, i) => `
    <tr>
      <td>${item.nombre}</td>
      <td><input type="number" min="1" value="${item.cantidad}"
        class="form-control form-control-sm"
        onchange="cambiarCantidad(${i}, this.value)"></td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarItem(${i})">X</button></td>
    </tr>`).join("");
}

window.cambiarCantidad = (index, valor) => {
  const cantidad = parseInt(valor);
  if (isNaN(cantidad) || cantidad < 1) {
    Swal.fire({ icon: "warning", title: "Cantidad inválida", text: "Ingrese un número válido." });
    carrito[index].cantidad = 1;
  } else {
    carrito[index].cantidad = cantidad;
  }
  actualizarCarrito();
};

window.eliminarItem = index => {
  carrito.splice(index, 1);
  actualizarCarrito();
};

btnCarrito.addEventListener("click", () => modalCarrito.show());
// =============================
// Firma (versión estable sin desfase en modales)
// =============================
const canvas = document.getElementById("firma");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

function resizeCanvas() {
  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  const rect = canvas.getBoundingClientRect();

  // Evita tamaños inválidos (cuando el modal está oculto)
  if (rect.width < 10 || rect.height < 10) return;

  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#111";
}

let dibujando = false;

function getPosFromEvent(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function startDraw(e) {
  e.preventDefault();
  dibujando = true;
  const p = getPosFromEvent(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function moveDraw(e) {
  if (!dibujando) return;
  const p = getPosFromEvent(e);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function endDraw() {
  dibujando = false;
}

canvas.addEventListener("pointerdown", startDraw, { passive: false });
canvas.addEventListener("pointermove", moveDraw, { passive: false });
canvas.addEventListener("pointerup", endDraw, { passive: false });
canvas.addEventListener("pointercancel", endDraw, { passive: false });

document.getElementById("limpiarFirma").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ✅ Redimensiona solo cuando el modal esté visible
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

// ⚡️ CORRECCIÓN CRÍTICA: recalcular al abrir el modal
const modalFirma = document.getElementById("modalCarrito");
if (modalFirma) {
  modalFirma.addEventListener("shown.bs.modal", resizeCanvas);
}

// =============================
// PROCESAR PEDIDO
// =============================
document.getElementById("formPedido").addEventListener("submit", async e => {
  e.preventDefault();

  if (carrito.length === 0)
    return Swal.fire({ icon: 'error', title: 'Carrito vacío', text: 'Debe agregar productos.' });

  const local = document.getElementById("local").value;
  const encargado = document.getElementById("encargado").value.trim();

  if (!local || !encargado)
    return Swal.fire({ icon: 'warning', title: 'Faltan datos', text: 'Complete todos los campos.' });

  // Detectar si hay firma
  let firma = "";
  try {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const hayFirma = Array.from(data).some(v => v !== 0);
    if (hayFirma) firma = canvas.toDataURL();
  } catch (err) {
    console.warn("⚠️ Error leyendo firma:", err);
  }

  const pedido = {
    id: Date.now(),
    local,
    encargado,
    fechaRegistro: new Date().toLocaleString(),
    firma,
    items: carrito
  };

  try {
    const db = getDB();
    await addDoc(collection(db, "pedidos"), pedido);
    generarPDF(pedido);
    carrito = [];
    actualizarCarrito();

    await Swal.fire({
      icon: "success",
      title: "Pedido procesado",
      text: "El pedido fue guardado correctamente.",
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false
    });

    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    Swal.fire({ icon: "error", title: "Error al guardar", text: error.message });
  }
});

// =============================
// GENERAR PDF (con salto de página automático)
// =============================
function generarPDF(pedido) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const margenIzq = 20;
  const margenSup = 20;
  const altoLinea = 6;
  const altoMax = 270; // límite antes de nueva página
  let y = margenSup;

  // Título principal
  doc.setFontSize(16);
  doc.text("Pedido Producción El Tostador", margenIzq, y);
  y += 10;

  // Datos generales
  doc.setFontSize(12);
  doc.text(`Fecha: ${pedido.fechaRegistro}`, margenIzq, y); y += altoLinea;
  doc.text(`Local: ${pedido.local}`, margenIzq, y); y += altoLinea;
  doc.text(`Encargado: ${pedido.encargado}`, margenIzq, y); y += altoLinea * 2;

  // Productos
  doc.setFontSize(13);
  doc.text("Productos:", margenIzq, y);
  y += altoLinea + 2;
  doc.setFontSize(11);

  pedido.items.forEach(it => {
    // Si el texto va a pasar el límite de página, crear nueva
    if (y > altoMax) {
      doc.addPage();
      y = margenSup;
    }
    doc.text(`${it.nombre}  x${it.cantidad}`, margenIzq + 5, y);
    y += altoLinea;
  });

  // Agregar firma si existe
  if (pedido.firma) {
    if (y + 40 > altoMax) {
      doc.addPage();
      y = margenSup;
    }
    y += 10;
    doc.setFontSize(12);
    doc.text("Firma:", margenIzq, y);
    doc.addImage(pedido.firma, "PNG", margenIzq, y + 2, 50, 25);
  }

  // Guardar el archivo
  doc.save(`Pedido_${pedido.local}_${pedido.id}.pdf`);
}
