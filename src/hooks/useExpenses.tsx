import { Expense } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const STORAGE_KEY = 'expenses';

const getStoredExpenses = (): Expense[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored, (key, value) => {
    if (key === 'date') return new Date(value);
    return value;
  }) : [];
};

const setStoredExpenses = (expenses: Expense[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const useExpenses = (category?: string) => {
  const queryClient = useQueryClient();

  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: getStoredExpenses,
    staleTime: Infinity
  });

  const filteredExpenses = category 
    ? expenses.filter(expense => expense.category === category)
    : expenses;

  const addExpense = useMutation({
    mutationFn: async (newExpense: Omit<Expense, 'id' | 'date'>) => {
      const expense: Expense = {
        ...newExpense,
        id: crypto.randomUUID(),
        date: new Date()
      };
      const updatedExpenses = [...expenses, expense];
      setStoredExpenses(updatedExpenses);
      return expense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    }
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      setStoredExpenses(updatedExpenses);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    }
  });

  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    expenses: filteredExpenses,
    total,
    addExpense,
    deleteExpense
  };
};