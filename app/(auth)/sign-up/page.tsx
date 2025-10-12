import {Metadata} from "next";
import {Suspense} from "react";
import SignUpForm from "@/components/sign-up-form";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function SignUpPage() {
  // TODO skeleton ?
  return <Suspense>
    <SignUpForm />
  </Suspense>
}
