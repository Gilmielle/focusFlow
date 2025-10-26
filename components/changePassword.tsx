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
import {changePassword, ChangePasswordState} from "@/lib/actions/register";
import {CircleAlert} from "lucide-react";
import {toast} from "sonner";
import {Loader} from "@/components/ui/loader";

export default function ChangePassword() {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordRepeat, setPasswordRepeat ] = useState("");
  const [ name, setName ] = useState("");

  const initialState: ChangePasswordState = { message: null, errors: {} };
  const [ state, formAction, isPending ] = useActionState(changePassword, initialState);

  useEffect(() => {
    if (!!state.isSuccess) {
      setIsOpen(false);
      setEmail("");
      setPassword("");
      setPasswordRepeat("");
      setName("");
      toast.success("Пароль успешно изменён.")
    }

  }, [ state.isSuccess ]);


  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            className="ml-auto inline-block text-sm transition-colors hover:text-(--primary) hover:cursor-pointer"
          >
            Забыли пароль?
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Восстановить пароль</DialogTitle>

            <form action={formAction} id="forgot-password-form">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="me@example.com"
                    required
                    autoComplete={"new-password"}
                    aria-describedby="email-error"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <div id="email-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.email &&
                      state.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Имя пользователя при регистрации</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Иванов Иван"
                    required
                    autoComplete={"new-password"}
                    aria-describedby="name-error"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <div id="name-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.name &&
                      state.errors.name.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Новый пароль</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete={"new-password"}
                    aria-describedby="password-error"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <div className="flex items-center">
                    <p className={"text-xs text-neutral-500"}>Минимальная длина пароля 6 символов</p>
                  </div>
                  <div id="password-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.password &&
                      state.errors.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="passwordRepeat">Повторите новый пароль</Label>
                  </div>
                  <Input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    required
                    autoComplete={"new-password"}
                    aria-describedby="passwordRepeat-error"
                    value={passwordRepeat}
                    onChange={e => setPasswordRepeat(e.target.value)}
                  />
                  <div id="passwordRepeat-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.passwordRepeat &&
                      state.errors.passwordRepeat.map((error: string) => (
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
              form={"forgot-password-form"}
              disabled={isPending}
              aria-disabled={isPending}
            >Сохранить новый пароль</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isPending && <Loader/>}
    </>
  );
}
