import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { EditUserForm } from "../components/edit-user-form"
import { Button } from "../components/ui/button"
import { useUserStore } from "../store/store"

export default function EditPage() {
  const params = useParams()
  const navigate = useNavigate()
  const userId = Number(params.id)
  const getUserById = useUserStore((state) => state.getUserById)
  const [user, setUser] = useState(getUserById(userId))

  useEffect(() => {
    const foundUser = getUserById(userId)
    setUser(foundUser)
  }, [userId, getUserById])

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Пользователь не найден</h1>
          <Button onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Вернуться назад
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к списку
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Редактирование пользователя</h1>
          <p className="text-muted-foreground">Обновите информацию о пользователе</p>
        </div>

        <EditUserForm user={user} />
      </div>
    </div>
  )
}
