import {getXataClient} from "./xata";

const xata = getXataClient();

export async function createMentor({ id }) {
  return await xata.db.mentors.create({
    user: id,
  });
}