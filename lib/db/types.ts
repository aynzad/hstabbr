import { CategoriesOnWords, User, Word } from "@prisma/client"

export type SimpleWord = Omit<Word, 'createdAt' | 'updatedAt' | 'userId'> &
{
    categories: CategoriesOnWords[]
    user: Pick<User, 'id' | 'email' | 'name' | 'image'>
}

export type RawSimpleWord = Pick<Word, 'id' | 'abbreviation' | 'definition' | 'description'> &
{
    categories: string
}

export const simpleWordFields = {
    id: true,
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            image: true
        }
    },
    categories: true,
    abbreviation: true,
    definition: true,
    description: true,
    status: true,
    hit: true,
    ai: true
}