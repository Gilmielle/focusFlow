"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useActionState} from "react";
import {authenticateWithCredentials} from "@/lib/actions/auth";
import { CircleAlert } from 'lucide-react';
import ChangePasswordDialog from "@/components/change-password-dialog";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"; // TODO constant ?

  const [ errorMsg, formAction, isPending ] = useActionState(authenticateWithCredentials, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1>Авторизация</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} id="login-form">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="me@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <ChangePasswordDialog />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
              />
            </div>
            <input type={"hidden"} name={"callbackUrl"} value={callbackUrl} />
          </div>
        </form>
        {errorMsg && <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <CircleAlert className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMsg}</p>
        </div>}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
          form={"login-form"}
        >
          Войти
        </Button>
        <Button variant="secondary" className="w-full" disabled={isPending} aria-disabled={isPending}>
          Войти с помощью GitHub
        </Button>
        <p className="text-sm mt-4">
          У вас ещё нет аккаунта? <Link className={"transition-colors text-(--primary) hover:text-(--secondary)"} href={"/sign-up"}>Зарегистрироваться</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
