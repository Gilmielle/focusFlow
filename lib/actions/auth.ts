import { signIn } from "next-auth/react";

const authenticateWithCredentials = async (prevState: string | undefined, formData: FormData) => {
  const callbackUrl = formData.get("callbackUrl") as string ?? "/dashboard";

  const res = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false,
  });

  if (!res || res?.error) {
    if (res?.error === "CredentialsSignin") {
      return "Неверный email или пароль"
    } else {
      return "Ошибка при входе. Попробуйте позже."
    }
  }

  window.location.href = callbackUrl;
}

const authenticateWithGithub = async (callbackUrl: string) => {
  await signIn("github", {
    callbackUrl: callbackUrl ?? "/dashboard",
  });
}


export {
  authenticateWithCredentials,
  authenticateWithGithub,
}
