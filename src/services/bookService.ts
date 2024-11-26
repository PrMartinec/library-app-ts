import { ValidationError } from '../exceptions/validationError';
import Book, { IBook } from '../models/bookModel';

// Type definition for the book creation request
interface BookRequest {
    title: string;
    description: string;
}

// Find all books
export const findAllBooks = async (): Promise<IBook[]> => {
    return await Book.find({});
};

// Add a new book
export const addBook = async (req: BookRequest): Promise<IBook> => {
    // Check if the title already exists
    const uniqueCheck = await Book.exists({ title: req.title });
    if (uniqueCheck) {
        throw new ValidationError('Title already exists!');
    }

    const newBook = new Book({
        title: req.title,
        description: req.description,
    });

    return await newBook.save();
};
