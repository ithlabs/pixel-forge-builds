
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, Plus, ArrowUpDown } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface Payment {
  id: string;
  date: string;
  amount: number;
  type: string;
  recipient: string;
  status: string;
}

interface PaymentsCardProps {
  onAddPayment: () => void;
  payments?: Payment[];
}

export function PaymentsCard({ onAddPayment, payments = [] }: PaymentsCardProps) {
  // Sample payments for demonstration
  const demoPayments: Payment[] = [
    {
      id: "pay-001",
      date: "2023-03-15",
      amount: 25000,
      type: "Supplier Payment",
      recipient: "Addis Building Materials",
      status: "Completed"
    },
    {
      id: "pay-002",
      date: "2023-03-10",
      amount: 18500,
      type: "Contractor Payment",
      recipient: "Highland Construction Services",
      status: "Completed"
    },
    {
      id: "pay-003",
      date: "2023-03-05",
      amount: 12750,
      type: "Equipment Rental",
      recipient: "Ethiopian Equipment Rentals",
      status: "Completed"
    }
  ];

  // Use provided payments or demo payments if empty
  const displayPayments = payments.length > 0 ? payments : demoPayments;

  if (displayPayments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>Manage payment records and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 border rounded-md bg-muted/20">
            <div className="text-center">
              <CircleDollarSign className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-2 font-medium">No payment records yet</h3>
              <p className="text-sm text-muted-foreground">Add a payment record to get started</p>
              <Button 
                className="mt-4"
                onClick={onAddPayment}
              >
                Add Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payments</CardTitle>
          <CardDescription>Recent payment transactions</CardDescription>
        </div>
        <Button 
          onClick={onAddPayment}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Payment
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Recipient</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayPayments.map((payment, i) => (
                <tr 
                  key={payment.id}
                  className={`border-t ${i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                >
                  <td className="p-3">{formatDate(payment.date)}</td>
                  <td className="p-3">{payment.recipient}</td>
                  <td className="p-3">{payment.type}</td>
                  <td className="p-3 font-medium">{formatCurrency(payment.amount)}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
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
