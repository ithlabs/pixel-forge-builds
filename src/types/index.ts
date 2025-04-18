
export type UserProfile = {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'manager' | 'employee';
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  created_at?: string;
  updated_at?: string;
};
