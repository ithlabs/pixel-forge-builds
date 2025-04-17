
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";

interface ExpensesChartsProps {
  expensesData: {
    month: string;
    materials: number;
    labor: number;
    equipment: number;
  }[];
  expensesByCategory: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function ExpensesCharts({ expensesData, expensesByCategory }: ExpensesChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Expenses Overview</CardTitle>
          <CardDescription>Monthly expenses breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expensesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="materials" name="Materials" fill="#1a365d" />
                <Bar dataKey="labor" name="Labor" fill="#ed8936" />
                <Bar dataKey="equipment" name="Equipment" fill="#ecc94b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>Year to date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
