import express = require('express');
import type { Request, Response } from 'express';
const app = express();
app.get('/', (req: Request, res: Response) => res.send('Hola TypeScript'));
app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
