import { MongoDBContainer } from '@testcontainers/mongodb';
import mongoose from 'mongoose';
import { expect } from 'chai';
import * as bookService from '../../src/services/bookService';
import Book from '../../src/models/bookModel';

describe('Book Service', () => {

    before(() => {
        // Start the MongoDB container
        new MongoDBContainer()
            .start()
            .then((value) => {
                // Connect mongoose to the Testcontainer's MongoDB
                mongoose.connect(value.getConnectionString());

                console.log('MongoDB Test Container started at:', value.getConnectionString());

                value.stop();
            });
    });

    after(() => {
        // Close the mongoose connection and stop the container
        mongoose.disconnect();
    });

    beforeEach(function () {
        // Clear the database before each test
        Book.deleteMany({});
    });

    it('should add a new book', function () {
        const title = 'Test Book';
        const description = 'This is a test book';

        bookService.addBook({ title, description })
            .then((book) => {
                expect(book).to.have.property('_id');
                expect(book.title).to.equal(title);
                expect(book.description).to.equal(description);
            });
    });

    it('should retrieve all books', function () {
        bookService.addBook({ title: 'Book 1', description: 'Description 1' });
        bookService.addBook({ title: 'Book 2', description: 'Description 2' });

        bookService.findAllBooks()
            .then((books) => {
                expect(books).to.have.lengthOf(2);
                expect(books.map((b) => b.title)).to.have.members(['Book 1', 'Book 2']);
            });
    });

    it('should not allow duplicate book titles', function () {
        const title = 'Duplicate Title';
        const description = 'Description';

        bookService.addBook({ title, description });

        bookService.addBook({ title, description: 'Another Description' })
            .then(() => { throw new Error('Expected duplicate title error'); })
            .catch((error) => {
                expect(error).to.have.property('message', 'Book title already exists');
            });
    });
});
