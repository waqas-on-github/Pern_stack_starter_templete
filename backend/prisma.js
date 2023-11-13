import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient()

process.on('beforeExit', async () => {
    console.log('Closing Prisma client...');
    await Prisma.$disconnect();
    console.log('Prisma client closed.');
  });


  export default Prisma