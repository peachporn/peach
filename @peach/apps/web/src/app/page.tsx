import { PrismaClient } from "db";

const client = new PrismaClient();

const Page = async () => {
  const actresses = await client.actress.findMany();

  return (
    <main className="bg-pink-300">
      Hello Peach!
      {actresses.map((actress) => actress.name)}
    </main>
  );
};

export default Page;
