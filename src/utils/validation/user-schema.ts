import { email, object, string, type infer as zodInfer } from 'zod';

export const userSchema = object({
  name: string().min(2, 'Имя должно быть от 2 до 64 символов').max(64),
  username: string().min(2, 'Никнейм должен быть от 2 до 64 символов').max(64),
  email: email('Некорректный email'),
  city: string().min(2, 'Город должен быть от 2 до 64 символов').max(64),
  phone: string().regex(/^\d+$/, 'Телефон должен содержать только цифры'),
  companyName: string()
    .min(2, 'Название компании должно быть от 2 до 64 символов')
    .max(64),
});

export type UserFormData = zodInfer<typeof userSchema>;
