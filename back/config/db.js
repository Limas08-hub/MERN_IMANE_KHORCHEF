const mongoose = require("mongoose");

const uri = () => process.env.MONGODB_URI || process.env.MONGODB_URL;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(uri());
    console.log("✅ Connecté à MongoDB Atlas");
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error.message);
    throw error;
  }
}

module.exports = connectDB;