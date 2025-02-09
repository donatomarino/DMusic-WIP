import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));

app.use(cors());

app.use(router);

const port = process.env.PORT || 5001;

app.listen(port,() => console.log(`Server running on port ${port}`));

// Exportamos en index.js
export default app;