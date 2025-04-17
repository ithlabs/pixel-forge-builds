
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export function FinanceLoadingSkeleton() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex space-x-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-md p-2">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border-b">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-9 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
