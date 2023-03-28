import { PrismaClient } from '@prisma/client'
import { type Prisma } from "@prisma/client";
import { categories } from '../data/categories';
import { emails } from '../data/emails'
import { words } from '../data/words';
import { generateWord } from '@lib/ai/chatGPT';

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


async function createWords() {
  let count = 0
  for (let index = 0; index < words.length; index++) {
    const word = words[index];

    const { abbreviation, definition, description } = await generateWord({ abbreviation: word.abbreviation, definition: word.definition })

    try {
      await prisma.word.create({
        data: {
          abbreviation,
          definition,
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
