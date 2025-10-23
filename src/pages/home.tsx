import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { fetchUsers } from "../lib/api"
import { SuccessToast } from "../components/success-toast"
import { UserCard } from "../components/user-card"
import { useUserStore } from "../store/store"

export default function HomePage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  const { users: storeUsers, setUsers } = useUserStore()

  useEffect(() => {
    if (users && storeUsers.length === 0) {
      const usersWithStatus = users.slice(0, 6).map((user) => ({
        ...user,
        status: "active" as const,
      }))
      setUsers(usersWithStatus)
    }
  }, [users, storeUsers.length, setUsers])

  const activeUsers = storeUsers.filter((user) => user.status === "active")
  const archivedUsers = storeUsers.filter((user) => user.status === "archived")

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground text-lg">Загрузка пользователей...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SuccessToast />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Управление пользователями</h1>
          <p className="text-muted-foreground text-lg">Управляйте командой и организуйте рабочее пространство</p>
        </header>

        {activeUsers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Активные пользователи</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </section>
        )}

        {archivedUsers.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Архив</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </section>
        )}

        {activeUsers.length === 0 && archivedUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Нет пользователей для отображения</p>
          </div>
        )}
      </div>
    </div>
  )
}
