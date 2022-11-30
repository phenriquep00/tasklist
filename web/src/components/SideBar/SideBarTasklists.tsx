import axios from "axios";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import { supabase } from "../../supabaseClient";
import { Loading } from "../Loading/Loading";
import { SideBarTasklistsUniqueList } from "./SideBarTasklistsUniqueList";

interface SideBarTasklistsProps {
  email: string;
  isSideBarOpen: (arg0: boolean) => void;
  forceTasklistUpdate: boolean;
  setForceTasklistUpdate: (arg0: boolean) => void;
};

interface tasklistProps {
  name: string;
  color: string;
  tasks: [];
};

export function SideBarTasklists({
  email,
  isSideBarOpen,
  forceTasklistUpdate,
  setForceTasklistUpdate,
}: SideBarTasklistsProps) {
  const [tasklists, setTasklists] = useState([]);
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const [isLoading, setIsLoading] = useState(false);

  useHotkeys("ctrl + up", () => {
    swapTasklist('up')
  });

  useHotkeys("ctrl + down", () => {
    swapTasklist('down')
  });

  const getUserTasklists = async () => {
    setIsLoading(true);

    await supabase
      .from("user")
      .select("tasklists")
      .eq("email", email)
      .then(({ data }) => {
        //@ts-ignore
        let tasklistsFromDb = data[0].tasklists;
        setTasklists(tasklistsFromDb);
      });
    setIsLoading(false);
  };

  const getNumberOfTasks = (tasklistName: string) => {
    let n: number = 0;
    tasklists.map((tsk: any) => {
      if (tsk !== null && tsk.name == tasklistName) {
        tsk.tasks.map((task: any) => {
          if (task !== null) {
            n++;
          }
        });
      }
    });

    return n;
  };

  const getCurrentTasklistIndex = (tasklistName:string) => {
    let n:number = 0;
    tasklists.map((tsk: any, index: number) => {
      if (tsk !== null && tsk.name === tasklistName) n = index;
    });
    return n;
  }

  const swapTasklist = (direction: string) => {
    let currentTasklsitIndex:number = getCurrentTasklistIndex(tasklist);

    if (direction === 'up') {
      console.log(currentTasklsitIndex);
    } else if (direction === 'down') {
      console.log('down')
    }
  };

  useEffect(() => {
    getUserTasklists();
    setForceTasklistUpdate(false);
  }, [tasklist, forceTasklistUpdate]);

  return (
    <div className="flex flex-col gap-2 w-11/12 h-2/3 border-2 items-center border-ctp-overlay0 rounded p-2 overflow-y-scroll scrollbar">
      <Loading active={isLoading} type="bars" />
      {tasklists.map(
        (tasklist: tasklistProps, index) =>
          tasklist !== null && (
            <SideBarTasklistsUniqueList
              key={index}
              name={tasklist.name}
              numberOfTasks={() => getNumberOfTasks(tasklist.name)}
              isSideBarOpen={isSideBarOpen}
            />
          )
      )}
    </div>
  );
};
