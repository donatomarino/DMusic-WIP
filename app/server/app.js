import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

app.use(cors());

app.use(router);

// Escuchar canciones desde local
app.use('/music', express.static(path.join(__dirname, 'music')));
app.use('/playlist', express.static(path.join(__dirname, 'playlist')));

const port = process.env.PORT || 5001;

app.listen(port,() => console.log(`Server running on port ${port}`));

export default app;