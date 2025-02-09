import ExpenseTracker from "./components/Expenses/ExpenseTracker"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ExpenseTracker />
    </QueryClientProvider>
  )
}

export default App
