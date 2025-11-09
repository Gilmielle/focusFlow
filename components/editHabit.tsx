import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import HabitForm from "@/components/habitForm";
import { updateHabit } from "@/lib/actions/habits";
import { getCurrentUser } from "@/lib/utils";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

interface EditHabitProps {
  habitId: number;
}

export default async function EditHabit({
  habitId
}: EditHabitProps) {
  const formId = "edit-habit";
  const user: Session["user"] | null = await getCurrentUser();
  const habit = await prisma.habit.findUnique({
    where: {
      userId: user.id,
      id: habitId
    }
  });

  return <HabitForm
    formId={formId}
    action={updateHabit}
    habitData={habit}
    titleSlot={"Изменить привычку"}
    actionSlot={<Button
      size={"icon"}
      variant={"ghost"}
    >
      <Pencil />
    </Button>}
    submitBtnLabel={"Изменить"}
    onSuccessText={"Привычка успешно изменена!"}
  />
}
