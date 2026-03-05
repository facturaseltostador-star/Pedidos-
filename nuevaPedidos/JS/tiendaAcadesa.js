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
    materialEmpaque: [
        { id: 1, nombre: "Bolsa Bobina 14x20 Rollo", imagen: "#" },
        { id: 2, nombre: "Bolsa Bobina 7x10 Rollo", imagen: "#" },
        { id: 3, nombre: "Bolsa Bobina 8x12 Rollo", imagen: "#" },
        { id: 4, nombre: "Bolsa Bobina 9x14 Rollo", imagen: "#" },
        { id: 5, nombre: "Bolsa Jardín Grande Kilo", imagen: "#" },
        { id: 6, nombre: "Bolsa Jardín Mediana Kilo", imagen: "#" },
        { id: 7, nombre: "Bolsa Manigueta Grande Kilo", imagen: "#" },
        { id: 8, nombre: "Bolsa Manigueta Jumbo Kilo", imagen: "#" },
        { id: 9, nombre: "Bolsa Manigueta Mediana Kilo", imagen: "#" },
        { id: 10, nombre: "Bolsa Manigueta Pequeña Kilo", imagen: "#" },
        { id: 11, nombre: "Bolsa polipropileno 4x6 Paquete", imagen: "#" },
        { id: 12, nombre: "Bolsa polipropileno 5x8 Paquete", imagen: "#" },
        { id: 13, nombre: "Bolsa polipropileno 6x10 Paquete", imagen: "#" },
        { id: 14, nombre: "Bolsa de Papel # 1 Caja", imagen: "#" },
        { id: 15, nombre: "Bolsa de Papel # 1/2 Caja", imagen: "#" },
        { id: 16, nombre: "Bolsa de Papel # 2 Caja", imagen: "#" },
        { id: 17, nombre: "Bolsa de Papel # 4 Caja", imagen: "#" },
        { id: 18, nombre: "Bolsa de Papel # 5 Caja", imagen: "#" },
        { id: 19, nombre: "Bolsa de Papel # 8 Caja", imagen: "#" },
        { id: 20, nombre: "Bolsa para Café Metálica 1 kg Unidad", imagen: "#" },
        { id: 21, nombre: "Bolsa para Café Metálica 1/2 kilo Unidad", imagen: "#" },
        { id: 22, nombre: "Bolsa para Café Metálica 1/4 kilo Unidad", imagen: "#" },
        { id: 23, nombre: "Bolsa para Café Metálica 2.5 kg Unidad", imagen: "#" },
        { id: 24, nombre: "Bolsa para Café con cierre de 1 Kilo Unidad", imagen: "#" },
        { id: 25, nombre: "Bolsa para Café con cierre de 1/2 kilo Unidad", imagen: "#" },
        { id: 26, nombre: "Bolsa para Café con cierre de 1/4 kilo Unidad", imagen: "#" },
        { id: 27, nombre: "Caja Churro grande Paquete 50 Unidades", imagen: "#" },
        { id: 28, nombre: "Caja Churro pequeña Paquete 50 Unidades", imagen: "#" },
        { id: 29, nombre: "Concha Biodegradable Unidad", imagen: "#" },
        { id: 30, nombre: "Concha biodegradable de 3 divisiones Unidad", imagen: "#" },
        { id: 31, nombre: "Cuchara Plástica Caja 100 Unidades", imagen: "#" },
        { id: 32, nombre: "Cuchillo Plástico Caja 100 Unidades", imagen: "#" },
        { id: 33, nombre: "Envase Chino Entero Unidad", imagen: "#" },
        { id: 34, nombre: "Etiqueta Caracolillo Rollo", imagen: "#" },
        { id: 35, nombre: "Etiqueta Orgánico Rollo", imagen: "#" },
        { id: 36, nombre: "Etiqueta Real Rollo", imagen: "#" },
        { id: 37, nombre: "Etiqueta Tarrazú Rollo", imagen: "#" },
        { id: 38, nombre: "Funda para Vaso #12 Unidad", imagen: "#" },
        { id: 39, nombre: "Funda para Vaso #8 Unidad", imagen: "#" },
        { id: 40, nombre: "Mallas para el cabello Paquete 100 Unidades", imagen: "#" },
        { id: 41, nombre: "Pajilla para Batido Caja 400 Unidades", imagen: "#" },
        { id: 42, nombre: "Papel Encerado Caja", imagen: "#" },
        { id: 43, nombre: "Porta Vasos Paquete 50 Unidades", imagen: "#" },
        { id: 44, nombre: "Removedor de Madera Caja 1 000 Unidades", imagen: "#" },
        { id: 45, nombre: "Rollo de Papel Aluminio Caja", imagen: "#" },
        { id: 46, nombre: "Rollo de Plástico Adhesivo Caja", imagen: "#" },
        { id: 47, nombre: "Rollo térmico de impresora Paquete 5 Unidades", imagen: "#" },
        { id: 48, nombre: "Servilleta Interfoliada Caja 30 Unidades", imagen: "#" },
        { id: 49, nombre: "Servilletas Caja de 24 unidades", imagen: "#" },
        { id: 50, nombre: "Tapa Domo Unidad", imagen: "#" },
        { id: 51, nombre: "Tapa Plana con Ranura Unidad", imagen: "#" },
        { id: 52, nombre: "Tapa de Vaso El Tostador #12 Unidad", imagen: "#" },
        { id: 53, nombre: "Tapa de Vaso El Tostador #8 Unidad", imagen: "#" },
        { id: 54, nombre: "Tenedor Paquete 100 Unidades", imagen: "#" },
        { id: 55, nombre: "Vaso Térmico El Tostador #12 Unidad", imagen: "#" },
        { id: 56, nombre: "Vaso Térmico El Tostador #8 Unidad", imagen: "#" },
        { id: 57, nombre: "Vaso Transparente batidos Unidad", imagen: "#" },
        { id: 58, nombre: "Vaso genérico #4 Unidad", imagen: "#" }

    ],

    limpieza: [
        { id: 59, nombre: "Alámbrina Unidad", imagen: "#" },
        { id: 60, nombre: "Alcohol en gel Unidad", imagen: "#" },
        { id: 61, nombre: "Botella y atomizador Unidad", imagen: "#" },
        { id: 62, nombre: "Cepillo de Acero para Paninera Unidad", imagen: "#" },
        { id: 63, nombre: "Cloro Galón", imagen: "#" },
        { id: 64, nombre: "Desengrasante Limpiador Amarillo Galón", imagen: "#" },
        { id: 65, nombre: "Desengrasante para Hornos y Plancha Galón", imagen: "#" },
        { id: 66, nombre: "Desengrasante para Pisos Galón", imagen: "#" },
        { id: 67, nombre: "Desinfectante Rosado Galón", imagen: "#" },
        { id: 68, nombre: "Escoba Unidad", imagen: "#" },
        { id: 69, nombre: "Escoba pequeña Unidad", imagen: "#" },
        { id: 70, nombre: "Esponja Doble uso Unidad", imagen: "#" },
        { id: 71, nombre: "Esponja Verde Unidad", imagen: "#" },
        { id: 72, nombre: "Gancho de piso Unidad", imagen: "#" },
        { id: 73, nombre: "Guantes M Caja 100 Unidades", imagen: "#" },
        { id: 74, nombre: "Jabón Lavaplatos Galón", imagen: "#" },
        { id: 75, nombre: "Jabón Lavaplatos Barra Kilo", imagen: "#" },
        { id: 76, nombre: "Jabón Punta Lanza Unidad", imagen: "#" },
        { id: 77, nombre: "Jabón de Manos Unidad", imagen: "#" },
        { id: 78, nombre: "Jabón en Polvo Kilo", imagen: "#" },
        { id: 79, nombre: "Jabón en Polvo para Máquina", imagen: "#" },
        { id: 80, nombre: "Limpia vidrios Galón", imagen: "#" },
        { id: 81, nombre: "Limpiador de baños Galón", imagen: "#" },
        { id: 82, nombre: "Pala Unidad", imagen: "#" },
        { id: 83, nombre: "Paño Blanco Unidad", imagen: "#" },
        { id: 84, nombre: "Paño de Trapeador Unidad", imagen: "#" },
        { id: 85, nombre: "Paño Microfibra Unidad", imagen: "#" },
        { id: 86, nombre: "Rollo de Papel Higiénico Unidad", imagen: "#" },
        { id: 87, nombre: "Rollo papel Toalla Unidad", imagen: "#" },
        { id: 88, nombre: "Saniador Pastilla Unidad", imagen: "#" }

    ],
    nuecesMani: [
        { id: 89, nombre: "Almendra Salada Kilo", imagen: "#" },
        { id: 90, nombre: "Almendra Supreme Kilo", imagen: "#" },
        { id: 91, nombre: "Almendra Tostada Kilo", imagen: "#" },
        { id: 92, nombre: "Almendra fileteada Natural Kilo", imagen: "#" },
        { id: 93, nombre: "Almendras Cubiertas de Chocolate Kilo", imagen: "#" },
        { id: 94, nombre: "Arándanos Kilo", imagen: "#" },
        { id: 95, nombre: "Avellana Blanqueada Kilo", imagen: "#" },
        { id: 96, nombre: "Banana Chips Kilo", imagen: "#" },
        { id: 97, nombre: "Botonetas Kilo", imagen: "#" },
        { id: 98, nombre: "Cacao 150gr Unidad", imagen: "#" },
        { id: 99, nombre: "Caja Higos Miel Caja 25 Unidades", imagen: "#" },
        { id: 100, nombre: "Chía Kilo", imagen: "#" },
        { id: 101, nombre: "Ciruela Kilo", imagen: "#" },
        { id: 102, nombre: "Coco Rallado Paquete 250 gramos", imagen: "#" },
        { id: 103, nombre: "Dátiles Caja 360 gramos", imagen: "#" },
        { id: 104, nombre: "Granola con almendra Kilo", imagen: "#" },
        { id: 105, nombre: "Linaza Molida Paquete 250 gramos", imagen: "#" },
        { id: 106, nombre: "Linaza Pura Paquete 250 gramos", imagen: "#" },
        { id: 107, nombre: "Macadamia Kilo", imagen: "#" },
        { id: 108, nombre: "Maní 3 en 1 Caja 2.5 Kilos", imagen: "#" },
        { id: 109, nombre: "Maní 5 en 1 Caja 2.5 Kilos", imagen: "#" },
        { id: 110, nombre: "Maní Barbacoa Caja 2.5 Kilos", imagen: "#" },
        { id: 111, nombre: "Maní Cáscara Saco 20 Kilos", imagen: "#" },
        { id: 112, nombre: "Maní Japonés Kilo", imagen: "#" },
        { id: 113, nombre: "Maní Japonés con limón Kilo", imagen: "#" },
        { id: 114, nombre: "Maní Japonés con picante Kilo", imagen: "#" },
        { id: 115, nombre: "Maní Picado Paquete 250 gramos", imagen: "#" },
        { id: 116, nombre: "Maní Picante Paquete 2.5 Kilos", imagen: "#" },
        { id: 117, nombre: "Maní Salado Paquete 2.5 Kilos", imagen: "#" },
        { id: 118, nombre: "Maní Salado con Pasas Paquete 2.5 Kilos", imagen: "#" },
        { id: 119, nombre: "Maní Salado con limón Paquete 2.5 Kilos", imagen: "#" },
        { id: 120, nombre: "Maní Simple 2.5 Kilos", imagen: "#" },
        { id: 121, nombre: "Maní Tostado 2.5 Kilos", imagen: "#" },
        { id: 122, nombre: "Maní en polvo Paquete 250 gramos", imagen: "#" },
        { id: 123, nombre: "Maní mita y mita Caja 2.5 Kilos", imagen: "#" },
        { id: 124, nombre: "Mantequilla de Maní Natural Unidad", imagen: "#" },
        { id: 125, nombre: "Marañón Salado Kilo", imagen: "#" },
        { id: 126, nombre: "Marañón Simple Kilo", imagen: "#" },
        { id: 127, nombre: "Marañón Tostado Kilo", imagen: "#" },
        { id: 128, nombre: "Mixta Tropical Caja 2.5 Kilos", imagen: "#" },
        { id: 129, nombre: "Nuez Pecana Kilo", imagen: "#" },
        { id: 130, nombre: "Nuez de Brasil Kilo", imagen: "#" },
        { id: 131, nombre: "Nuez de Nogal Kilo", imagen: "#" },
        { id: 132, nombre: "Pasas Cubiertas de Chocolate Kilo", imagen: "#" },
        { id: 133, nombre: "Pasas Kilo", imagen: "#" },
        { id: 134, nombre: "Pistacho con cáscara Kilo", imagen: "#" },
        { id: 135, nombre: "Semilla mixta con garapiñado 2.5 Kilos", imagen: "#" },
        { id: 136, nombre: "Semilla Mixta Caja 2.5 Kilos", imagen: "#" },
        { id: 137, nombre: "Semilla Mixta con Botonetas Caja 2.5 Kilos", imagen: "#" },
        { id: 138, nombre: "Semilla Mixta premium Caja 2.5 Kilos", imagen: "#" },
        { id: 139, nombre: "Semilla Mixta sin sal Caja 2.5 Kilos", imagen: "#" },
        { id: 140, nombre: "Semilla de Ajonjolí Paquete 250 gramos", imagen: "#" },
        { id: 141, nombre: "Semilla de Calabaza Paquete 250 gramos", imagen: "#" },
        { id: 142, nombre: "Semilla de girasol Paquete 250 gramos", imagen: "#" },

    ],

    suministrosCafeteria: [
        { id: 143, nombre: "Aceite Dorofrit 17 Litros", imagen: "#" },
        { id: 144, nombre: "Aceite de oliva 5 litros", imagen: "#" },
        { id: 145, nombre: "Aceite Clover 17 litros", imagen: "#" },
        { id: 146, nombre: "Aceite en Spray Unidad", imagen: "#" },
        { id: 147, nombre: "Aderezo Ranch Unidad", imagen: "#" },
        { id: 148, nombre: "Agua 600ml Bulto 24 Unidades", imagen: "#" },
        { id: 149, nombre: "Azúcar Doña Maria Paquete 2 Kilos", imagen: "#" },
        { id: 150, nombre: "Azúcar El Tostador Paquete 1000 Unidades", imagen: "#" },
        { id: 151, nombre: "Azúcar Morena Paquete 1000 Unidades", imagen: "#" },
        { id: 152, nombre: "Azúcar Refinada Kilo", imagen: "#" },
        { id: 153, nombre: "Base para Té Chai Kilo", imagen: "#" },
        { id: 154, nombre: "Bavaria Unidad", imagen: "#" },
        { id: 155, nombre: "Bulto de arroz 12 paquetes", imagen: "#" },
        { id: 156, nombre: "Caramelo Hersheys Unidad", imagen: "#" },
        { id: 157, nombre: "Cargadores de Chantilly Caja 24 Unidades", imagen: "#" },
        { id: 158, nombre: "Chantilly Caja 4 kg", imagen: "#" },
        { id: 159, nombre: "Coca Cola Regular Vidrio Unidad", imagen: "#" },
        { id: 160, nombre: "Coca Cola Zero Vidrio Unidad", imagen: "#" },
        { id: 161, nombre: "Congelada Mix Fresa - Papaya - Piña Unidad", imagen: "#" },
        { id: 162, nombre: "Congelada Mix Mango - Fresa Unidad", imagen: "#" },
        { id: 163, nombre: "Congelada Mix Piña - Fresa Unidad", imagen: "#" },
        { id: 164, nombre: "Congelado Cas Unidad", imagen: "#" },
        { id: 165, nombre: "Congelado Fresa Unidad", imagen: "#" },
        { id: 166, nombre: "Congelado Mango Unidad", imagen: "#" },
        { id: 167, nombre: "Congelado Mora Unidad", imagen: "#" },
        { id: 168, nombre: "Congelado Mora Fresa Unidad", imagen: "#" },
        { id: 169, nombre: "Congelado Papaya Unidad", imagen: "#" },
        { id: 170, nombre: "Congelado Piña Unidad", imagen: "#" },
        { id: 171, nombre: "Congelado Sandía Unidad", imagen: "#" },
        { id: 172, nombre: "Consomé de pollo Kilo", imagen: "#" },
        { id: 173, nombre: "Sazonador de costilla Kilo", imagen: "#" },
        { id: 174, nombre: "Dulce Granulado Paquete 450 gr", imagen: "#" },
        { id: 175, nombre: "Dulce de Leche Tarro 5 kg", imagen: "#" },
        { id: 176, nombre: "Frijoles Bulto 15 kilos", imagen: "#" },
        { id: 177, nombre: "Ginger Ale Vidrio Unidad", imagen: "#" },
        { id: 178, nombre: "Helado de Vainilla Balde 5.3 kg", imagen: "#" },
        { id: 179, nombre: "Heineken Unidad", imagen: "#" },
        { id: 180, nombre: "Huevos Unidad", imagen: "#" },
        { id: 181, nombre: "Imperial Unidad", imagen: "#" },
        { id: 182, nombre: "Imperial Ultra Unidad", imagen: "#" },
        { id: 183, nombre: "Jamón Cocido Kilo", imagen: "#" },
        { id: 184, nombre: "Jamón de pavo Kilo", imagen: "#" },
        { id: 185, nombre: "Jugo de Limón Galón", imagen: "#" },
        { id: 186, nombre: "Jugo de Naranja 2.2 Litros", imagen: "#" },
        { id: 187, nombre: "Leche Deslactosada Unidad", imagen: "#" },
        { id: 188, nombre: "Leche Entera Unidad", imagen: "#" },
        { id: 189, nombre: "Leche en polvo Kilo", imagen: "#" },
        { id: 190, nombre: "Leche de Almendra Unidad", imagen: "#" },
        { id: 191, nombre: "Licor de Café Botella", imagen: "#" },
        { id: 192, nombre: "Lizano Galón", imagen: "#" },
        { id: 193, nombre: "Mano de piedra Panini Kilo", imagen: "#" },
        { id: 194, nombre: "Mayonesa Galón", imagen: "#" },
        { id: 195, nombre: "Mayonesa Sobres Paquete", imagen: "#" },
        { id: 196, nombre: "Maíz dulce Lata", imagen: "#" },
        { id: 197, nombre: "Numar suave Caja 1 360 gramos", imagen: "#" },
        { id: 198, nombre: "Palillos de Dientes Caja 1000 Unidades", imagen: "#" },
        { id: 199, nombre: "Palillos para Paninis Caja 1000 Unidades", imagen: "#" },
        { id: 200, nombre: "Papa a la Francesa Paquete 2.5 Kilos", imagen: "#" },
        { id: 201, nombre: "Papas en Gajos Paquete 2.5 Kilos", imagen: "#" },
        { id: 202, nombre: "Pilsen Unidad", imagen: "#" },
        { id: 203, nombre: "Pulpa de Cas Galón", imagen: "#" },
        { id: 204, nombre: "Pulpa de Fresa Galón", imagen: "#" },
        { id: 205, nombre: "Pulpa de Frutas Galón", imagen: "#" },
        { id: 206, nombre: "Pulpa de Mango Galón", imagen: "#" },
        { id: 207, nombre: "Pulpa de Maracuyá Galón", imagen: "#" },
        { id: 208, nombre: "Pulpa de Guayaba Galón", imagen: "#" },
        { id: 209, nombre: "Pulpa de Piña Colada Galón", imagen: "#" },
        { id: 210, nombre: "Pulpa de Piña con arroz Galón", imagen: "#" },
        { id: 211, nombre: "Pulpa de Tamarindo Galón", imagen: "#" },
        { id: 212, nombre: "Queso Amarillo Rebanadas", imagen: "#" },
        { id: 213, nombre: "Queso Mozarella Rebanado Kilo", imagen: "#" },
        { id: 214, nombre: "Queso Turrialba Kilo", imagen: "#" },
        { id: 215, nombre: "Salchichón Kilo", imagen: "#" },
        { id: 216, nombre: "Salsa de Tomate Galón", imagen: "#" },
        { id: 217, nombre: "Salsa de Tomate sobrecitos", imagen: "#" },
        { id: 218, nombre: "Sirope de Avellana Botella", imagen: "#" },
        { id: 219, nombre: "Sirope de Caramelo Botella", imagen: "#" },
        { id: 220, nombre: "Sirope de Crema Irlandesa Botella", imagen: "#" },
        { id: 221, nombre: "Sirope de Menta Botella", imagen: "#" },
        { id: 222, nombre: "Sirope de Vainilla Botella", imagen: "#" },
        { id: 223, nombre: "Soda Canada Dry Unidad", imagen: "#" },
        { id: 224, nombre: "Tabasco Unidad", imagen: "#" },
        { id: 225, nombre: "Té Frío en Polvo Limón Kilo", imagen: "#" },
        { id: 226, nombre: "Té Manzanilla Paquete 100 Unidades", imagen: "#" },
        { id: 227, nombre: "Té Negro Paquete 100 Unidades", imagen: "#" },
        { id: 228, nombre: "Té Verde Paquete", imagen: "#" },
        { id: 229, nombre: "Té de menta Paquete", imagen: "#" },
        { id: 230, nombre: "Torta de carne 75 gramos Unidad", imagen: "#" },
        { id: 231, nombre: "Tortilla Amarilla Paquete 10", imagen: "#" },
        { id: 232, nombre: "Tortilla de harina Paquete", imagen: "#" },
        { id: 233, nombre: "Tortilla para nacho Paquete", imagen: "#" },
        { id: 234, nombre: "Tropical Blanco Unidad", imagen: "#" },
        { id: 235, nombre: "Tropical Limón Unidad", imagen: "#" },
        { id: 236, nombre: "Tropical Melocotón Unidad", imagen: "#" },
        { id: 237, nombre: "Vinagre Balsámico 500 ml", imagen: "#" },
        { id: 238, nombre: "Whisky Botella", imagen: "#" }
    ],
    barismo: [
        { id: 239, nombre: "Café Caracolillo kilo", imagen: "#" },
        { id: 240, nombre: "Café Estrella kilo", imagen: "#" },
        { id: 241, nombre: "Café Orgánico kilo", imagen: "#" },
        { id: 242, nombre: "Café Real kilo", imagen: "#" },
        { id: 243, nombre: "Café Tarrazu kilo", imagen: "#" }
    ],
    especiesDelMundo: [
        { id: 244, nombre: "Bebida en Polvo de Cacao Dulce 250g", imagen: "#" },
        { id: 245, nombre: "Bebida en Polvo de Crema 250g", imagen: "#" },
        { id: 246, nombre: "Bebida en Polvo de Horchata 250g", imagen: "#" },
        { id: 247, nombre: "Bebida en Polvo de Pinol 250g", imagen: "#" },
        { id: 248, nombre: "Bebida en Polvo de Pinolillo 250g", imagen: "#" },
        { id: 249, nombre: "Splenda 500 uds", imagen: "#" }
    ],
    garapiñado: [
        { id: 250, nombre: "Almendra Confitada kilo", imagen: "#" },
        { id: 251, nombre: "Garapiñado Caramelo kilo", imagen: "#" },
        { id: 252, nombre: "Garapiñado Caramelo con Ajonjolí kilo", imagen: "#" },
        { id: 253, nombre: "Garapiñado Rojo kilo", imagen: "#" }

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
mostrarProductos(productos.materialEmpaque, "materialEmpaque");
mostrarProductos(productos.limpieza, "limpieza");
mostrarProductos(productos.nuecesMani, "maniNueces");
mostrarProductos(productos.suministrosCafeteria, "suministrosCafeteria");
mostrarProductos(productos.barismo, "barismo");
mostrarProductos(productos.nuecesMani, "maniNueces");
mostrarProductos(productos.especiesDelMundo, "especiesDelMundo");
mostrarProductos(productos.garapiñado, "garapiñado");


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
