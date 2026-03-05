// =============================
// Login con datos desde Firestore
// =============================
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const form = document.getElementById("formLogin");
const usuarioInput = document.getElementById("usuario");
const claveInput = document.getElementById("clave");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const clave = claveInput.value.trim();

    try {
        const querySnapshot = await getDocs(collection(window.db, "usuarios"));
        let acceso = false;
        let paginaDestino = "";

        querySnapshot.forEach((doc) => {
            const datos = doc.data();

            if (datos.usuario === usuario && datos.clave === clave) {
                acceso = true;

                // 🔹 Redirección según usuario
                if (usuario === "CulturasGastronomicas") {
                    paginaDestino = "pedidosRecibidosCultGast.html";
                }

                if (usuario === "ProveeduriaAcadesa") {
                    paginaDestino = "pedidosRecibidosAcadesa.html";
                }

                if (usuario === "Contabilidad") {
                    paginaDestino = "contabilidad.html";
                }
            }
        });

        if (acceso) {
            sessionStorage.setItem("autenticado", "true");
            sessionStorage.setItem("usuario", usuario);

            Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: "Inicio de sesión correcto",
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                window.location.assign(paginaDestino);
            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Usuario o contraseña incorrectos",
            });
        }

    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo validar el usuario.",
        });
    }
});