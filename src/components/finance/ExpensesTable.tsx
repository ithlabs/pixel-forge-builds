
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Expense } from "@/hooks/useFinance";

interface ExpensesTableProps {
  expenses: Expense[];
  onViewExpense: (expense: Expense) => void;
}

export function ExpensesTable({ expenses, onViewExpense }: ExpensesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3">Project</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3"></th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 5).map((expense, index) => (
                <tr 
                  key={expense.id}
                  className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                >
                  <td className="p-3">{expense.project_name}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3 font-medium">{formatCurrency(expense.amount)}</td>
                  <td className="p-3">{formatDate(expense.date)}</td>
                  <td className="p-3">{expense.description}</td>
                  <td className="p-3 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewExpense(expense)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
