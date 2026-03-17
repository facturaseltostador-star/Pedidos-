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
// Catálogo 
// =============================
const productos = {
    frutasCongeladas: [
        { id: 1, nombre: "Congelada Mix Fresa - Papaya - Piña Unidad", imagen: "#" },
        { id: 2, nombre: "Congelada Mix Mango - Fresa Unidad", imagen: "#" },
        { id: 3, nombre: "Congelada Mix Piña - Fresa Unidad", imagen: "#" },
        { id: 4, nombre: "Congelado Cas Unidad", imagen: "#" },
        { id: 5, nombre: "Congelado Fresa Unidad", imagen: "#" },
        { id: 6, nombre: "Congelado Mango Unidad", imagen: "#" },
        { id: 7, nombre: "Congelado Mora Unidad", imagen: "#" },
        { id: 8, nombre: "Congelado Papaya Unidad", imagen: "#" },
        { id: 9, nombre: "Congelado Piña Unidad", imagen: "#" },
        { id: 10, nombre: "Congelado Sandía Unidad", imagen: "#" }
    ],
    etiquetas: [
        { id: 11, nombre: "Etiqueta Caracolillo Rollo", imagen: "#" },
        { id: 12, nombre: "Etiqueta Orgánico Rollo", imagen: "#" },
        { id: 13, nombre: "Etiqueta Real Rollo", imagen: "#" },
        { id: 14, nombre: "Etiqueta Tarrazú Rollo", imagen: "#" },

    ],

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
mostrarProductos(productos.frutasCongeladas, "frutasCongeladas");
mostrarProductos(productos.etiquetas, "etiquetas");



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
// Firma
// =============================
const canvas = document.getElementById("firma");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

function resizeCanvas() {
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();

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

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

const modalFirma = document.getElementById("modalCarrito");
if (modalFirma) {
    modalFirma.addEventListener("shown.bs.modal", resizeCanvas);
}

// =============================
// PROCESAR PEDIDO  (colección cambiada)
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

        // ⭐ AQUÍ CAMBIADO → colección exclusiva para SJ
        await addDoc(collection(db, "pedidosSJ"), pedido);

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
// GENERAR PDF
// =============================
function generarPDF(pedido) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margenIzq = 20;
    const margenSup = 20;
    const altoLinea = 6;
    const altoMax = 270;
    let y = margenSup;

    doc.setFontSize(16);
    doc.text("Pedido Producción El Tostador", margenIzq, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Fecha: ${pedido.fechaRegistro}`, margenIzq, y); y += altoLinea;
    doc.text(`Local: ${pedido.local}`, margenIzq, y); y += altoLinea;
    doc.text(`Encargado: ${pedido.encargado}`, margenIzq, y); y += altoLinea * 2;

    doc.setFontSize(13);
    doc.text("Productos:", margenIzq, y);
    y += altoLinea + 2;
    doc.setFontSize(11);

    pedido.items.forEach(it => {
        if (y > altoMax) {
            doc.addPage();
            y = margenSup;
        }
        doc.text(`${it.nombre}  x${it.cantidad}`, margenIzq + 5, y);
        y += altoLinea;
    });

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

    doc.save(`Pedido_${pedido.local}_${pedido.id}.pdf`);
}
