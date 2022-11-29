import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { supabase } from "../../supabaseClient";
import { Loading } from "../Loading/Loading";
import { CreateTaskInput } from "./CreateTaskInput";
import { Task } from "./Task";
import { TaskContainerHeader } from "./TaskContainerHeader";

interface TaskProps {
  name: string;
  createdAt: string;
}

interface TaskContainerProps {
  isSideBarOpen: boolean;
}

export function TaskContainer({ isSideBarOpen }: TaskContainerProps) {
  const { user, setUser } = useContext(UserContext);
  const { tasklist, setTasklist } = useContext(TasklistContext);

  const [tasks, setTasks] = useState<any>([]);
  const [isLoading, setIsloading] = useState(false);
  const data = JSON.parse(user);

  const { height, width } = useWindowDimensions();
  const isMobile = height >= 700 && width >= 641 ? false : true;

  const getCurrentTasklistData = async () => {
    let totalTasklists = [];
    let matchingTasklist = {};

    await supabase
      .from("user")
      .select("tasklists")
      .eq("email", data.email)
      .then(({ data }) => {
        //@ts-ignore
        totalTasklists = data[0].tasklists;
        totalTasklists.map((tsklst: any) =>
          tsklst !== null && tsklst.name == tasklist
            ? (matchingTasklist = tsklst.tasks)
            : null
        );
      });

    return matchingTasklist;
  };

  const getTasks = async () => {
    setIsloading(true);
    const currentTasklist = await getCurrentTasklistData();
    setTasks(currentTasklist);
    setIsloading(false);
  };

  useEffect(() => {
    getTasks();
  }, [tasklist]);

  // check if the side bar is open and the app is running on a mobile screen, if that's the case, it will render nothing
  // because of sidebar visibility
  // elsewise it will be rendered normally
  return isSideBarOpen && isMobile ? null : (
    <main className="flex flex-col w-3/4 h-screen items-center justify-between py-4">
      <TaskContainerHeader />
      <Loading active={isLoading} type="balls" size={60} />
      <div className="w-11/12 m-2 md:max-h-[80%] max-h-[70%] rounded-lg h-full flex p-2 flex-col gap-2 items-center overflow-y-scroll scrollbar border-2 border-ctp-overlay0">
        {tasklist !== "" ? (
          tasks.length > 0 && tasks !== undefined ? (
            tasks.map((task: TaskProps, index: any) =>
              task !== null ? (
                <Task
                  key={index}
                  name={task.name}
                  createdAt={task.createdAt}
                  forceTaskUpdate={getTasks}
                />
              ) : null
            )
          ) : (
            //TODO: fix this
            <p>All tasks on this list have been completed!</p>
          )
        ) : (
          <p className="text-2xl text-ctp-sky font-bold">
            Select a Tasklist
          </p>
        )}
      </div>

      <CreateTaskInput forceTaskUpdate={getTasks} />
    </main>
  );
}
