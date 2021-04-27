import express from "express";
import mongoose from "mongoose";
import { logger } from "../logger";
import {constants} from '../types';

export async function connectDb(app: express.Application): Promise<void> {
	const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
	if (!mongoConnectionString) {
		const errorMessage = 'Mongo Connection String not defined. DB Connection failed';
		logger.error(errorMessage);
		throw Error(errorMessage);
	}
	try{
		await mongoose.connect(mongoConnectionString as string, { useNewUrlParser: true });
		logger.info('Connection to DB successful');
	} catch (error) {
		throw Error(`Error connecting to DB. ${JSON.stringify(error)}`);
	}

	mongoose.connection.on('error', err => {
		logger.warn('DB Error Occurred');
		throw Error(JSON.stringify(err));
	});
    
	mongoose.connection.on('disconnected', err => {
		logger.warn('DB disconnected');
		throw Error(JSON.stringify(err));
	});
	app.emit(constants.APP_READY);
}
