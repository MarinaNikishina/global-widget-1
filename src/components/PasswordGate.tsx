import { useState, type FormEvent, type ReactNode } from 'react'

const STORAGE_KEY = 'gw1-access'
const ACCESS_PASSWORD = 'ms123456'

type PasswordGateProps = {
  children: ReactNode
}

function isUnlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(isUnlocked)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (password === ACCESS_PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
      setUnlocked(true)
      setError(false)
      return
    }
    setError(true)
  }

  return (
    <div className="password-gate">
      <form className="password-gate__card" onSubmit={onSubmit}>
        <h1 className="password-gate__title">Глобальный виджет</h1>
        <p className="password-gate__hint">Введите пароль для просмотра прототипа</p>
        <input
          className="password-gate__input"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          autoFocus
        />
        {error ? <p className="password-gate__error">Неверный пароль</p> : null}
        <button className="password-gate__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}
