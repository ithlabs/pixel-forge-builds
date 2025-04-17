
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatCurrency, formatDate, formatStatusColor } from "@/lib/formatters";
import { Invoice } from "@/hooks/useFinance";

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3">Project</th>
                <th className="text-left p-3">Client</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Due Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr 
                  key={invoice.id}
                  className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                >
                  <td className="p-3">{invoice.project_name}</td>
                  <td className="p-3">{invoice.client}</td>
                  <td className="p-3 font-medium">{formatCurrency(invoice.amount)}</td>
                  <td className="p-3">{formatDate(invoice.due_date)}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      formatStatusColor(invoice.status)
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="sm">
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
