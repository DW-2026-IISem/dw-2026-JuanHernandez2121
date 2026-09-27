import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import morgan from 'morgan';

dotenv.config();

export class App {
	private readonly application: Express;
	private readonly port = Number(process.env.PORT ?? 3000);

	constructor() {
		this.application = express();
		this.application.use(cors());
		this.application.use(express.json());
		this.application.use(morgan('dev'));
		this.application.get('/health', (_request, response) => {
			response.json({ status: 'ok' });
		});
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.application.listen(this.port, () => {
				console.log(`Server listening on port ${this.port}`);
				resolve();
			});
		});
	}
}
