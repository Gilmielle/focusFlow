import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {FormFieldsSkeleton} from "@/components/ui/formFieldsSkeleton";

export default function SignUpFormSkeleton() {

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-[16px] w-[150px]" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <FormFieldsSkeleton lines={4} />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {Array.from({ length: 2 }).map((_, i) => {
          return <Skeleton className="h-[36px] w-full" key={i} />
        })}
      </CardFooter>
    </Card>
  )
}
