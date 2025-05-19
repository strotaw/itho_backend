import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5).maxLength(100),
        author: vine.string().trim().minLength(5).maxLength(100),
        category: vine.string().trim().minLength(5).maxLength(100),
        stock: vine.number(),
    })
)

export const updateBookValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5).maxLength(100).optional(),
        author: vine.string().trim().minLength(5).maxLength(100).optional(),
        category: vine.string().trim().minLength(5).maxLength(100).optional(),
        stock: vine.number().optional(),
    })
)

export const deleteBookValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number().positive(),
        }),
    })
)