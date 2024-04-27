interface User {
  id: string;
  email: string;
  fullName: string;
  is_active: boolean;
  roles: string[];
  created_at: Date;
}
