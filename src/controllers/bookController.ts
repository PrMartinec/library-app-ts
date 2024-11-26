import { Request, Response } from 'express';
import { ValidationError } from '../exceptions/validationError';
import * as bookService from '../services/bookService';
import logger from '../utils/loggerUtil';

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    logger.trace('Calling getBooks.');
    try {
        const books = await bookService.findAllBooks();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: (error as Error).message });
    }
};

export const addBook = async (req: Request, res: Response): Promise<void> => {
    logger.trace('Calling addBook.');
    try {
        logger.debug(req.body);
        const book = await bookService.addBook(req.body);
        res.status(200).json({ book });
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ message: 'Validation error!', error: error.message });
        } else {
            res.status(500).json({ message: 'Error adding book!', error: (error as Error).message });
        }
    }
};
