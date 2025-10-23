import { useEffect } from "react"
import { CheckCircle2, X } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <Card
        className="bg-card p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-card-foreground mb-2">Успешно сохранено!</h3>
            <p className="text-muted-foreground">Изменения профиля пользователя были успешно сохранены</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
