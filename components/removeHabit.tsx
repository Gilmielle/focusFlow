"use client";

import { Button } from "@/components/ui/button";
import { removeHabit } from "@/lib/actions/habits";
import { toast } from "sonner";
import { useState } from "react";
import { X } from "lucide-react";

interface RemoveHabitBtnProps {
  habitId: number;
}

export default function RemoveHabit({
  habitId,
}: RemoveHabitBtnProps) {
  const [ isLoading, setIsLoading ] = useState(false);

  const handleRemoveHabit = async () => {
    setIsLoading(true);
    const { isSuccess, message } = await removeHabit(habitId)

    if (isSuccess) {
      toast.success("Привычка успешно удалена")
    } else {
      toast.error(message)
    }

    setIsLoading(false);
  }

  return <Button
    onClick={handleRemoveHabit}
    size={"icon"}
    variant={"ghost"}
    disabled={isLoading}
  >
    <X />
  </Button>
}
