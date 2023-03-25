import { PrismaClient } from '@prisma/client'
import { type Prisma } from "@prisma/client";
import { categories } from '../data/categories';
import { emails } from '../data/emails'
import { words } from '../data/words';

const prisma = new PrismaClient()

async function createUsers() {
  const data: Prisma.UserCreateInput[] = emails.map((email) => (
    {
      email,
      status: 'PENDING'
    }
  ))
  return await prisma.user.createMany({
    data,
    skipDuplicates: true
  })
}

async function createCategories() {
  const data: Prisma.CategoryCreateInput[] = categories.map((title) => (
    {
      id: title
    }
  ))
  return await prisma.category.createMany({
    data,
    skipDuplicates: true
  })
}


async function fetchWordDescription(abbreviation: string) {
  const { ChatGPTAPI } = await import('chatgpt')

  const chatGPT = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY as string
  })

  const response = await chatGPT.sendMessage(`write a description in maximum of 3 sentences about this abbreviation word: "${abbreviation}" try to be funny and sarcastic but keep the tune formal`)

  return response.text
}

async function createWords() {
  let count = 0
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const description = await fetchWordDescription(word.abbreviation);
    try {
      await prisma.word.create({
        data: {
          abbreviation: word.abbreviation,
          definition: word.definition,
          description,
          ai: true,
          categories: {
            create: word.categories.map(category => ({
              category: {
                connect: {
                  id: category
                }
              }
            }))
          },
          user: {
            connect: {
              email: emails[0]
            }
          }
        },
      })
      count += 1
    } catch (e) {
      console.log(e)
    }
  }

  return { count }
}

async function main() {
  const { count: userCount } = await createUsers()
  const { count: categoriesCount } = await createCategories()
  const { count: wordsCount } = await createWords()


  console.log({ userCount, categoriesCount, wordsCount })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
