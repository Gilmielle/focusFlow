"use client";

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
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useActionState, useEffect, useState} from "react";
import {CircleAlert} from "lucide-react";
import {toast} from "sonner";
import {Loader} from "@/components/ui/loader";
import {addNewHabit, AddNewHabitState} from "@/lib/actions/habits";

export default function AddHabit() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ title, setTitle ] = useState("");

  const formId = "add-new-habit";

  const initialState: AddNewHabitState = { message: null, errors: {} };
  const [ state, formAction, isPending ] = useActionState(addNewHabit, initialState);

  useEffect(() => {
    if (!!state.isSuccess) {
      setIsOpen(false);
      setTitle("");
      toast.success("Ура, привычка добавлена!")
    }

  }, [ state.isSuccess ]);


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" size={"lg"}>
            Добавить привычку
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая привычка</DialogTitle>

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
            </form>
            {state.message && <div
              className="flex mt-3 space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <CircleAlert className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </div>}
          </DialogHeader>
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
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isPending && <Loader/>}
    </>
  );
}
