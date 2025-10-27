import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormFieldProps } from '../../types/types';

export function FormField({
  id,
  label,
  placeholder,
  register,
  error,
  type = 'text',
  autocomplete,
}: FormFieldProps & { autocomplete?: string }) {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialValueRef = useRef<string>('');
  const initialCapturedRef = useRef<boolean>(false);

  const {
    ref: registerRef,
    onChange: registerOnChange,
    ...rest
  } = register(id);

  const combinedRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;

      if (typeof registerRef === 'function') {
        registerRef(el);
      } else if (registerRef && 'current' in registerRef) {
        // @ts-ignore
        registerRef.current = el;
      }

      if (el && !initialCapturedRef.current) {
        initialValueRef.current = el.defaultValue ?? el.value ?? '';
        setValue(el.value ?? el.defaultValue ?? '');
        initialCapturedRef.current = true;
      }
    },
    [registerRef],
  );

  useEffect(() => {
    if (!initialCapturedRef.current && inputRef.current) {
      initialValueRef.current =
        inputRef.current.defaultValue ?? inputRef.current.value ?? '';
      setValue(inputRef.current.value ?? inputRef.current.defaultValue ?? '');
      initialCapturedRef.current = true;
    }
  }, []);

  useEffect(() => {
    const onFocusIn = () => {
      setIsFocused(document.activeElement === inputRef.current);
    };
    const onFocusOut = () => {
      setIsFocused(false);
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (typeof registerOnChange === 'function') registerOnChange(e);
  };

  const handleClear = () => {
    const el = inputRef.current;
    if (!el) return;

    el.value = '';
    const evt = new Event('input', { bubbles: true });
    el.dispatchEvent(evt);

    setValue('');
    if (typeof registerOnChange === 'function') {
      const synthetic = {
        target: el,
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      registerOnChange(synthetic);
    }

    el.focus();
    setIsFocused(true);
  };

  const isChanged = value !== initialValueRef.current;
  const shouldShowClear = isFocused && value.length > 0;

  return (
    <div className="edit-user-form__group">
      <label htmlFor={id} className="edit-user-form__label">
        {label}
      </label>

      <div className="edit-user-form__input-wrapper">
        <input
          id={id}
          type={type}
          ref={combinedRef}
          value={value}
          onChange={handleChange}
          {...rest}
          className={`edit-user-form__input ${isChanged ? 'edit-user-form__input--changed' : ''}`}
          placeholder={placeholder}
          autoComplete={autocomplete}
        />

        {shouldShowClear && (
          <button
            type="button"
            tabIndex={-1}
            className="edit-user-form__clear"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            aria-label="Очистить поле"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0659 8.99469C16.3588 8.70179 16.3588 8.22692 16.0659 7.93403C15.773 7.64113 15.2981 7.64113 15.0052 7.93403L12 10.9392L8.99482 7.93403C8.70192 7.64113 8.22705 7.64113 7.93416 7.93403C7.64126 8.22692 7.64126 8.70179 7.93416 8.99469L10.9394 11.9999L7.93415 15.0051C7.64125 15.298 7.64125 15.7729 7.93415 16.0658C8.22704 16.3586 8.70191 16.3586 8.99481 16.0658L12 13.0605L15.0052 16.0658C15.2981 16.3586 15.773 16.3586 16.0659 16.0658C16.3588 15.7729 16.3588 15.298 16.0659 15.0051L13.0607 11.9999L16.0659 8.99469Z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>

      {error && <p className="edit-user-form__error">{error.message}</p>}
    </div>
  );
}
