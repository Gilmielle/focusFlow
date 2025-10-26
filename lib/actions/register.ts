"use server";

import {z} from "zod";
import bcrypt from 'bcrypt';
import prisma from "@/lib/prisma";
import {Prisma} from "@/lib/generated/prisma";

export interface RegisterState {
  errors?: {
    email?: string[];
    password?: string[];
    passwordRepeat?: string[];
    name?: string[];
  };
  message?: string | null;
  isShouldRegister?: boolean;
}

const RegisterFormSchema = z
  .object({
    email: z.email({ error: "Неверно введён email" }),
    password: z.string().min(6, { error: "Пароль должен быть не короче 6 символов" }),
    passwordRepeat: z.string(),
    name: z.string().min(2, { error: "Имя должно содержать минимум 2 символа" }).max(100, { error: "Имя должно содержать не более 100 символов" }),
  })
  .refine((data) => {
    return data.password === data.passwordRepeat;
  }, {
    error: "Пароли не совпадают",
    path: ["passwordRepeat"]
  })

const validateUserData = (formData: FormData) => {
  return RegisterFormSchema
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      passwordRepeat: formData.get("passwordRepeat"),
      name: formData.get("name"),
    });
}

const register = async (prevState: RegisterState, formData: FormData) => {
  const parsedUserData = validateUserData(formData);

  if (!parsedUserData.success) {
    return {
      errors: z.flattenError(parsedUserData.error).fieldErrors,
      message: "Есть ошибки заполнения формы. Не удалось зарегистрироваться."
    }
  }

  const { name, email, password } = parsedUserData.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      message: "Пользователь с таким email уже зарегистрирован.",
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    if(!!user) {
      return {
        isShouldRegister: true,
      }
    } else {
      throw new Error("Не удалось создать нового пользователя");
    }
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { message: "Такой email уже используется." }
    }

    return {
      message: "Произошла ошибка при попытке зарегистрировать нового пользователя.",
    }
  }
}

export type ChangePasswordState = Omit<RegisterState, "isShouldRegister"> & {
  isSuccess?: boolean,
};

const changePassword = async (prevState: ChangePasswordState, formData: FormData) => {
  const parsedUserData = validateUserData(formData);

  if (!parsedUserData.success) {
    return {
      errors: z.flattenError(parsedUserData.error).fieldErrors,
      message: "Есть ошибки заполнения формы. Не удалось изменить пароль."
    }
  }

  const { name, email, password } = parsedUserData.data;

  const existingUser = await prisma.user.findUnique({
    where: { email, name },
  })

  if (!existingUser) {
    return {
      message: "Пользователь с указанными email и именем пользователя не найден.",
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    if(!user) {
      throw new Error("Не удалось изменить пароль");
    } else {
      return {
        isSuccess: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Произошла ошибка при попытке изменить пароль.",
    }
  }
}

export {
  register,
  changePassword,
}
