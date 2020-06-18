import { Actress as DBActress } from '@prisma/client';

export type ActressBase = Omit<Actress, 'movies'>;

export const transformActressBase = (actress: DBActress): ActressBase => ({
  id: actress.id,
  name: actress.name,
  aliases: actress.aliases ? JSON.parse(actress.aliases) : [],
  piercings: actress.piercings ? JSON.parse(actress.piercings) : [],
  measurements: JSON.parse(actress.measurements),
  tattoos: actress.tattoos ? JSON.parse(actress.tattoos) : [],
});
