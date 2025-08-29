import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { invoices, customers as rawCustomers, revenue, users } from '../lib/placeholder-data';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

interface PostgresError {
  code: string;
  message: string;
}

async function createExtension() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  } catch (error) {
    if ((error as PostgresError).code === '23505') {
      console.log('Extension uuid-ossp already exists');
      return;
    }
    throw error;
  }
}

async function seedUsers() {
  await createExtension();

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedInvoices() {
  await createExtension();

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map(
      invoice => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await createExtension();

  // 先删除整个 customers 表
  await sql`DROP TABLE IF EXISTS customers`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    rawCustomers.map((customer) =>
      sql`
        INSERT INTO customers (id, name, email, image_url, address)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url}, ${customer.address})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      rev => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
    )
  );

  return insertedRevenue;
}

async function seedContacts() {

  await createExtension();
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;
  await Promise.all(
    rawCustomers.map(customer =>
      sql`
        INSERT INTO contacts (name, email, address, image_url)
        VALUES (${customer.name}, ${customer.email}, ${customer.address}, ${customer.image_url})
      `
    )
  );
}

export async function GET() {
  try {
    const result = await sql.begin(sql => [
      seedUsers(),
      seedCustomers(),
      seedInvoices(),
      seedRevenue(),
      seedContacts(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
