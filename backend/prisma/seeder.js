// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');

const prisma = new PrismaClient();

function generateRandom11DigitNumber() {
  const min = 10000000000; // Smallest 11-digit number
  const max = 99999999999; // Largest 11-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
}

async function seedData() {
  try {
    await prisma.transactionHistory.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // Seed users
    const users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: generateRandom11DigitNumber(),
      });
    }

    prisma.user.createMany({
      data: users,
    });

    // Seed accounts and transaction history
    const allUsers = await prisma.user.findMany();

    const accounts = [];
    const transactionHistory = [];
    for (const user of allUsers) {
      const last10Digits = user.phoneNumber.slice(-10);
      console.log(last10Digits);
      accounts.push({
        accountNumber: parseInt(last10Digits),
        balance: faker.random.number({ min: 10000, max: 100000 }),
        userId: user.id,
      });

      for (let i = 0; i < 5; i++) {
        transactionHistory.push({
          accountId: user.id,
          type: faker.random.arrayElement([
            'DEPOSIT',
            'WITHDRAWAL',
            'TRANSFER_IN',
            'TRANSFER_OUT',
          ]),
          description: faker.lorem.sentence(),
          amount: faker.random.number({ min: 1000, max: 5000 }),
        });
      }
    }
    await prisma.account.createMany({ data: accounts });
    await prisma.transactionHistory.createMany({ data: transactionHistory });

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
