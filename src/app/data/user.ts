export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
}

export type UserCreateInput = Omit<User, "id" | "created_at">;
