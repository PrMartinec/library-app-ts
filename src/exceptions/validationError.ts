export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name; // Use `new.target` to get the correct class name
    }
}