import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { EditUserForm } from "../components/edit-user-form"
import { useUserStore } from "../store/store"
import RequestSuspense from "../components/request-suspense"

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
      <div className="page page--centered">
        <div className="page__content">
          <h1 className="page__title">Пользователь не найден</h1>

          <button
            className="button button--primary"
            onClick={() => navigate("/")}
          >
            <span className="button__text">Вернуться назад</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <RequestSuspense pending={!user}>
      <div className="page page--edit">
        <div className="page__header">
          <button
            className="button button--ghost"
            onClick={() => navigate("/")}
          >
            <img
              src={"../assets/icons/Backarrow.svg"}
              alt="назад"
              className="button__icon"
              height={28}
              width={28}
            />
            <span className="button__text">Назад</span>
          </button>
          <div className="123">
            <h3 className="234">Данные профиля</h3>
          </div>

          <EditUserForm user={user} />
        </div>
      </div>
    </RequestSuspense>
  )
}
