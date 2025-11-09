export interface DBUser {
  id: number;
  name: string;
  email: string;
  password: string;
  photoURL: string | null;
  role: string;
}