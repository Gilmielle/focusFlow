import {Metadata} from "next";
import LoginForm from "@/components/login-form";
import { Suspense } from "react";
import LoginFormSkeleton from "@/components/login-form.skeleton";
import { routes } from "@/lib/constants";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(routes.dashboard);
  }

  return <Suspense fallback={<LoginFormSkeleton />}>
    <LoginForm />
  </Suspense>
}
