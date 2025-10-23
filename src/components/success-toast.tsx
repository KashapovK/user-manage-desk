import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router"
import { CheckCircle2, X } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"


export function SuccessToast() {
const [searchParams] = useSearchParams();
const navigate = useNavigate();
const success = searchParams.get("success");

  useEffect(() => {
    if (success === "true") {
      const timer = setTimeout(() => {
        navigate("/")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [success, navigate])

  if (success !== "true") return null

  const handleClose = () => {
    navigate("/")
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <Card className="p-4 bg-card border-border shadow-lg flex items-center gap-3 min-w-[320px]">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">Успешно сохранено</h3>
          <p className="text-sm text-muted-foreground">Изменения пользователя сохранены</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClose} className="shrink-0 h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </Card>
    </div>
  )
}
