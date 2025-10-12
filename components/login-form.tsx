"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1>Авторизация</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form>
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
                {/* TODO */}
                <a
                  href="#"
                  className="ml-auto inline-block text-sm transition-colors hover:text-(--primary)"
                >
                  Забыли пароль?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Войти
        </Button>
        <Button variant="secondary" className="w-full">
          Войти с помощью GitHub
        </Button>
        <p className="text-sm mt-4">
          У вас ещё нет аккаунта? <Link className={"transition-colors text-(--primary) hover:text-(--secondary)"} href={"/sign-up"}>Зарегистрироваться</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
