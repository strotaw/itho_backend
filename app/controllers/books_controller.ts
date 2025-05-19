import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator, deleteBookValidator } from '#validators/create_book';

export default class BooksController {
    public async index({request, response }: HttpContext)
    {
        const books = await Book.all();
        return response.ok(books);
    }

    public async store({request, response }: HttpContext)
    { 
        const payload = await request.validateUsing(createBookValidator);
        const books = await Book.create(payload);
        return response.created({message: "Buku Berhasil Ditambah", books});
    }

    public async show({params, response }: HttpContext)
    {
        const books = await Book.find(params.id);
        if (!books) {
            return response.notFound({ message: 'Gada buku' });
        }
        return response.ok(books);
    }

    public async update({params, request, response }: HttpContext)
    {
        const data = await request.validateUsing(updateBookValidator);
        const books = await Book.find(params.id);
        if (!books) {
            return response.notFound({ message: 'Gada Cok' });
        }
        books.merge(data);
        await books.save();
        return response.ok({message: "Buku Berhasil Diperbarui",books});
    } 

    public async destroy({request, response }: HttpContext)
    {
        const {params} = await request.validateUsing(deleteBookValidator);
        const books = await Book.find(params.id);
        if (!books) {
            return response.notFound({ message: 'Gada Cok' });
        }
        await books.delete();
        return response.noContent();
    }
}

