"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/utils";

export interface AddNewHabitState {
  errors?: {
    title?: string[];
  };
  message?: string | null;
  isSuccess?: boolean;
}

const HabitFormSchema = z
  .object({
    title: z.string()
      .min(2, { error: "Название привычки должно содержать минимум 2 символа" })
      .max(100, { error: "Название привычки должно содержать не более 100 символов" }),
  });

const addNewHabit = async (prevState: AddNewHabitState, formData: FormData) => {
  const validatedFields = HabitFormSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Есть ошибки заполнения формы. Не удалось добавить новую привычку.",
      isSuccess: false,
    }
  }

  const { title } = validatedFields.data;

  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Не удалось получить данные о текущем пользователе");
    }
    const habit = await prisma.habit.create({
      data: {
        title,
        userId: user.id,
      }
    })

    if (!habit) {
      throw new Error("Не удалось создать привычку");
    } else {
      revalidatePath(routes.dashboard);
      return {
        isSuccess: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Произошла ошибка при попытке добавить новую привычку.",
      isSuccess: false,
    }
  }
}

export {
  addNewHabit,
}
