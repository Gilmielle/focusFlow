import { addNewHabit } from "@/lib/actions/habits";
import HabitForm from "@/components/habitForm";
import { Button } from "@/components/ui/button";

export default function AddHabit() {
  const formId = "add-new-habit";

  return <HabitForm
    formId={formId}
    action={addNewHabit}
    titleSlot={"Новая привычка"}
    actionSlot={<Button variant="secondary" size={"lg"}>Добавить привычку</Button>}
    submitBtnLabel={"Добавить"}
    onSuccessText={"Ура, привычка добавлена!"}
  />

}
