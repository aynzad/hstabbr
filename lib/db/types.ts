import { CategoriesOnWords, Word } from "@prisma/client"

export type SimpleWord = Pick<Word, 'abbreviation' | 'definition'> &
{
    categories: CategoriesOnWords[]
}