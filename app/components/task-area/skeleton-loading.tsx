import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div>
      <div className="border rounded-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Task", "Title", "Status", "Priority", "Created At"].map(
                (header, idx) => (
                  <th key={idx} className="p-2 lg:p-5 text-left">
                    <Skeleton className="h-10 w-3/4 rounded-sm" />
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-t">
                {Array.from({ length: 5 }).map((_, colIdx) => (
                  <td key={colIdx} className="p-2 lg:p-5">
                    <Skeleton className="h-7 w-full rounded-sm" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
