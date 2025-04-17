
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";

interface PaymentsCardProps {
  onAddPayment: () => void;
}

export function PaymentsCard({ onAddPayment }: PaymentsCardProps) {
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
