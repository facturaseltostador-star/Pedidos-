// =============================
// Importar funciones de Firestore
// =============================
import {
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    setDoc,
    doc,
    collection
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// =============================
// Verificación de sesión activa
// =============================
if (sessionStorage.getItem("autenticado") !== "true") {
    Swal.fire({
        icon: "warning",
        title: "Acceso denegado",
        text: "Debes iniciar sesión para acceder a esta página.",
    }).then(() => {
        window.location.assign("login.html");
    });
    throw new Error("Usuario no autenticado");
}

// =============================
// Obtener referencia segura a Firestore
// =============================
function getDB() {
    if (!window.db) {
        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "Firebase no está inicializado. Recargue la página.",
        });
        throw new Error("Firebase no inicializado (window.db indefinido)");
    }
    return window.db;
}

// =============================
// Cargar pedidos desde Firestore  ⭐ CAMBIADO A pedidosSJ
// =============================
async function cargarPedidos() {
    const cont = document.getElementById("listaPedidos");
    cont.innerHTML = "";

    try {
        const db = getDB();
        const snapshot = await getDocs(collection(db, "pedidosSJ"));

        if (snapshot.empty) {
            cont.innerHTML = `<p class="text-center text-muted">No hay pedidos registrados.</p>`;
            return;
        }

        cont.innerHTML = "";

        snapshot.forEach((docSnap) => {
            const p = docSnap.data();
            const id = docSnap.id;

            const itemsHTML = p.items
                ?.map(it => `<li>${it.nombre} x${it.cantidad}</li>`)
                .join("") || "<li>(Sin artículos)</li>";

            const card = document.createElement("div");
            card.className = "col-12 mb-3";
            card.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>${p.local}</h5>
            <p><strong>Encargado:</strong> ${p.encargado}</p>
            <p><strong>Registrado el:</strong> ${p.fechaRegistro}</p>
            <ul>${itemsHTML}</ul>
            ${p.firma ? `<img src="${p.firma}" width="150" alt="Firma" class="border mt-2">` : ""}
            <div class="text-end mt-3">
            <button class="btn btn-primary btn-sm me-2" data-id="${id}" data-action="pdf">PDF</button>
            <button class="btn btn-success btn-sm me-2" data-id="${id}" data-action="excel">Excel</button>
            <button class="btn btn-warning btn-sm me-2" data-id="${id}" data-action="editar">Editar</button>
            <button class="btn btn-dark btn-sm" data-id="${id}" data-action="procesar">Procesar</button>
            </div>
          </div>
        </div>`;
            cont.appendChild(card);
        });

        cont.querySelectorAll("[data-action='excel']").forEach(btn =>
            btn.addEventListener("click", () => descargarExcel(btn.dataset.id))
        );

        cont.querySelectorAll("[data-action='editar']").forEach(btn =>
            btn.addEventListener("click", () => editarPedido(btn.dataset.id))
        );

        cont.querySelectorAll("[data-action='procesar']").forEach(btn =>
            btn.addEventListener("click", () => procesarPedido(btn.dataset.id))
        );
        cont.querySelectorAll("[data-action='pdf']").forEach(btn =>
            btn.addEventListener("click", () => descargarPDF(btn.dataset.id))
        );

    } catch (err) {
        console.error("Error al cargar pedidos:", err);
        Swal.fire({ icon: "error", title: "Error al cargar", text: err.message });
    }
}

// =============================
// Eliminar pedido ⭐ CAMBIADO A pedidosSJ
// =============================
async function eliminarPedido(id) {
    const r = await Swal.fire({
        title: "¿Desea eliminar este pedido?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });
    if (!r.isConfirmed) return;

    try {
        const db = getDB();
        await deleteDoc(doc(db, "pedidosSJ", id));

        Swal.fire({
            icon: "success",
            title: "Pedido eliminado",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
        });

        cargarPedidos();
    } catch (err) {
        Swal.fire({ icon: "error", title: "Error al eliminar", text: err.message });
    }
}

// =============================
// Descargar PDF ⭐ CAMBIADO A pedidosSJ
// =============================
async function descargarPDF(id) {
    try {
        const db = getDB();
        const docRef = doc(db, "pedidosSJ", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            Swal.fire({ icon: "error", title: "No encontrado", text: "El pedido no existe." });
            return;
        }

        const p = docSnap.data();
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const margenIzq = 10;
        const margenSup = 20;
        const altoLinea = 7;
        const altoMax = 270;
        let y = margenSup;

        pdf.setFontSize(16);
        pdf.text("Pedido de Producción - El Tostador", margenIzq, y);
        y += 12;

        pdf.setFontSize(12);
        pdf.text(`Local: ${p.local}`, margenIzq, y); y += altoLinea;
        pdf.text(`Encargado: ${p.encargado}`, margenIzq, y); y += altoLinea;
        pdf.text(`Fecha de registro: ${p.fechaRegistro}`, margenIzq, y);
        y += altoLinea * 1.5;

        pdf.setFontSize(13);
        pdf.text("Artículos:", margenIzq, y);
        y += altoLinea;
        pdf.setFontSize(11);

        p.items?.forEach(it => {
            if (y > altoMax) {
                pdf.addPage();
                y = margenSup;
            }
            pdf.text(`- ${it.nombre} x${it.cantidad}`, margenIzq + 4, y);
            y += altoLinea;
        });

        if (p.firma) {
            if (y + 40 > altoMax) {
                pdf.addPage();
                y = margenSup;
            }
            y += 10;
            pdf.setFontSize(12);
            pdf.text("Firma:", margenIzq, y);
            pdf.addImage(p.firma, "PNG", margenIzq + 18, y - 4, 50, 25);
        }

        pdf.save(`Pedido_${p.local}_${id}.pdf`);

    } catch (err) {
        console.error("Error al generar PDF:", err);
        Swal.fire({ icon: "error", title: "Error al generar PDF", text: err.message });
    }
}

// =============================
// Cerrar sesión
// =============================
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        Swal.fire({
            icon: "question",
            title: "¿Cerrar sesión?",
            text: "Tu sesión se cerrará y deberás volver a iniciar.",
            showCancelButton: true,
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("autenticado");
                Swal.fire({
                    icon: "info",
                    title: "Sesión cerrada",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    window.location.assign("login.html");
                });
            }
        });
    });
}
// =============================
// Descargar pedido en Excel
// =============================
async function descargarExcel(id) {

    const db = getDB();
    const docRef = doc(db, "pedidosSJ", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        Swal.fire("Error", "Pedido no encontrado", "error");
        return;
    }

    const p = docSnap.data();

    // Encabezados de Excel
    let contenido = "Articulo;Cantidad\n";

    // Artículos
    p.items?.forEach(it => {
        contenido += `"${it.nombre}";${it.cantidad}\n`;
    });

    // Crear archivo
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });

    // Formatear fecha para nombre de archivo
    // Nombre del archivo: Pedido (Local) (Fecha)
    let local = p.local || "Local";
    let fecha = p.fechaRegistro || "Fecha";

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Pedido_${local}_${fecha}.csv`;
    link.click();
}
// =============================
// Editar Pedido
// =============================
async function editarPedido(id) {

    const db = getDB();
    const docRef = doc(db, "pedidosSJ", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        Swal.fire("Error", "Pedido no encontrado", "error");
        return;
    }

    const p = docSnap.data();

    let html = "";

    p.items.forEach((it, i) => {
        html += `
        <div class="mb-2">
            <label>${it.nombre}</label>
            <input type="number" id="item_${i}" class="swal2-input" value="${it.cantidad}" min="0">
        </div>`;
    });

    const result = await Swal.fire({
        title: "Editar cantidades",
        html: html,
        showCancelButton: true,
        confirmButtonText: "Guardar cambios",
        cancelButtonText: "Cancelar",
        focusConfirm: false
    });

    if (!result.isConfirmed) return;

    // Actualizar cantidades
    const nuevosItems = p.items.map((it, i) => {
        const nuevaCantidad = document.getElementById(`item_${i}`).value;

        return {
            nombre: it.nombre,
            cantidad: parseInt(nuevaCantidad) || 0
        };
    });

    try {

        await updateDoc(docRef, {
            items: nuevosItems
        });

        Swal.fire({
            icon: "success",
            title: "Pedido actualizado",
            timer: 1500,
            showConfirmButton: false
        });

        cargarPedidos();

    } catch (err) {

        Swal.fire("Error", err.message, "error");

    }

}
// =============================
// Procesar Pedido
// =============================
async function procesarPedido(id) {

    const confirmar = await Swal.fire({
        title: "¿Procesar pedido?",
        text: "El pedido se moverá a pedidos procesados.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, procesar",
        cancelButtonText: "Cancelar"
    });

    if (!confirmar.isConfirmed) return;

    try {

        const db = getDB();

        const docRef = doc(db, "pedidosSJ", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            Swal.fire("Error", "Pedido no encontrado", "error");
            return;
        }

        const datos = docSnap.data();

        // 🔹 Guardar en nueva colección
        const nuevoRef = doc(db, "pedidosProcesados", id);

        await setDoc(nuevoRef, {
            ...datos,
            fechaProcesado: new Date().toISOString()
        });

        // 🔹 Eliminar de pedidosSJ
        await deleteDoc(docRef);

        Swal.fire({
            icon: "success",
            title: "Pedido procesado",
            timer: 1500,
            showConfirmButton: false
        });

        cargarPedidos();

    } catch (err) {

        console.error(err);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message
        });

    }

}
// =============================
// Iniciar carga al abrir página
// =============================
window.addEventListener("DOMContentLoaded", cargarPedidos);

// Refresco automático cada 5 minutos
setInterval(cargarPedidos, 300000);
