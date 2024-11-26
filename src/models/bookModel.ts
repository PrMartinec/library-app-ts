import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Book document
export interface IBook extends Document {
    title: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Create the schema for the Book model
const bookSchema: Schema = new mongoose.Schema<IBook>(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

// Export the model
const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;