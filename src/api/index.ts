import usersGenerator from "./usersGenerator";
import { User } from "../types";

const delay = (time: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const users = usersGenerator(50);

export type Response = {
  users: User[];
  count: number;
};

export type Params = {
  page?: number;
  perPage?: number;
  name?: string;
  email?: string;
  city?: string;
  sort?: string;
};

export const loadUsers = async (params: Params): Promise<Response> => {
  const page: number = params.page || 1;
  const perPage: number = params.perPage || 10;

  const name = (params.name || "").toLowerCase();
  const email = (params.email || "").toLowerCase();
  const city = (params.city || "").toLowerCase();

  const { sort } = params;
  const desc = sort && sort[0] === "-";
  const sortParam = sort && (desc ? sort.substring(1, sort.length) : sort);

  const sortedUsers = sort
    ? users.sort((user1, user2) => {
        if (user1[sortParam] > user2[sortParam]) {
          return desc ? -1 : 1;
        }

        return desc ? 1 : -1;
      })
    : users;

  const filteredUsers = sortedUsers.filter(user => {
    if (name && !user.name.toLowerCase().includes(name)) {
      return false;
    }

    if (email && !user.email.toLowerCase().includes(email)) {
      return false;
    }

    if (city && !user.city.toLowerCase().includes(city)) {
      return false;
    }

    return true;
  });

  const offset = (page - 1) * perPage;

  await delay(2000);

  return {
    users: filteredUsers.slice(offset, offset + perPage),
    count: filteredUsers.length
  };
};
