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
        { id: 1, nombre: "Bolsa Bobina 14x20 (Rollo)", imagen: "#" },
        { id: 2, nombre: "Bolsa Bobina 7x10 (Rollo)", imagen: "#" },
        { id: 3, nombre: "Bolsa Bobina 8x12 (Rollo)", imagen: "#" },
        { id: 4, nombre: "Bolsa Bobina 9x14 (Rollo)", imagen: "#" },
        { id: 5, nombre: "Bolsa de Papel # 1 (Caja)", imagen: "#" },
        { id: 6, nombre: "Bolsa de Papel # 1/2 (Caja)", imagen: "#" },
        { id: 7, nombre: "Bolsa de Papel # 2 (Caja)", imagen: "#" },
        { id: 8, nombre: "Bolsa de Papel # 4 (Caja)", imagen: "#" },
        { id: 9, nombre: "Bolsa de Papel # 5 (Caja)", imagen: "#" },
        { id: 10, nombre: "Bolsa de Papel # 8 (Caja)", imagen: "#" },
        { id: 11, nombre: "Bolsa Jardín Grande (Kilo)", imagen: "#" },
        { id: 12, nombre: "Bolsa Jardín Mediana (Kilo)", imagen: "#" },
        { id: 13, nombre: "Bolsa Manigueta Grande (Kilo)", imagen: "#" },
        { id: 14, nombre: "Bolsa Manigueta Jumbo (Kilo)", imagen: "#" },
        { id: 15, nombre: "Bolsa Manigueta Mediana (Kilo)", imagen: "#" },
        { id: 16, nombre: "Bolsa Manigueta Pequeña (Kilo)", imagen: "#" },
        { id: 17, nombre: "Bolsa para Café con cierre de 1 Kilo (Unidad)", imagen: "#" },
        { id: 18, nombre: "Bolsa para Café con cierre de 1/2 kilo (Unidad)", imagen: "#" },
        { id: 19, nombre: "Bolsa para Café con cierre de 1/4 kilo (Unidad)", imagen: "#" },
        { id: 20, nombre: "Bolsa para Café Metálica 1 kg (Unidad)", imagen: "#" },
        { id: 21, nombre: "Bolsa para Café Metálica 1/2 kilo (Unidad)", imagen: "#" },
        { id: 22, nombre: "Bolsa para Café Metálica 1/4 kilo (Unidad)", imagen: "#" },
        { id: 23, nombre: "Bolsa para Café Metálica 2.5 kg (Unidad)", imagen: "#" },
        { id: 24, nombre: "Bolsa polipropileno 4x6 (Paquete)", imagen: "#" },
        { id: 25, nombre: "Bolsa polipropileno 5x8 (Paquete)", imagen: "#" },
        { id: 26, nombre: "Bolsa polipropileno 6x10 (Paquete)", imagen: "#" },
        { id: 27, nombre: "Caja Churro grande (50 Unidades)", imagen: "#" },
        { id: 28, nombre: "Caja Churro pequeña (50 Unidades)", imagen: "#" },
        { id: 29, nombre: "Concha biodegradable de 3 divisiones (Unidad)", imagen: "#" },
        { id: 30, nombre: "Concha Biodegradable (Unidad)", imagen: "#" },
        { id: 31, nombre: "Cuchara Plástica (100 Unidades)", imagen: "#" },
        { id: 32, nombre: "Cuchillo Plástico (100 Unidades)", imagen: "#" },
        { id: 33, nombre: "Envase Chino Entero (Unidad)", imagen: "#" },
        { id: 34, nombre: "Etiqueta Caracolillo (Rollo)", imagen: "#" },
        { id: 35, nombre: "Etiqueta Orgánico (Rollo)", imagen: "#" },
        { id: 36, nombre: "Etiqueta Real (Rollo)", imagen: "#" },
        { id: 37, nombre: "Etiqueta Tarrazú (Rollo)", imagen: "#" },
        { id: 38, nombre: "Funda para Vaso #12 (Unidad)", imagen: "#" },
        { id: 39, nombre: "Funda para Vaso #8 (Unidad)", imagen: "#" },
        { id: 40, nombre: "Mallas para el cabello (100 Unidades)", imagen: "#" },
        { id: 41, nombre: "Pajilla para Batido (400 Unidades)", imagen: "#" },
        { id: 42, nombre: "Papel Encerado (Caja)", imagen: "#" },
        { id: 43, nombre: "Porta Vasos (50 Unidades)", imagen: "#" },
        { id: 44, nombre: "Removedor de Madera (1 000 Unidades)", imagen: "#" },
        { id: 45, nombre: "Rollo de Papel Aluminio (Caja)", imagen: "#" },
        { id: 46, nombre: "Rollo de Plástico Adhesivo (Caja)", imagen: "#" },
        { id: 47, nombre: "Rollo térmico de impresora (5 Unidades)", imagen: "#" },
        { id: 48, nombre: "Servilleta Interfoliada (30 Unidades)", imagen: "#" },
        { id: 49, nombre: "Servilletas (24 unidades)", imagen: "#" },
        { id: 50, nombre: "Tapa Domo (Unidad)", imagen: "#" },
        { id: 51, nombre: "Tapa de Vaso El Tostador #12 (Unidad)", imagen: "#" },
        { id: 52, nombre: "Tapa de Vaso El Tostador #8 (Unidad)", imagen: "#" },
        { id: 53, nombre: "Tapa Plana con Ranura (Unidad)", imagen: "#" },
        { id: 54, nombre: "Tenedor Paquete (100 Unidades)", imagen: "#" },
        { id: 55, nombre: "Vaso genérico #4 (Unidad)", imagen: "#" },
        { id: 56, nombre: "Vaso Térmico El Tostador #12 (Unidad)", imagen: "#" },
        { id: 57, nombre: "Vaso Térmico El Tostador #8 (Unidad)", imagen: "#" },
        { id: 58, nombre: "Vaso Transparente batidos (Unidad)", imagen: "#" }
    ],

    limpieza: [
        { id: 59, nombre: "Alámbrina (Unidad)", imagen: "#" },
        { id: 60, nombre: "Alcohol en gel (Unidad)", imagen: "#" },
        { id: 61, nombre: "Botella y atomizador (Unidad)", imagen: "#" },
        { id: 62, nombre: "Cepillo de Acero para Paninera (Unidad)", imagen: "#" },
        { id: 63, nombre: "Cloro (Galón)", imagen: "#" },
        { id: 64, nombre: "Desengrasante Limpiador Amarillo (Galón)", imagen: "#" },
        { id: 65, nombre: "Desengrasante para Hornos y Plancha (Galón)", imagen: "#" },
        { id: 66, nombre: "Desengrasante para Pisos (Galón)", imagen: "#" },
        { id: 67, nombre: "Desinfectante Rosado (Galón)", imagen: "#" },
        { id: 68, nombre: "Escoba (Unidad)", imagen: "#" },
        { id: 69, nombre: "Escoba pequeña (Unidad)", imagen: "#" },
        { id: 70, nombre: "Esponja Doble uso (Unidad)", imagen: "#" },
        { id: 71, nombre: "Esponja Verde (Unidad)", imagen: "#" },
        { id: 72, nombre: "Gancho de piso (Unidad)", imagen: "#" },
        { id: 73, nombre: "Guantes M (100 Unidades)", imagen: "#" },
        { id: 74, nombre: "Jabón de Manos (Unidad)", imagen: "#" },
        { id: 75, nombre: "Jabón en Polvo (Kilo)", imagen: "#" },
        { id: 76, nombre: "Jabón en Polvo para Máquina", imagen: "#" },
        { id: 77, nombre: "Jabón Lavaplatos (Galón)", imagen: "#" },
        { id: 78, nombre: "Jabón Lavaplatos Barra (Kilo)", imagen: "#" },
        { id: 79, nombre: "Jabón Punta Lanza (Unidad)", imagen: "#" },
        { id: 80, nombre: "Limpia vidrios (Galón)", imagen: "#" },
        { id: 81, nombre: "Limpiador de baños (Galón)", imagen: "#" },
        { id: 82, nombre: "Pala (Unidad)", imagen: "#" },
        { id: 83, nombre: "Paño Blanco (Unidad)", imagen: "#" },
        { id: 84, nombre: "Paño de Trapeador (Unidad)", imagen: "#" },
        { id: 85, nombre: "Paño Microfibra (Unidad)", imagen: "#" },
        { id: 86, nombre: "Piedra abrasiva (Unidad)", imagen: "#" },
        { id: 87, nombre: "Rollo de Papel Higiénico (Unidad)", imagen: "#" },
        { id: 88, nombre: "Rollo papel Toalla (Unidad)", imagen: "#" },
        { id: 89, nombre: "Saniador Pastilla (Unidad)", imagen: "#" }
    ],
    nuecesMani: [
        { id: 90, nombre: "Almendra Confitada (Kilo)", imagen: "#" },
        { id: 91, nombre: "Almendra fileteada Natural (Kilo)", imagen: "#" },
        { id: 92, nombre: "Almendra Salada (Kilo)", imagen: "#" },
        { id: 93, nombre: "Almendra Supreme (Kilo)", imagen: "#" },
        { id: 94, nombre: "Almendra Tostada (Kilo)", imagen: "#" },
        { id: 95, nombre: "Almendras Cubiertas de Chocolate (Kilo)", imagen: "#" },
        { id: 96, nombre: "Arándanos (Kilo)", imagen: "#" },
        { id: 97, nombre: "Avellana Blanqueada (Kilo)", imagen: "#" },
        { id: 98, nombre: "Banana Chips (Kilo)", imagen: "#" },
        { id: 99, nombre: "Botonetas (Kilo)", imagen: "#" },
        { id: 100, nombre: "Cacao 150gr (Unidad)", imagen: "#" },
        { id: 101, nombre: "Caja Higos Miel (25 Unidades)", imagen: "#" },
        { id: 102, nombre: "Chía (Kilo)", imagen: "#" },
        { id: 103, nombre: "Ciruela (Kilo)", imagen: "#" },
        { id: 104, nombre: "Coco Rallado (250 Gramos)", imagen: "#" },
        { id: 105, nombre: "Dátiles (360 Gramos)", imagen: "#" },
        { id: 106, nombre: "Garapiñado Caramelo (2.5 Kilos)", imagen: "#" },
        { id: 107, nombre: "Garapiñado Caramelo con Ajonjolí (2.5 Kilos)", imagen: "#" },
        { id: 108, nombre: "Garapiñado Rojo (5 Kilos)", imagen: "#" },
        { id: 109, nombre: "Granola con almendra (Kilo)", imagen: "#" },
        { id: 110, nombre: "Linaza Molida (250 Gramos)", imagen: "#" },
        { id: 111, nombre: "Linaza Pura (250 Gramos)", imagen: "#" },
        { id: 112, nombre: "Macadamia (Kilo)", imagen: "#" },
        { id: 113, nombre: "Maní 3 en 1 (2,5 Kilos)", imagen: "#" },
        { id: 114, nombre: "Maní 5 en 1 (2.5 Kilos)", imagen: "#" },
        { id: 115, nombre: "Maní Barbacoa (2.5 Kilos)", imagen: "#" },
        { id: 116, nombre: "Maní Cáscara (20 Kilos)", imagen: "#" },
        { id: 117, nombre: "Maní en polvo (250 gramos)", imagen: "#" },
        { id: 118, nombre: "Maní Japonés (Kilo)", imagen: "#" },
        { id: 119, nombre: "Maní Japonés con limón (Kilo)", imagen: "#" },
        { id: 120, nombre: "Maní Japonés con picante (Kilo)", imagen: "#" },
        { id: 121, nombre: "Maní mita y mita (2.5 Kilos)", imagen: "#" },
        { id: 122, nombre: "Maní Picado (250 Gramos)", imagen: "#" },
        { id: 123, nombre: "Maní Picante (2.5 Kilos)", imagen: "#" },
        { id: 124, nombre: "Maní Salado (2.5 Kilos)", imagen: "#" },
        { id: 125, nombre: "Maní Salado con limón (2.5 Kilos)", imagen: "#" },
        { id: 126, nombre: "Maní Salado con Pasas (2.5 Kilos)", imagen: "#" },
        { id: 127, nombre: "Maní Simple (2.5 Kilos)", imagen: "#" },
        { id: 128, nombre: "Maní Tostado (2.5 Kilos)", imagen: "#" },
        { id: 129, nombre: "Mantequilla de Maní Natural (Unidad)", imagen: "#" },
        { id: 130, nombre: "Marañón Salado (Kilo)", imagen: "#" },
        { id: 131, nombre: "Marañón Simple (Kilo)", imagen: "#" },
        { id: 132, nombre: "Marañón Tostado (Kilo)", imagen: "#" },
        { id: 133, nombre: "Mixta Tropical (2.5 Kilos)", imagen: "#" },
        { id: 134, nombre: "Nuez de Brasil (Kilo)", imagen: "#" },
        { id: 135, nombre: "Nuez de Nogal (Kilo)", imagen: "#" },
        { id: 136, nombre: "Nuez Pecana (Kilo)", imagen: "#" },
        { id: 137, nombre: "Pasas (Kilo)", imagen: "#" },
        { id: 138, nombre: "Pasas Cubiertas de Chocolate (Kilo)", imagen: "#" },
        { id: 139, nombre: "Pistacho con cáscara (Kilo)", imagen: "#" },
        { id: 140, nombre: "Semilla de Ajonjolí (250 gramos)", imagen: "#" },
        { id: 141, nombre: "Semilla de Calabaza (1 kilo)", imagen: "#" },
        { id: 142, nombre: "Semilla de girasol (250 gramos)", imagen: "#" },
        { id: 143, nombre: "Semilla Mixta (2.5 Kilos)", imagen: "#" },
        { id: 144, nombre: "Semilla mixta con garapiñado (2.5 Kilos)", imagen: "#" },
        { id: 145, nombre: "Semilla Mixta con Botonetas (2.5 Kilos)", imagen: "#" },
        { id: 146, nombre: "Semilla Mixta premium (2.5 Kilos)", imagen: "#" },
        { id: 147, nombre: "Semilla Mixta sin sal (2.5 Kilos)", imagen: "#" }
    ],

    suministrosCafeteria: [
        { id: 148, nombre: "Aderezo Ranch (Unidad)", imagen: "#" },
        { id: 149, nombre: "Azúcar Doña Maria (2 Kilos)", imagen: "#" },
        { id: 150, nombre: "Azúcar El Tostador (1 000 Unidades)", imagen: "#" },
        { id: 151, nombre: "Azúcar Morena (1 000 Unidades)", imagen: "#" },
        { id: 152, nombre: "Azúcar Refinada (Kilo)", imagen: "#" },
        { id: 153, nombre: "Base para Té Chai (Kilo)", imagen: "#" },
        { id: 154, nombre: "Caramelo Hersheys (Unidad)", imagen: "#" },
        { id: 155, nombre: "Cargadores de Chantilly (24 Unidades)", imagen: "#" },
        { id: 156, nombre: "Chantilly (4 Kilos)", imagen: "#" },
        { id: 157, nombre: "Dulce Granulado (450 Gramos)", imagen: "#" },
        { id: 158, nombre: "Dulce de Leche (5 Kilos)", imagen: "#" },
        { id: 159, nombre: "Licor de Café (Botella)", imagen: "#" },
        { id: 160, nombre: "Palillos de Dientes (1 000 Unidades)", imagen: "#" },
        { id: 161, nombre: "Palillos para Paninis (1 000 Unidades)", imagen: "#" },
        { id: 162, nombre: "Sirope de Avellana (Botella)", imagen: "#" },
        { id: 163, nombre: "Sirope de Caramelo (Botella)", imagen: "#" },
        { id: 164, nombre: "Sirope de Crema Irlandesa (Botella)", imagen: "#" },
        { id: 165, nombre: "Sirope de Menta (Botella)", imagen: "#" },
        { id: 166, nombre: "Sirope de Vainilla (Botella)", imagen: "#" },
        { id: 167, nombre: "Tabasco (Unidad)", imagen: "#" },
        { id: 168, nombre: "Té de menta Paquete", imagen: "#" },
        { id: 169, nombre: "Té Frío en Polvo Limón (Kilo)", imagen: "#" },
        { id: 170, nombre: "Té Manzanilla (100 Unidades)", imagen: "#" },
        { id: 171, nombre: "Té Negro (100 Unidades)", imagen: "#" },
        { id: 172, nombre: "Té Verde Paquete", imagen: "#" }
    ],
    cafe: [
        { id: 173, nombre: "Café Caracolillo (kilo)", imagen: "#" },
        { id: 174, nombre: "Café Estrella (kilo)", imagen: "#" },
        { id: 175, nombre: "Café Orgánico (kilo)", imagen: "#" },
        { id: 176, nombre: "Café Real (kilo)", imagen: "#" },
        { id: 177, nombre: "Café Tarrazu (kilo)", imagen: "#" }
    ],
    polvos: [
        { id: 178, nombre: "Bebida en Polvo de Cacao Dulce (250 Gramos)", imagen: "#" },
        { id: 179, nombre: "Bebida en Polvo de Crema (250 Gramos)", imagen: "#" },
        { id: 180, nombre: "Bebida en Polvo de Horchata (250 Gramos)", imagen: "#" },
        { id: 181, nombre: "Bebida en Polvo de Pinol (250 Gramos)", imagen: "#" },
        { id: 182, nombre: "Bebida en Polvo de Pinolillo (250 Gramos)", imagen: "#" },
        { id: 183, nombre: "Splenda (500 Unidades)", imagen: "#" }
    ],
    reposteria: [
        { id: 184, nombre: "Arreglado Base (Unidad)", imagen: "#" },
        { id: 185, nombre: "Arrollado (5 Unidades)", imagen: "#" },
        { id: 186, nombre: "Cangrejo (Unidad)", imagen: "#" },
        { id: 187, nombre: "Cheesecake Fresa (Porción)", imagen: "#" },
        { id: 188, nombre: "Chocomaní Blanco (10 Unidades)", imagen: "#" },
        { id: 189, nombre: "Chocomaní Oscuro (10 Unidades)", imagen: "#" },
        { id: 190, nombre: "Churro Palito (60 Unidades)", imagen: "#" },
        { id: 191, nombre: "Churro Precocido Hueco (25 Unidades)", imagen: "#" },
        { id: 192, nombre: "Empanada de Caprese (Unidad)", imagen: "#" },
        { id: 193, nombre: "Empanada de Carne (Unidad)", imagen: "#" },
        { id: 194, nombre: "Empanada de Pollo (Unidad)", imagen: "#" },
        { id: 195, nombre: "Empanada jamón y queso (Unidad)", imagen: "#" },
        { id: 196, nombre: "Enchilada De Papa (Unidad)", imagen: "#" },
        { id: 197, nombre: "Flauta Jamon y Queso (Unidad)", imagen: "#" },
        { id: 198, nombre: "Pie de Limon (Porción)", imagen: "#" },
        { id: 199, nombre: "Pie de Pecanas (Porción)", imagen: "#" },
        { id: 200, nombre: "Queque de Banano (Porción)", imagen: "#" },
        { id: 201, nombre: "Queque De Zanahoria Con Nuez (Porción)", imagen: "#" },
        { id: 202, nombre: "Queque Seco (Porción)", imagen: "#" },
        { id: 203, nombre: "Strudel Manzana (Porción)", imagen: "#" },
        { id: 204, nombre: "Tamales (2 Unidades)", imagen: "#" },
        { id: 205, nombre: "Tiramisú (Porción)", imagen: "#" },
        { id: 206, nombre: "Torta Churchill (Porción)", imagen: "#" },
        { id: 207, nombre: "Torta de Chocolate (Porción)", imagen: "#" },
        { id: 208, nombre: "Torta de Zanahoria Frio (Porción)", imagen: "#" }
    ],
    salsas: [
        { id: 209, nombre: "Barbacoa (3.5 Kilos)", imagen: "#" },
        { id: 210, nombre: "Bufalo (4 Kilos)", imagen: "#" },
        { id: 211, nombre: "Mayonesa (Galón)", imagen: "#" },
        { id: 212, nombre: "Mayonesa Sobres (250 Unidades)", imagen: "#" },
        { id: 213, nombre: "Mostaza miel (4 Kilos)", imagen: "#" },
        { id: 214, nombre: "Salsa china (Galón)", imagen: "#" },
        { id: 215, nombre: "Salsa de Tomate (Galón)", imagen: "#" },
        { id: 216, nombre: "Salsa de Tomate Sobrecitos (480 Unidades)", imagen: "#" },
        { id: 217, nombre: "Salsa especial (3.5 Kilos)", imagen: "#" }
    ],
    licores: [
        { id: 218, nombre: "Bavaria (Unidad)", imagen: "#" },
        { id: 219, nombre: "Coral (Sifón)", imagen: "#" },
        { id: 220, nombre: "Heineken (Unidad)", imagen: "#" },
        { id: 221, nombre: "Imperial (Sifón)", imagen: "#" },
        { id: 222, nombre: "Imperial (Unidad)", imagen: "#" },
        { id: 223, nombre: "Imperial Ultra (Unidad)", imagen: "#" },
        { id: 224, nombre: "Indomito (Sifón)", imagen: "#" },
        { id: 225, nombre: "Malacrianza (Sifón)", imagen: "#" },
        { id: 226, nombre: "Pilsen (Unidad)", imagen: "#" },
        { id: 227, nombre: "Segua (Sifón)", imagen: "#" },
        { id: 228, nombre: "Whisky (Botella)", imagen: "#" }
    ],
    proteinas: [
        { id: 229, nombre: "Alitas de pollo (Caja)", imagen: "#" },
        { id: 230, nombre: "Bistec (2 Kilos)", imagen: "#" },
        { id: 231, nombre: "Camarón (2.5 Kilos)", imagen: "#" },
        { id: 232, nombre: "Carne mechada (2 Kilos)", imagen: "#" },
        { id: 233, nombre: "Churrasco (1.5 Kilos)", imagen: "#" },
        { id: 234, nombre: "Dedos de pollo (Paquete)", imagen: "#" },
        { id: 235, nombre: "Mano de piedra Panini (Kilo)", imagen: "#" },
        { id: 236, nombre: "Pechuga de pollo (2 Kilos)", imagen: "#" },
        { id: 237, nombre: "Pescado (Caja 4.54 Kilos)", imagen: "#" },
        { id: 238, nombre: "Pollo mechado (2 Kilos)", imagen: "#" },
        { id: 239, nombre: "Salchichón (Kilo)", imagen: "#" },
        { id: 240, nombre: "Torta de carne 75 gramos (Unidad)", imagen: "#" }
    ],

    bebidas: [
        { id: 241, nombre: "Agua 600ml (Bulto 24 Unidades)", imagen: "#" },
        { id: 242, nombre: "Coca Cola Regular Vidrio (Unidad)", imagen: "#" },
        { id: 243, nombre: "Coca Cola Zero Vidrio (Unidad)", imagen: "#" },
        { id: 244, nombre: "Ginger Ale Vidrio (Unidad)", imagen: "#" },
        { id: 245, nombre: "Soda Canada Dry (Unidad)", imagen: "#" },
        { id: 246, nombre: "Tropical Blanco (Unidad)", imagen: "#" },
        { id: 247, nombre: "Tropical Limón (Unidad)", imagen: "#" },
        { id: 248, nombre: "Tropical Melocotón (Unidad)", imagen: "#" }
    ],

    frutas: [
        { id: 249, nombre: "Congelada Mix Frutas (Unidad)", imagen: "#" },
        { id: 250, nombre: "Congelada Mix Mango-Fresa (Unidad)", imagen: "#" },
        { id: 251, nombre: "Congelada Mix Piña-Fresa (Unidad)", imagen: "#" },
        { id: 252, nombre: "Congelado Cas (Unidad)", imagen: "#" },
        { id: 253, nombre: "Congelado Fresa (Unidad)", imagen: "#" },
        { id: 254, nombre: "Congelado Mango (Unidad)", imagen: "#" },
        { id: 255, nombre: "Congelado Mora (Unidad)", imagen: "#" },
        { id: 256, nombre: "Congelado Mora Fresa (Unidad)", imagen: "#" },
        { id: 257, nombre: "Congelado Papaya (Unidad)", imagen: "#" },
        { id: 258, nombre: "Congelado Piña (Unidad)", imagen: "#" },
        { id: 259, nombre: "Congelado Sandía (Unidad)", imagen: "#" },
        { id: 260, nombre: "Jugo de arándanos (Galón)", imagen: "#" },
        { id: 261, nombre: "Jugo de Limón (Galón)", imagen: "#" },
        { id: 262, nombre: "Jugo de Naranja (2.2 Litros)", imagen: "#" },
        { id: 263, nombre: "Pulpa de Cas (Galón)", imagen: "#" },
        { id: 264, nombre: "Pulpa de Fresa (Galón)", imagen: "#" },
        { id: 265, nombre: "Pulpa de Frutas (Galón)", imagen: "#" },
        { id: 266, nombre: "Pulpa de Guayaba (Galón)", imagen: "#" },
        { id: 267, nombre: "Pulpa de Mango (Galón)", imagen: "#" },
        { id: 268, nombre: "Pulpa de Maracuyá (Galón)", imagen: "#" },
        { id: 269, nombre: "Pulpa de Piña Colada (Galón)", imagen: "#" },
        { id: 270, nombre: "Pulpa de Piña con arroz (Galón)", imagen: "#" },
        { id: 271, nombre: "Pulpa de Tamarindo (Galón)", imagen: "#" }
    ],
    lacteos: [
        { id: 272, nombre: "Helado de Vainilla (5.3 Kilos)", imagen: "#" },
        { id: 273, nombre: "Leche de Almendra (Unidad)", imagen: "#" },
        { id: 274, nombre: "Leche Deslactosada (Unidad)", imagen: "#" },
        { id: 275, nombre: "Leche Entera (Unidad)", imagen: "#" },
        { id: 276, nombre: "Leche en polvo (Kilo)", imagen: "#" },
        { id: 277, nombre: "Numar suave Caja (1 360 Gramos)", imagen: "#" },
        { id: 278, nombre: "Queso Amarillo Rebanadas", imagen: "#" },
        { id: 279, nombre: "Queso Mozarella Rebanado (Kilo)", imagen: "#" },
        { id: 280, nombre: "Queso rallado (2.27 Kilos)", imagen: "#" },
        { id: 281, nombre: "Queso Turrialba (Kilo)", imagen: "#" }
    ],
    otrasMateriasPrimas: [
        { id: 282, nombre: "Aceite Clover (17 litros)", imagen: "#" },
        { id: 283, nombre: "Aceite de oliva (5 litros)", imagen: "#" },
        { id: 284, nombre: "Aceite Dorofrit (17 Litros)", imagen: "#" },
        { id: 285, nombre: "Aceite en Spray (Unidad)", imagen: "#" },
        { id: 286, nombre: "Aceitunas (Tarro)", imagen: "#" },
        { id: 287, nombre: "Bulto de arroz (12 Unidades)", imagen: "#" },
        { id: 288, nombre: "Cerezas (Tarro)", imagen: "#" },
        { id: 289, nombre: "Consomé de pollo (Kilo)", imagen: "#" },
        { id: 290, nombre: "Crema de coco (425 Gramos)", imagen: "#" },
        { id: 291, nombre: "Crema de mariscos (Unidad)", imagen: "#" },
        { id: 292, nombre: "Frijoles (15 kilos)", imagen: "#" },
        { id: 293, nombre: "Harina (25 Kilos)", imagen: "#" },
        { id: 294, nombre: "Huevos (Unidad)", imagen: "#" },
        { id: 295, nombre: "Lasaña de carne (6 Unidades)", imagen: "#" },
        { id: 296, nombre: "Lasaña de pollo (6 Unidades)", imagen: "#" },
        { id: 297, nombre: "Leche de coco (355 Gramos)", imagen: "#" },
        { id: 298, nombre: "Lechuga (500 Gramos)", imagen: "#" },
        { id: 299, nombre: "Lizano (Galón)", imagen: "#" },
        { id: 300, nombre: "Maíz dulce (Lata)", imagen: "#" },
        { id: 301, nombre: "Masa (20 Kilos)", imagen: "#" },
        { id: 302, nombre: "Panko (11.33 Kilos)", imagen: "#" },
        { id: 303, nombre: "Papa a la Francesa (2.5 Kilos)", imagen: "#" },
        { id: 304, nombre: "Papas en Gajos (2.5 Kilos)", imagen: "#" },
        { id: 305, nombre: "Paprika (Kilo)", imagen: "#" },
        { id: 306, nombre: "Patacones (6 Unidades)", imagen: "#" },
        { id: 307, nombre: "Pepinillos (Tarro)", imagen: "#" },
        { id: 308, nombre: "Sal (Kilo)", imagen: "#" },
        { id: 309, nombre: "Sazón completo (Kilo)", imagen: "#" },
        { id: 310, nombre: "Sazonador de costilla (Kilo)", imagen: "#" },
        { id: 311, nombre: "Tortilla Amarilla (10 Unidades)", imagen: "#" },
        { id: 312, nombre: "Tortilla de harina Paquete", imagen: "#" },
        { id: 313, nombre: "Tortilla para nacho Paquete", imagen: "#" },
        { id: 314, nombre: "Vinagre Balsámico (500 ml)", imagen: "#" },
        { id: 315, nombre: "Vinagre blanco (Galón)", imagen: "#" }
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
mostrarProductos(productos.cafe, "cafe");
mostrarProductos(productos.polvos, "polvos");
mostrarProductos(productos.reposteria, "reposteria");
mostrarProductos(productos.salsas, "salsas");
mostrarProductos(productos.licores, "licores");
mostrarProductos(productos.proteinas, "proteinas");
mostrarProductos(productos.bebidas, "bebidas");
mostrarProductos(productos.frutas, "frutas");
mostrarProductos(productos.lacteos, "lacteos");
mostrarProductos(productos.otrasMateriasPrimas, "otrasMateriasPrimas");


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
// PROCESAR PEDIDO
// =============================
document.getElementById("formPedido").addEventListener("submit", async e => {
    e.preventDefault();

    const btnProcesar = document.getElementById("btnProcesar");

    // Evitar doble clic
    if (btnProcesar.disabled) return;

    // Bloquear botón y cambiar texto
    btnProcesar.disabled = true;
    btnProcesar.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Procesando...`;

    // 🔴 VALIDACIONES (IMPORTANTE: reactivar botón si falla)
    if (carrito.length === 0) {
        btnProcesar.disabled = false;
        btnProcesar.textContent = "Procesar Pedido";
        return Swal.fire({ icon: 'error', title: 'Carrito vacío', text: 'Debe agregar productos.' });
    }

    const local = document.getElementById("local").value;
    const encargado = document.getElementById("encargado").value.trim();

    if (!local || !encargado) {
        btnProcesar.disabled = false;
        btnProcesar.textContent = "Procesar Pedido";
        return Swal.fire({ icon: 'warning', title: 'Faltan datos', text: 'Complete todos los campos.' });
    }

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

        // 🔴 Reactivar botón si falla
        btnProcesar.disabled = false;
        btnProcesar.textContent = "Procesar Pedido";

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

// ============================
// BUSCADOR DE PRODUCTOS
// ============================

const buscador = document.getElementById("buscadorProductos");

buscador.addEventListener("input", function () {

    const texto = buscador.value.toLowerCase();
    const productos = document.querySelectorAll(".card");
    const categorias = document.querySelectorAll(".accordion-collapse");

    // 🔹 Si el buscador está vacío
    if (texto === "") {

        productos.forEach(card => {
            card.parentElement.style.display = "";
        });

        // cerrar todas las categorías
        categorias.forEach(cat => {
            const instancia = bootstrap.Collapse.getOrCreateInstance(cat);
            instancia.hide();
        });

        return;
    }

    // 🔹 Buscar productos
    productos.forEach(card => {

        const nombreProducto = card.querySelector("h6").textContent.toLowerCase();
        const categoria = card.closest(".accordion-collapse");

        if (nombreProducto.includes(texto)) {

            card.parentElement.style.display = "";

            // abrir categoría
            if (categoria && !categoria.classList.contains("show")) {
                new bootstrap.Collapse(categoria, { toggle: true });
            }

        } else {

            card.parentElement.style.display = "none";

        }

    });

});