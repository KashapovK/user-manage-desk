import type { UserFormData } from '../validation/user-schema';

export const AutocompleteValues = {
  NAME: 'name',
  USERNAME: 'username',
  EMAIL: 'email',
  CITY: 'address-level2',
  PHONE: 'tel',
  ORGANIZATION: 'organization',
} as const;

export type AutocompleteType =
  (typeof AutocompleteValues)[keyof typeof AutocompleteValues];

export type FieldDef = {
  id: keyof UserFormData;
  label: string;
  placeholder?: string;
  type?: string;
  autocomplete?: AutocompleteType;
};

export const fields: FieldDef[] = [
  {
    id: 'name',
    label: 'Имя',
    placeholder: 'Введите полное имя',
    autocomplete: AutocompleteValues.NAME,
  },
  {
    id: 'username',
    label: 'Никнейм',
    placeholder: 'Введите никнейм',
    autocomplete: AutocompleteValues.USERNAME,
  },
  {
    id: 'email',
    label: 'Почта',
    placeholder: 'Введите email',
    type: 'email',
    autocomplete: AutocompleteValues.EMAIL,
  },
  {
    id: 'city',
    label: 'Город',
    placeholder: 'Введите город',
    autocomplete: AutocompleteValues.CITY,
  },
  {
    id: 'phone',
    label: 'Телефон',
    placeholder: 'Введите телефон',
    autocomplete: AutocompleteValues.PHONE,
  },
  {
    id: 'companyName',
    label: 'Название компании',
    placeholder: 'Введите название компании',
    autocomplete: AutocompleteValues.ORGANIZATION,
  },
];
