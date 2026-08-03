import PasswordGate from './components/PasswordGate'
import CustomerOrderPage from './pages/CustomerOrderPage'

export default function App() {
  return (
    <PasswordGate>
      <CustomerOrderPage />
    </PasswordGate>
  )
}
