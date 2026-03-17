// ===============================
// Envío de Mermas a Google Sheet
// ===============================

// 🔹 PEGUE AQUÍ SU NUEVA URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwSAm5H47sRteAgZFdUU5zSHg3_wXBNu0MZO5OnyVuk9vQBXQiJdHREZHPg-35w3FI/exec";


// ===============================
// Agregar nueva fila
// ===============================
function agregarFila() {

    const contenedor = document.getElementById("contenedorArticulos");

    const nuevaFila = document.createElement("div");
    nuevaFila.classList.add("row", "fila-articulo", "mt-2");

    nuevaFila.innerHTML = `
        <div class="col-md-5">
            <input type="text" class="form-control articulo" placeholder="Nombre del artículo" required>
        </div>

        <div class="col-md-3">
            <input type="number" min="0" step="any" class="form-control cantidad" placeholder="Cantidad" required>
        </div>

        <div class="col-md-3">
            <select class="form-select unidad" required>
                <option value="">Unidad de medida</option>
                <option>Unidad</option>
                <option>Litros</option>
                <option>Mililitros</option>
                <option>Gramos</option>
                <option>Kilos</option>
            </select>
        </div>

        <div class="col-md-1 d-flex gap-2">
            <button type="button" class="btn btn-success" onclick="agregarFila()">+</button>
            <button type="button" class="btn btn-danger" onclick="eliminarFila(this)">−</button>
        </div>
    `;

    contenedor.appendChild(nuevaFila);
}


// ===============================
// Eliminar fila (mínimo 1)
// ===============================
function eliminarFila(boton) {
    const filas = document.querySelectorAll(".fila-articulo");
    if (filas.length > 1) {
        boton.closest(".fila-articulo").remove();
    }
}


// ===============================
// Enviar formulario
// ===============================
// ===============================
// Enviar formulario
// ===============================
document.getElementById("formMermas").addEventListener("submit", async function (e) {

    e.preventDefault();

    const boton = document.getElementById("btnEnviar");

    if (!this.checkValidity()) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Complete todos los campos."
        });
        return;
    }

    boton.disabled = true;
    boton.innerHTML = "Enviando...";

    const piso = document.getElementById("piso").value;
    const nombre = document.getElementById("nombrePersona").value;

    const filas = document.querySelectorAll(".fila-articulo");

    let articulos = [];

    filas.forEach(fila => {

        const inputArticulo = fila.querySelector(".articulo");
        const inputCantidad = fila.querySelector(".cantidad");
        const inputUnidad = fila.querySelector(".unidad");

        if (inputArticulo && inputCantidad && inputUnidad) {

            articulos.push({
                articulo: inputArticulo.value,
                cantidad: inputCantidad.value,
                unidad: inputUnidad.value
            });

        }

    });

    try {

        const respuesta = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                piso: piso,
                nombre: nombre,
                articulos: JSON.stringify(articulos)
            })
        });

        const data = await respuesta.text();

        console.log("Respuesta servidor:", data);

        Swal.fire({
            icon: "success",
            title: "Merma enviada",
            text: "La información se registró correctamente.",
            confirmButtonText: "OK"
        });

        this.reset();

    } catch (error) {

        console.error("ERROR REAL:", error);

        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo enviar la información."
        });

    }

    boton.disabled = false;
    boton.innerHTML = "Enviar";

});