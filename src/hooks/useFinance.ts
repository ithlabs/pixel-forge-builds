
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/formatters";

export interface Expense {
  id: string;
  project_id: string;
  project_name: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  project_id: string;
  project_name: string;
  client: string;
  amount: number;
  due_date: string;
  status: "pending" | "paid" | "overdue";
  created_at: string;
}

export function useFinance() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Calculate total expenses by month for chart
  const expensesByMonth = expenses.reduce<Record<string, { materials: number; labor: number; equipment: number }>>((acc, expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = { materials: 0, labor: 0, equipment: 0 };
    }
    
    if (expense.category === "Materials") {
      acc[month].materials += expense.amount;
    } else if (expense.category === "Labor") {
      acc[month].labor += expense.amount;
    } else if (expense.category === "Equipment") {
      acc[month].equipment += expense.amount;
    }
    
    return acc;
  }, {});
  
  // Format data for charts
  const expensesData = Object.entries(expensesByMonth).map(([month, values]) => ({
    month,
    materials: values.materials,
    labor: values.labor,
    equipment: values.equipment
  }));
  
  // Calculate expenses by category
  const expenseCategories = ["Materials", "Labor", "Equipment", "Others"];
  const expensesByCategory = expenseCategories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: category,
      value: total,
      color: category === "Materials" ? "#1a365d" : 
             category === "Labor" ? "#ed8936" : 
             category === "Equipment" ? "#ecc94b" : "#4a5568"
    };
  });
  
  useEffect(() => {
    async function fetchFinanceData() {
      try {
        setLoading(true);
        
        // Try to get saved expenses and invoices from localStorage first
        const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        
        if (savedExpenses.length > 0 || savedInvoices.length > 0) {
          setExpenses(savedExpenses);
          setInvoices(savedInvoices);
          setLoading(false);
          return;
        }
        
        // If no saved data, fetch projects first to get project names
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('id, name');
          
        if (projectsError) {
          throw projectsError;
        }
        
        const projectMap = new Map(projectsData?.map(project => [project.id, project.name]) || []);
        
        // Create mock expenses based on projects (in a real app, you'd have an expenses table)
        const mockExpenses: Expense[] = [];
        const categories = ["Materials", "Labor", "Equipment", "Others"];
        const currentDate = new Date();
        
        projectsData?.forEach(project => {
          // Create 3-5 expenses for each project
          const numExpenses = Math.floor(Math.random() * 3) + 3;
          
          for (let i = 0; i < numExpenses; i++) {
            const daysAgo = Math.floor(Math.random() * 180); // Random date within last 6 months
            const expenseDate = new Date(currentDate);
            expenseDate.setDate(currentDate.getDate() - daysAgo);
            
            mockExpenses.push({
              id: `exp-${project.id}-${i}`,
              project_id: project.id,
              project_name: project.name,
              category: categories[Math.floor(Math.random() * categories.length)],
              amount: Math.floor(Math.random() * 15000) + 1000,
              date: expenseDate.toISOString().split('T')[0],
              description: `${categories[Math.floor(Math.random() * categories.length)]} for ${project.name}`,
              created_at: expenseDate.toISOString()
            });
          }
        });
        
        // Create mock invoices based on projects
        const mockInvoices: Invoice[] = [];
        const statuses: ("pending" | "paid" | "overdue")[] = ["pending", "paid", "overdue"];
        
        projectsData?.forEach(project => {
          // Create 1-3 invoices for each project
          const numInvoices = Math.floor(Math.random() * 3) + 1;
          
          for (let i = 0; i < numInvoices; i++) {
            const daysAgo = Math.floor(Math.random() * 60); // Random date within last 2 months
            const invoiceDate = new Date(currentDate);
            invoiceDate.setDate(currentDate.getDate() - daysAgo);
            
            // Due date is typically 15-30 days after creation
            const dueDate = new Date(invoiceDate);
            dueDate.setDate(invoiceDate.getDate() + Math.floor(Math.random() * 15) + 15);
            
            mockInvoices.push({
              id: `inv-${project.id}-${i}`,
              project_id: project.id,
              project_name: project.name,
              client: project.name.includes("Heights") ? "Addis Development Corp" :
                     project.name.includes("Mekelle") ? "Tigray Business Group" :
                     project.name.includes("Hawassa") ? "Southern Tourism Ltd" :
                     project.name.includes("Bridge") ? "Ethiopian Roads Authority" :
                     "Client Company",
              amount: Math.floor(Math.random() * 200000) + 100000,
              due_date: dueDate.toISOString().split('T')[0],
              status: statuses[Math.floor(Math.random() * statuses.length)],
              created_at: invoiceDate.toISOString()
            });
          }
        });
        
        // Sort by date (most recent first)
        mockExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        mockInvoices.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        // Save to localStorage
        localStorage.setItem('expenses', JSON.stringify(mockExpenses));
        localStorage.setItem('invoices', JSON.stringify(mockInvoices));
        
        setExpenses(mockExpenses);
        setInvoices(mockInvoices);
      } catch (err: any) {
        setError(err);
        toast({
          title: "Error fetching finance data",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchFinanceData();
  }, []);
  
  // Function to refresh data (useful after adding new transactions)
  const refreshData = () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    setExpenses(savedExpenses);
    setInvoices(savedInvoices);
  };
  
  return { 
    expenses, 
    invoices, 
    expensesData, 
    expensesByCategory,
    loading, 
    error,
    refreshData
  };
}
