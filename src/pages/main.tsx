import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../services/api"
import { useUserStore } from "../store/store"
import { UserCard } from "../components/user-card"
import RequestSuspense from "../components/request-suspense"

export default function MainPage() {
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

  const activeUsers = storeUsers.filter(u => u.status === "active")
  const archivedUsers = storeUsers.filter(u => u.status === "archived")

  return (
    <RequestSuspense pending={isLoading}>
      <div className="home-page">
        <div className="home-page__content">
          <h1 className="visually-hidden">Управление пользователями</h1>

          {activeUsers.length > 0 && (
            <section className="home-page__section">
              <h2 className="home-page__section-title">Активные</h2>
              <div className="home-page__grid">
                {activeUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </section>
          )}

          {archivedUsers.length > 0 && (
            <section className="home-page__section">
              <h2 className="home-page__section-title">Архив</h2>
              <div className="home-page__grid">
                {archivedUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </section>
          )}

          {activeUsers.length === 0 && archivedUsers.length === 0 && (
            <div className="home-page__empty">
              <p className="home-page__empty-text">Нет пользователей для отображения</p>
            </div>
          )}
        </div>
      </div>
    </RequestSuspense>
  )
}
