"use client";
// import {Metadata} from "next";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "@/components/ui/field";
import {Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import {BadgeCheckIcon, ChevronRightIcon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {toast} from "sonner";

// export const metadata: Metadata = {
//   title: "Components",
// };

export default function ComponentsPage() {

  return <>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h1>Components page</h1>
        </CardTitle>
        <CardDescription>
          <p>
            Временная (?) страница для добавления и стилизации компонентов
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h2 className={"text-base font-semibold mb-3"}>
          Card, Input, Checkbox, Label, Button
        </h2>
        <div className="mb-4">
          <Button onClick={() => toast.success("Пароль успешно изменён.")}>Вывести уведомление</Button>
        </div>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id={"checkbox-1"} onCheckedChange={(e) => console.debug(e)} />
                <Label htmlFor={"checkbox-1"}>Checkbox</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id={"checkbox-2"} variant={"secondary"} onCheckedChange={(e) => console.debug(e)} />
                <Label htmlFor={"checkbox-2"}>Checkbox</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id={"checkbox-3"} variant={"secondary"} disabled={true} onCheckedChange={(e) => console.debug(e)} />
                <Label htmlFor={"checkbox-3"}>Checkbox</Label>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="secondary" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h2>Fields</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>This appears on invoices and emails.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
              <FieldDescription>This appears on invoices and emails.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" autoComplete="off" aria-invalid />
              <FieldError>Choose another username.</FieldError>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="newsletter" />
              <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h2>Item</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-md flex-col gap-6">
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Basic Item</ItemTitle>
              <ItemDescription>
                A simple item with title and description.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline" size="sm" asChild>
            <a href="#">
              <ItemMedia>
                <BadgeCheckIcon className="size-5" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Your profile has been verified.</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        </div>
      </CardContent>
    </Card>

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <h2>Skeletons</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"grid gap-6"}>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
}
