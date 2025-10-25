import {Spinner} from "@/components/ui/spinner";

export function Loader() {
  return (
    <div className={"fixed inset-0 z-10 cursor-wait bg-zinc-500/25 flex items-center justify-center"}>
      <Spinner className={"size-16 text-(--color-accent-primary)"} />
    </div>
  )
}
