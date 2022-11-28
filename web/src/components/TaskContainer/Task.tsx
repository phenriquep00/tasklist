import { useContext, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import { supabase } from "../../supabaseClient";
import { Checkbox } from "./Checkbox";

interface TaskComponentProps {
  name: string;
  createdAt: string;
  forceTaskUpdate: () => void;
}

export function Task({ name, createdAt, forceTaskUpdate }: TaskComponentProps) {
  const taskId = String(name + createdAt);
  const [value, setValue] = useState<string>(name);
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const { user, setUser } = useContext(UserContext);
  const data = JSON.parse(user);

  //get all of the user's tasklists
  const getCurrentUserTasklists = async () => {
    let matchResult = "";

    await supabase
      .from("user")
      .select("tasklists")
      .eq("email", data.email)
      .then(({ data }) => {
        //@ts-ignore
        matchResult = data[0].tasklists;
      });

    return matchResult;
  };

  // get the current active tasklist data
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
            ? (matchingTasklist = tsklst)
            : null
        );
      });

    return matchingTasklist;
  };

  // rewrite the json adding the new task data
  const rewriteTasklists = async () => {
    const userTotalTasklists: any = await getCurrentUserTasklists();
    const currentActiveTasklist: any = await getCurrentTasklistData();

    let ModifyedTasklistWithNewlyCreatedTask: any = [];

    userTotalTasklists.map((tsklst: any) => {
      // find the tasklist that has the same name as the current tasklist
      if (tsklst !== null) {
        if (tsklst.name === currentActiveTasklist.name) {
          // if it is the same tasklist, loop through it's tasks
          tsklst.tasks.map((tsk: any) => {
            if (tsk !== null) {
              if (tsk.name === name && tsk.createdAt === createdAt) {
                // this task match the current task
                tsk.name = value;
              }
            }
          });

          ModifyedTasklistWithNewlyCreatedTask = tsklst;
        }
      }
    });
    // console.log(ModifyedTasklistWithNewlyCreatedTask);

    // recreate the json
    const newTasklistsJson: any[] = [];
    userTotalTasklists.map((tsklst: any) => {
      if (tsklst !== null) {
        if (tsklst.name === currentActiveTasklist.name) {
          newTasklistsJson.push(ModifyedTasklistWithNewlyCreatedTask);
        } else {
          newTasklistsJson.push(tsklst);
        }
      }
    });

    return newTasklistsJson;
  };

  const handleEditTaskName = async () => {
    // new data to return
    const newUserTotalTasklists: any = await rewriteTasklists();
    // console.log(newUserTotalTasklists);
    //post new task
    await supabase
      .from("user")
      .update({ tasklists: newUserTotalTasklists })
      .eq("email", data.email)
      .then(() => {
        console.log("tasks updated");
      });
    forceTaskUpdate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleEditTaskName();
    }
  };

  return (
    <div className="flex flex-row w-5/6 bg-ctp-surface2 text-ctp-text items-center justify-between p-1 rounded-md px-5 border-2 border-ctp-green overflow-x-clip">
      <div className="flex gap-4 items-center w-full">
        <Checkbox taskId={taskId} forceTaskUpdate={forceTaskUpdate} />
        <div className="truncate w-full">
          <input
            className="w-full bg-transparent resize-none font-semibold text-lg"
            onChange={(text) => setValue(text.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            value={value}
            name=""
            id=""
          />
          <p className="font-light text-sm">{createdAt}</p>
        </div>
      </div>
    </div>
  );
}
