
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface MaterialFormProps {
  onSubmit: (data: any) => Promise<boolean>;
  isLoading: boolean;
  initialData?: any;
}

export function MaterialForm({ onSubmit, isLoading, initialData }: MaterialFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    unit: initialData?.unit || "",
    quantity: initialData?.quantity || 0,
    unitPrice: initialData?.unitPrice || "",
    criticalLevel: initialData?.criticalLevel || 0,
    supplier: initialData?.supplier || "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Set default critical level if not provided
      if (!formData.criticalLevel) {
        formData.criticalLevel = Math.floor(Number(formData.quantity) * 0.3);
      }
      
      const success = await onSubmit(formData);
      if (!success) {
        setSubmitting(false);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setSubmitting(false);
    }
  };

  const units = ["Bags", "Cubic Meters", "Tons", "Pieces", "Gallons", "Rolls", "Meters", "Kilograms"];
  const categories = ["Concrete", "Wood", "Metal", "Electrical", "Plumbing", "Paint", "Tools", "Other"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Material Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter material name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unit</Label>
        <Select
          value={formData.unit}
          onValueChange={(value) => handleSelectChange("unit", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a unit" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantity">Initial Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="0"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter initial quantity"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unitPrice">Unit Price</Label>
        <Input
          id="unitPrice"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          placeholder="$0.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="criticalLevel">Critical Level</Label>
        <Input
          id="criticalLevel"
          name="criticalLevel"
          type="number"
          min="0"
          value={formData.criticalLevel}
          onChange={handleChange}
          placeholder="Enter critical level (or leave for auto-calculation)"
        />
        <p className="text-xs text-muted-foreground">
          If left empty, will be set to 30% of initial quantity
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier (Optional)</Label>
        <Input
          id="supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          placeholder="Enter supplier name"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={() => onSubmit({ cancelled: true })}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || submitting}>
          {isLoading || submitting ? "Saving..." : "Save Material"}
        </Button>
      </div>
    </form>
  );
}
