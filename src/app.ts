import ConfigureServer from "./ServerConfig/ConfigureServer";
const server = ConfigureServer();
import ENV from "./Helpers/Config/env";
import SinkErrorFor from "./ServerConfig/ErrorSink";
import HandleRoutesFor from "./ServerConfig/RouteHandlers";
import ConnectDependencies from "./ServerConfig/ConnectDependencies";

// Route Handling
HandleRoutesFor(server);

// Error Handling
SinkErrorFor(server);

//Listening
const PORT = ENV.primaryInfo.serverPort;
ConnectDependencies()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Node app running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
