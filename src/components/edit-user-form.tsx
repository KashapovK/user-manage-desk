import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useParams, useNavigate } from "react-router"
import { Save } from "lucide-react"
import { useUserStore } from "../store/store"
import type { UserWithStatus } from "../types/types"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"

const userSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  username: z.string().min(1, "Имя пользователя обязательно"),
  email: z.string().email("Некорректный email"),
  city: z.string().min(1, "Город обязателен"),
  phone: z.string().min(1, "Телефон обязателен"),
  companyName: z.string().min(1, "Название компании обязательно"),
})

type UserFormData = z.infer<typeof userSchema>

interface EditUserFormProps {
  user: UserWithStatus
}

export function EditUserForm({ user }: EditUserFormProps) {
  useParams<{ id: string} >()
  const navigate = useNavigate()
  const updateUser = useUserStore((state) => state.updateUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      phone: user.phone,
      companyName: user.company.name,
    },
  })

  const onSubmit = async (data: UserFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    updateUser(user.id, {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: {
        ...user.address,
        city: data.city,
      },
      company: {
        ...user.company,
        name: data.companyName,
      },
    })

    navigate("/?success=true")
  }

  return (
    <Card className="p-6 bg-card border-border">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-card-foreground">
            Полное имя
          </label>
          <Input
            id="name"
            {...register("name")}
            className="bg-background border-border text-foreground"
            placeholder="Введите полное имя"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-card-foreground">
            Имя пользователя
          </label>
          <Input
            id="username"
            {...register("username")}
            className="bg-background border-border text-foreground"
            placeholder="Введите имя пользователя"
          />
          {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-card-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-background border-border text-foreground"
            placeholder="Введите email"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-card-foreground">
            Город
          </label>
          <Input
            id="city"
            {...register("city")}
            className="bg-background border-border text-foreground"
            placeholder="Введите город"
          />
          {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-card-foreground">
            Телефон
          </label>
          <Input
            id="phone"
            {...register("phone")}
            className="bg-background border-border text-foreground"
            placeholder="Введите телефон"
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium text-card-foreground">
            Компания
          </label>
          <Input
            id="companyName"
            {...register("companyName")}
            className="bg-background border-border text-foreground"
            placeholder="Введите название компании"
          />
          {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isSubmitting} className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")} className="bg-transparent">
            Отмена
          </Button>
        </div>
      </form>
    </Card>
  )
}
