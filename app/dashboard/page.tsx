import {Metadata} from "next";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {getCurrentUser} from "@/lib/utils";
import AddHabit from "@/components/addHabit";
import prisma from "@/lib/prisma";
import RemoveHabit from "@/components/removeHabit";
import EditHabit from "@/components/editHabit";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const habits = await prisma.habit.findMany({
    where: {
      userId: user.id,
    }
  })

  return <>
    <Card className="w-full max-w-7xl">
      <CardHeader>
        <div className="flex flex-row gap-4 items-center">
          <SidebarTrigger />
          <div>
            <CardTitle>
              <h1 className={"md:text-3xl text-xl"}>Привет{(!!user && !!user.name) && <>, {user.name}</> }!</h1>
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <h2 className={"md:text-xl text-lg font-semibold mb-3"}>
          Твои привычки:
        </h2>
        <div className="mb-4">
          {!!habits.length ? <>
            <p>Табличка с привычками:</p>
            <ul>
              {habits.map((habit) => {
                return <li key={habit.id} className={"flex items-center gap-4"}>
                  <span>{habit.title}</span>
                  <div className={"flex items-center gap-1"} role={"list"}>
                    <EditHabit habitId={habit.id} />
                    <RemoveHabit habitId={habit.id} />
                  </div>
                </li>
              })}
            </ul>
          </>: <p>Пока здесь пусто :С</p>}
        </div>
        <AddHabit />
      </CardContent>

      {/*<CardFooter className="flex-col gap-2">

      </CardFooter>*/}
    </Card>
  </>
}
