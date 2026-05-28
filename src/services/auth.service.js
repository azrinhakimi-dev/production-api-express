import db from '#config/database';
import users from '#models/user.model';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createUser = async ({ name, email, password, role = 'user' }) => {
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser) throw new Error('Email already registered');
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const [newUser] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      role,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      created_at: users.created_at,
    });
  return newUser;
};

export const authenticateUser = async ({ email, password }) => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials')

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
}
