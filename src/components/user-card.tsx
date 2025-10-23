import { Edit, Archive, EyeOff, ArchiveRestore } from "lucide-react"
import { useNavigate } from "react-router"
import { useUserStore } from "../store/store"
import type { UserWithStatus } from "../types/types"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface UserCardProps {
  user: UserWithStatus
}

export function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate()
  const updateUserStatus = useUserStore((state) => state.updateUserStatus)

  const handleEdit = () => {
    navigate(`/edit/${user.id}`)
  }

  const handleArchive = () => {
    updateUserStatus(user.id, "archived")
  }

  const handleUnarchive = () => {
    updateUserStatus(user.id, "active")
  }

  const handleHide = () => {
    updateUserStatus(user.id, "hidden")
  }

  return (
    <Card className="p-6 flex flex-col gap-4 bg-card border-border hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-semibold shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            user.username.slice(0, 2).toUpperCase()
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-card-foreground truncate">{user.username}</h3>
          <p className="text-sm text-muted-foreground truncate">{user.address.city}</p>
          <p className="text-sm text-muted-foreground truncate">{user.company.name}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="flex-1 gap-2 bg-transparent"
        >
          <Edit className="w-4 h-4" />
          Редактировать
        </Button>

        {user.status === "active" ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleArchive}
              className="gap-2 bg-transparent"
            >
              <Archive className="w-4 h-4" />
              Архив
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleHide}
              className="gap-2 bg-transparent"
            >
              <EyeOff className="w-4 h-4" />
              Скрыть
            </Button>
          </>
        ) : user.status === "archived" ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUnarchive}
            className="gap-2 bg-transparent"
          >
            <ArchiveRestore className="w-4 h-4" />
            Активировать
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
