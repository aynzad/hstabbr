import { CategoriesOnWords, Word } from "@prisma/client"

export type SimpleWord = Pick<Word, 'id' | 'abbreviation' | 'definition'> &
{
    categories: CategoriesOnWords[]
}

export type RawSimpleWord = Pick<Word, 'id' | 'abbreviation' | 'definition' | 'description'> &
{
    categories: string
}