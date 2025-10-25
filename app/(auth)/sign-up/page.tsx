import { Metadata } from "next";
import { Suspense } from "react";
import SignUpForm from "@/components/sign-up-form";
import SignUpFormSkeleton from "@/components/sign-up-form.skeleton";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default async function SignUpPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(routes.dashboard);
  }

  return <Suspense fallback={<SignUpFormSkeleton />}>
    <SignUpForm />
  </Suspense>
}
