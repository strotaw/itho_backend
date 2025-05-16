import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class BooksController {
    public async index({response }: HttpContext)
    {
        const books = await Book.all();
        return response.ok(books);
    }

    public async store({request, response }: HttpContext)
    { 
        const data = request.only(['title', 'author']);
        const book = await Book.create(data);
        return response.created(book);
    }

    public async show({params, response }: HttpContext)
    {
        const book = await Book.find(params.id);
        if (!book) {
            return response.notFound({ message: 'Gada Cok' });
        }
        return response.ok(book);
    }

    public async update({params, request, response }: HttpContext)
    {
        const book = await Book.find(params.id);
        if (!book) {
            return response.notFound({ message: 'Gada Cok' });
        }
        const data = request.only(['title', 'author']); 
        book.merge(data);
        await book.save();
        return response.ok(book);
    } 

    public async destroy({params, response }: HttpContext)
    {
        const book = await Book.find(params.id);
        if (!book) {
            return response.notFound({ message: 'Gada Cok' });
        }
        await book.delete();
        return response.noContent();
    }
}

