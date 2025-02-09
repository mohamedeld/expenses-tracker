import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseFormData } from "@/types";
import { useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { ExpenseList } from "./ExpenseList";

function ExpenseTracker() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { expenses, total, addExpense, deleteExpense } = useExpenses(selectedCategory);

  const categories = ['All', 'Food', 'Transportation', 'Entertainment', 'Bills', 'Other'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Expense Tracker</h1>

          <ExpenseForm onSubmit={(data: ExpenseFormData) => addExpense.mutate(data)} />

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All' ? undefined : category)}
                    className={`rounded-full px-3 py-1 text-sm ${(category === 'All' && !selectedCategory) || category === selectedCategory
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                Total: ${total.toFixed(2)}
              </div>
            </div>

            <div className="mt-6">
              {expenses.length > 0 ? (
                <ExpenseList
                  expenses={expenses}
                  onDelete={(id) => deleteExpense.mutate(id)}
                />
              ) : (
                <p className="text-center text-gray-500">No expenses found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseTracker;