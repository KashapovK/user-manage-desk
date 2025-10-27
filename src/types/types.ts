export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type UserStatus = 'active' | 'archived' | 'hidden';

export interface UserWithStatus extends User {
  status: UserStatus;
}

export interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  register: any;
  error?: any;
  type?: string;
}
