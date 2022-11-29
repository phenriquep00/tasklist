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
import { TasklistContext } from "../../hooks/TasklistContext";
import { UserContext } from "../../hooks/UserContext";
import { supabase } from "../../supabaseClient";
import { Loading } from "../Loading/Loading";
import { SideBarTasklistsUniqueList } from "./SideBarTasklistsUniqueList";

interface SideBarTasklistsProps {
  email: string;
  isSideBarOpen: (arg0: boolean) => void;
}

interface tasklistProps {
  name: string;
  color: string;
  tasks: [];
}

export function SideBarTasklists({
  email,
  isSideBarOpen,
}: SideBarTasklistsProps) {
  const [tasklists, setTasklists] = useState([]);
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getUserTasklists();
  }, [tasklist]);

  return (
    <div className="flex flex-col gap-2 w-11/12 h-2/3 border-2 items-center border-ctp-overlay0 rounded p-2 overflow-y-scroll scrollbar">
      <Loading active={isLoading} type="bars" />
      {tasklists.map(
        (tasklist: tasklistProps, index) =>
          tasklist !== null && (
            <SideBarTasklistsUniqueList
              key={index}
              name={tasklist.name}
              isSideBarOpen={isSideBarOpen}
            />
          )
      )}
    </div>
  );
}
