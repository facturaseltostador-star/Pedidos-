// =============================
// 🔹 Inicialización global de Firebase
// =============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg_NeKPKRGLQhpQ8DtLuyOpEAbYC2QV30",
  authDomain: "eltostadorpedidos.firebaseapp.com",
  projectId: "eltostadorpedidos",
  storageBucket: "eltostadorpedidos.appspot.com",
  messagingSenderId: "702441009047",
  appId: "1:702441009047:web:a37d9ee61b93113f9cded2",
};

// Inicializamos la app y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportamos Firestore de forma global
window.db = db;
console.log("🔥 Firebase conectado correctamente");
