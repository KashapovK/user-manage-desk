import { useCallback, useRef, useState } from 'react';
import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import type { UserFormData } from '@/utils/validation/user-schema';
import { CrossIcon } from '@/components/ui/icons/cross-icon';
import clsx from 'clsx';
import styles from './form-field.module.scss';

interface FormFieldProps {
  id: keyof UserFormData;
  label: string;
  placeholder?: string;
  register: UseFormRegister<UserFormData>;
  watch: UseFormWatch<UserFormData>;
  setValue: UseFormSetValue<UserFormData>;
  error?: any;
  type?: string;
  autocomplete?: string;
  defaultValue?: string;
}

export function FormField({
  id,
  label,
  placeholder,
  register,
  watch,
  setValue,
  error,
  type = 'text',
  autocomplete,
  defaultValue = '',
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const initialValueRef = useRef(defaultValue);

  const currentValue = watch(id);
  const isChanged = currentValue !== initialValueRef.current;
  const shouldShowClear = isFocused && currentValue && currentValue.length > 0;

  const handleClear = useCallback(() => {
    setValue(id, '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue, id]);

  const { ref, ...rest } = register(id);

  const inputClasses = clsx(styles.input, isChanged && styles.inputChanged);

  return (
    <div className={styles.group}>
      <label htmlFor={String(id)}>{label}</label>

      <div className={styles.inputWrapper}>
        <input
          id={String(id)}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete}
          ref={ref}
          {...rest}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {shouldShowClear && (
          <button
            type="button"
            tabIndex={-1}
            className={styles.clear}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            aria-label="Очистить поле"
          >
            <CrossIcon className={styles.clearIcon} />
          </button>
        )}
      </div>

      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
}
