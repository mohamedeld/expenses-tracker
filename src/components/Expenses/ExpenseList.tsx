import type { Expense } from '@/types';
import DeleteDialog from './DeleteDialog';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map(expense => (
        <div
          key={expense.id}
          className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
        >
          <div>
            <h3 className="font-medium text-gray-900">{expense.name}</h3>
            <div className="mt-1 text-sm text-gray-500">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {expense.category}
              </span>
              <span className="ml-2">
                {expense.date.toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-medium text-gray-900">
              ${expense.amount.toFixed(2)}
            </span>
            <DeleteDialog onDelete={() => onDelete(expense.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}