"use client";

import {signOut} from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react"

export function SignOutBtn() {
  return (
    <Button variant={"outline"} className={"w-full"} size={"lg"} onClick={async () => await signOut({ callbackUrl: "/" })}>
      <LogOut className="w-6" />
      <span>Выход</span>
    </Button>
  )
}
