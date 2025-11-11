import { useLayoutEffect, useRef, useCallback } from 'react';

export function useDropdownPosition(isOpen: boolean) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  const updatePosition = useCallback(() => {
    if (isOpen && triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Вычисляем позицию относительно кнопки
      let left = 0;
      let top = triggerRect.height + 5; // Под кнопкой

      // Проверяем, выходит ли за правую границу viewport
      if (triggerRect.left + dropdownRect.width > viewportWidth - 10) {
        left = -dropdownRect.width + triggerRect.width; // Прижимаем к правому краю кнопки
      } else {
        left = -dropdownRect.width / 2 + triggerRect.width / 2; // Центрируем
      }

      // Проверяем, выходит ли за нижнюю границу viewport
      if (triggerRect.bottom + dropdownRect.height > viewportHeight - 10) {
        top = -dropdownRect.height - 5; // Показываем над кнопкой
      }

      dropdownRef.current.style.setProperty('--dropdown-left', `${left}px`);
      dropdownRef.current.style.setProperty('--dropdown-top', `${top}px`);
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();

      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isOpen, updatePosition]);

  return { triggerRef, dropdownRef };
}
