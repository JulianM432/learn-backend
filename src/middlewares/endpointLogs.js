import { C as color } from "../functions/printBox.js";

const logRequest = (req, res, next) => {
  // Verificar si la variable de entorno LOG_REQUESTS está activada
  if (process.env.ENDPOINT_LOGS === "true") {
    // Obtener verbo y ruta, y la hora de ejecución
    const { method, originalUrl } = req;
    const start = Date.now();
    // Evento para cuando se haya completado la respuesta
    res.on("finish", () => {
      // Calcular la duración
      const duration = Date.now() - start;
      // Obtener el código de estado
      const status = res.statusCode;

      // Crear la salida con los colores
      const border = `${color.bCyan}|${color.reset}`;
      const dateStr = `${color.blue}${new Date().toISOString()}`;
      const methodStr = `${color.green}${method}`;
      const urlStr = `${color.cyan}${originalUrl}`;
      const statusStr = `${color.yellow}${status}`;
      const durationStr = `${color.magenta}${duration}ms${color.reset}`;

      // Imprimir la información con colores
      console.log(`${border} ${dateStr} ${border} ${methodStr} ${urlStr} ${statusStr} - ${durationStr}`);
    });
  }
  next();
};

export default logRequest;
