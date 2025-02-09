import { z } from 'zod';

export const expenseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  category: z.enum(['Food', 'Transportation', 'Entertainment', 'Bills', 'Other']),
  date: z.date()
});

export type Expense = z.infer<typeof expenseSchema>;

export const expenseFormSchema = expenseSchema.omit({ id: true, date: true });
export type ExpenseFormData = z.infer<typeof expenseFormSchema>;