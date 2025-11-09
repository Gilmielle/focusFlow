"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { routes } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/utils";

export interface HabitState {
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

const validateHabitData = (formData: FormData) => {
  return HabitFormSchema.safeParse({
    title: formData.get("title"),
  });
}

const addNewHabit = async (prevState: HabitState, formData: FormData) => {
  const validatedFields = validateHabitData(formData);

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

const updateHabit = async (prevState: HabitState, formData: FormData) => {
  const validatedFields = validateHabitData(formData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Есть ошибки заполнения формы. Не удалось изменить привычку.",
      isSuccess: false,
    }
  }

  const { title } = validatedFields.data;

  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Не удалось получить данные о текущем пользователе");
    }
    const habit = await prisma.habit.update({
      where: {
        userId: user.id,
        id: Number(formData.get("habitId"))
      },
      data: {
        title,
      }
    })

    if (!habit) {
      throw new Error("Не удалось изменить привычку");
    } else {
      revalidatePath(routes.dashboard);
      return {
        isSuccess: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Произошла ошибка при попытке изменить привычку.",
      isSuccess: false,
    }
  }
}

const removeHabit = async (id:  number) => {
  if (!!id) {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return {
          isSuccess: false,
          message: "Не удалось получить данные о текущем пользователе"
        }
      }

      await prisma.habit.delete({
        where: {
          userId: user.id,
          id: id,
        }
      });

      revalidatePath(routes.dashboard);
      return {
        isSuccess: true,
      };
    } catch (error) {
    console.error(error);
    return {
      message: "Произошла ошибка при попытке удалить привычку.",
      isSuccess: false,
    }
  }
  } else {
    return {
      isSuccess: false,
      message: "Не удалось удалить привычку - не передан id привычки."
    }
  }
}

export {
  addNewHabit,
  removeHabit,
  updateHabit,
}
