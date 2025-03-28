import app from "./app";
import startServer, { env } from "./Config/ServerConfig";

const port = env.PORT || 8088;

startServer()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Erro: " + error);
  });
