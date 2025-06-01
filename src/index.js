import expressConfig from './config/express.js';
import socketConfig from './config/socket.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = expressConfig;
const server = app.listen(app.get('port'), () => {
  console.log("Running on http://localhost:" + app.get('port'));
});

// Initialize Socket.IO
socketConfig(server);