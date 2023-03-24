import dotenv from 'dotenv';
import cors from 'cors';
const dev = dotenv.config();
const production = 'production';

const conditionalExport = process.env.NODE_ENV == 'production' ? production : { dev, cors };
export default conditionalExport;
