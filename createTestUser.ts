import { db } from './src/server/db/index';
import { users } from './src/server/db/schema';
import bcrypt from 'bcryptjs';

async function run() {
  const hashedPassword = await bcrypt.hash('a', 10);
  await db.insert(users).values({
    id: 'u_test_a',
    email: 'a',
    password: hashedPassword,
    name: 'Test Admin A',
    role: 'admin',
    createdAt: new Date(),
  });
  console.log('Test user "a" / "a" created successfully.');
}

run().catch(err => {
  console.error('Error creating user:', err);
});
