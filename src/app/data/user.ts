export interface User {
  id: string;
  email: string;
  username: string;
  hashed_password: string;
  created_at: Date;
}

export type UserCreateInput = Omit<User, "id" | "email" | "created_at"> & {
  userEmail: string;
};

export type UserSignIn = Omit<User, "id" | "email" | "created_at">;
