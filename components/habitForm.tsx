"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";
import { HabitState } from "@/lib/actions/habits";
import {
  ReactNode,
  useActionState,
  useEffect,
  useState
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader} from "@/components/ui/loader";
import {toast} from "sonner";
import type { Habit } from "@/lib/generated/prisma";

interface HabitFormProps {
  formId: string;
  action: (prevState: HabitState, formData: FormData) => Promise<HabitState>;
  onSuccessText?: string;
  habitData?: Habit | null;
  actionSlot: ReactNode;
  titleSlot: ReactNode;
  submitBtnLabel: string;
}

export default function HabitForm({
  formId,
  action,
  onSuccessText = "",
  habitData = null,
  actionSlot,
  titleSlot,
  submitBtnLabel,
}: HabitFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const initialState: HabitState = {message: null, errors: {}};
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (isOpen) {
      setTitle(habitData?.title || "")
    }
  }, [ isOpen, habitData ]);

  useEffect(() => {
    if (!!state.isSuccess) {
      setIsOpen(false);
      setTitle("");
      if (!!onSuccessText) {
        toast.success(onSuccessText)
      }
    }

  }, [state.isSuccess, onSuccessText]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {actionSlot}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{titleSlot}</DialogTitle>
          </DialogHeader>

          <form action={formAction} id={formId}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Название привычки</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Читать каждый день по 30 минут"
                  required
                  aria-describedby="title-error"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <div id="title-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.title &&
                    state.errors.title.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            {(!!habitData && "id" in habitData) && <Input
              id="habitId"
              name="habitId"
              type="hidden"
              readOnly={true}
              value={habitData.id}
            />}
          </form>
          {state.message && <div
            className="flex mt-3 space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <CircleAlert className="h-5 w-5 text-red-500"/>
            <p className="text-sm text-red-500">{state.message}</p>
          </div>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button
              type="submit"
              form={formId}
              disabled={isPending}
              aria-disabled={isPending}
            >
              {submitBtnLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isPending && <Loader/>}
    </>
  )
}
