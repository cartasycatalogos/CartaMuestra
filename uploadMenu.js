// === Firebase Setup ===
const firebaseConfig = {
    apiKey: "AIzaSyCAIS5oSe-pwcVumx4wCYm46dtIEP-udTo",
    authDomain: "cartamuest.firebaseapp.com",
    projectId: "cartamuest",
    storageBucket: "cartamuest.firebasestorage.app",
    messagingSenderId: "888169747887",
    appId: "1:888169747887:web:ee88e06461568857110b5a",
    measurementId: "G-XHEFJC2WRL"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // === Subida de menú ===
  async function uploadMenu(menuData) {
    for (const item of menuData) {
      try {
        // Generamos un id único (si no existe en data.json)
        const id = item.id || item.title.replace(/\s+/g, "_").toLowerCase();
  
        await db.collection("menuItems").doc(id).set({
          ...item,
          id: id,
          likes: 0
        });
  
        console.log("✅ Subido:", item.title);
      } catch (err) {
        console.error("❌ Error subiendo:", item.title, err);
      }
    }
  }
  
  // Levanta data.json y sube al firestore
  fetch("data.json")
    .then(res => res.json())
    .then(data => uploadMenu(data.menu))
    .catch(console.error);
  