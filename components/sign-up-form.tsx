"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CircleAlert} from "lucide-react";
import {useActionState, useEffect, useState} from "react";
import {register, RegisterState} from "@/lib/actions/register";
import {authenticateWithCredentials} from "@/lib/actions/auth";

export default function SignUpForm() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordRepeat, setPasswordRepeat ] = useState("");
  const [ name, setName ] = useState("");

  const initialState: RegisterState = { message: null, errors: {} };
  const [ state, formAction, isPending ] = useActionState(register, initialState);

  // TODO Loader

  useEffect(() => {
    if (!!state.isShouldRegister) {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("password", password);
      authenticateWithCredentials("credentials", fd).then((errorMsg) => {
        if (!!errorMsg) {
          // TODO constants
          window.location.href = "/login";
        }
      });
    }

  }, [ state.isShouldRegister ]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1>Регистрация</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          action={formAction}
          id={"sign-up-form"}
        >
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
              <Label htmlFor="name">Имя пользователя</Label>
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
                <Label htmlFor="password">Пароль</Label>
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
                <Label htmlFor="passwordRepeat">Повторите пароль</Label>
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
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
          form={"sign-up-form"}
        >
          Зарегистрироваться
        </Button>
        <p className="text-sm mt-4">
          У вас уже есть аккаунта? <Link className={"transition-colors text-(--primary) hover:text-(--secondary)"} href={"/login"}>Войти</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
