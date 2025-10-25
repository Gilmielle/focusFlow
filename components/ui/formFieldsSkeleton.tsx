import {Skeleton} from "@/components/ui/skeleton";

export function FormFieldsSkeleton({ lines = 1 }: { lines: number }) {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: lines }).map((_, i) => {
        return <div className="grid gap-2" key={i}>
          <Skeleton className="h-[14px] w-[100px]" />
          <Skeleton className="h-[36px] w-full" />
        </div>
      })}
    </div>
  )
}
