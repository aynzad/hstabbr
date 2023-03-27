import { CategoriesOnWords, Word } from "@prisma/client"

export type SimpleWord = Pick<Word, 'abbreviation' | 'definition'> &
{
    categories: CategoriesOnWords[]
}

export type RawSimpleWord = Pick<Word, 'abbreviation' | 'definition' | 'description'> &
{
    categories: string
}