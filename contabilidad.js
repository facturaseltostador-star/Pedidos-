import {
    getDocs,
    getDoc,
    deleteDoc,
    doc,
    collection
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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

function getDB() {

    if (!window.db) {
        Swal.fire("Error", "Firebase no inicializado", "error");
        throw new Error("Firebase no inicializado");
    }

    return window.db;

}

async function cargarPedidos() {

    const cont = document.getElementById("listaPedidos");
    cont.innerHTML = "";

    try {

        const db = getDB();

        const snapshot = await getDocs(collection(db, "pedidosProcesados"));

        if (snapshot.empty) {

            cont.innerHTML = `<p class="text-center text-muted">No hay pedidos procesados.</p>`;
            return;

        }

        snapshot.forEach((docSnap) => {

            const p = docSnap.data();
            const id = docSnap.id;

            const itemsHTML = p.items?.map(it => `<li>${it.nombre} x${it.cantidad}</li>`).join("") || "<li>(Sin artículos)</li>";

            const card = document.createElement("div");

            card.className = "col-12 mb-3";

            card.innerHTML = `

            <div class="card shadow-sm">

            <div class="card-body">

            <h5>${p.local}</h5>

            <p><strong>Encargado:</strong> ${p.encargado}</p>

            <p><strong>Fecha registro:</strong> ${p.fechaRegistro}</p>

            <p><strong>Procesado:</strong> ${formatearFecha(p.fechaProcesado)}</p>

            <ul>${itemsHTML}</ul>

            ${p.firma ? `<img src="${p.firma}" width="150" class="border mt-2">` : ""}

            <div class="text-end mt-3">

            <button class="btn btn-primary btn-sm me-2" data-id="${id}" data-action="pdf">PDF</button>

            <button class="btn btn-success btn-sm me-2" data-id="${id}" data-action="excel">Excel</button>

            <button class="btn btn-danger btn-sm" data-id="${id}" data-action="eliminar">Eliminar</button>

            </div>

            </div>

            </div>

            `;

            cont.appendChild(card);

        });

        cont.querySelectorAll("[data-action='pdf']").forEach(btn => {
            btn.addEventListener("click", () => descargarPDF(btn.dataset.id));
        });

        cont.querySelectorAll("[data-action='excel']").forEach(btn => {
            btn.addEventListener("click", () => descargarExcel(btn.dataset.id));
        });

        cont.querySelectorAll("[data-action='eliminar']").forEach(btn => {
            btn.addEventListener("click", () => eliminarPedido(btn.dataset.id));
        });

    } catch (err) {

        Swal.fire("Error", err.message, "error");

    }

}
async function eliminarPedido(id) {

    const confirmar = await Swal.fire({
        title: "¿Eliminar pedido?",
        text: "Se eliminará definitivamente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar"
    });

    if (!confirmar.isConfirmed) return;

    try {

        const db = getDB();

        await deleteDoc(doc(db, "pedidosProcesados", id));

        Swal.fire({
            icon: "success",
            title: "Eliminado",
            timer: 1500,
            showConfirmButton: false
        });

        cargarPedidos();

    } catch (err) {

        Swal.fire("Error", err.message, "error");

    }

}
// =============================
// Descargar pedido en Excel
// =============================
async function descargarExcel(id) {

    const db = getDB();
    const docRef = doc(db, "pedidosProcesados", id);
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
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + contenido], { type: "text/csv;charset=utf-8;" })

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
// Descargar PDF ⭐ CAMBIADO A pedidosSJ
// =============================
async function descargarPDF(id) {
    try {
        const db = getDB();
        const docRef = doc(db, "pedidosProcesados", id);
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
function formatearFecha(fechaISO) {

    if (!fechaISO) return "";

    const fecha = new Date(fechaISO);

    return fecha.toLocaleString("es-CR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

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
window.addEventListener("DOMContentLoaded", cargarPedidos);