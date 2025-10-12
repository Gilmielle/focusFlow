"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1>Регистрация</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                required
                autoComplete={"new-password"}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                autoComplete={"new-password"}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password-repeat">Повторите пароль</Label>
              </div>
              <Input
                id="password-repeat"
                type="password-repeat"
                required
                autoComplete={"new-password"}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>
        <p className="text-sm mt-4">
          У вас уже есть аккаунта? <Link className={"transition-colors text-(--primary) hover:text-(--secondary)"} href={"/login"}>Войти</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
