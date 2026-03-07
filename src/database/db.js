import mongoose from "mongoose";

let remoteDB;

function attachListeners(conn, label) {
  conn.on("connected", () => {
    console.log(`Mongoose conectado a la base de datos ${label}`);
  });
  conn.on("error", (err) => {
    console.error(`Error de conexión de Mongoose (${label}):`, err.message);
  });
  conn.on("disconnected", () => {
    console.log(`Mongoose desconectado de la base de datos ${label}`);
  });
}

function ensureConnections() {
  if (!remoteDB) {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI no está definido");
    }
    remoteDB = mongoose.createConnection(mongoURI);
    attachListeners(remoteDB, "remota");
  }
}

export const getRemoteDB = () => {
  ensureConnections();
  return remoteDB;
};

const connectDB = async () => {
  try {
    ensureConnections();
    await Promise.all([
      new Promise((resolve, reject) => {
        remoteDB.once("connected", resolve);
        remoteDB.once("error", reject);
      }),
    ]);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
