import { useContext, useEffect, useRef, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import * as Dialog from "@radix-ui/react-dialog";
import { DeleteModal } from "../Modals/DeleteModal/DeleteModal";
import { DeleteModalButton } from "../Modals/DeleteModal/DeleteModalbutton";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { TaskContainerHeaderSearchBar } from "./TaskContainerHeaderSearchBar";
import { supabase } from "../../supabaseClient";
import { UserContext } from "../../hooks/UserContext";

export function TaskContainerHeader() {
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const { height, width } = useWindowDimensions();
  const [title, setTitle] = useState<string>(tasklist);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsloading] = useState(false);
  const [forceUpdateTitle, setForceUpdateTitle] = useState(false);
  const data = JSON.parse(user);
  const tasklistRef = useRef<any>();

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

  // rewrite the json adding the new task data
  const rewriteTasklists = async (
    tasklistName: string,
    newTasklistName: string
  ) => {
    const userTotalTasklists: any = await getCurrentUserTasklists();

    userTotalTasklists.map(
      (tsklst: any, index: number) =>
        tsklst !== null &&
        tsklst.name === tasklistName &&
        (tsklst.name = newTasklistName)
    );

    // recreate the json
    const newTasklistsJson: any[] = [];
    userTotalTasklists.map((tsklst: any) => {
      newTasklistsJson.push(tsklst);
    });

    return newTasklistsJson;
  };

  const handleEditTaskistName = async () => {
    setIsloading(true);

    var createValidator = true;
    const totalTasklists: any = await getCurrentUserTasklists();
    totalTasklists.map(async (tasklist: any) => {
      if (tasklist !== null && tasklist.name == title) {
        alert("You already have a tasklist with this name");
        createValidator = false;
      }
    });
    if (createValidator) {
      const newUserTotalTasklists: any = await rewriteTasklists(
        tasklist,
        title
      );
      // update db
      await supabase
        .from("user")
        .update({ tasklists: newUserTotalTasklists })
        .eq("email", data.email)

      setTasklist(title);
    } else {
      setTitle(tasklist);
    }

    setIsloading(false);
  };

  useEffect(() => {
    setTitle(tasklist);
  }, [tasklist]);

  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleEditTaskistName();
      tasklistRef.current.blur();
    }
  };

  const handleBlur = () => {
    setTitle(tasklist)
  }

  return (
    <div
      className={`flex w-11/12  ${
        height >= 700 && width >= 641 ? "flex-row" : "flex-col"
      } items-center justify-around gap-4`}
    >
      <h1 className="flex md:text-4xl text-2xl font-bold truncate border-2 p-2 rounded-md border-ctp-overlay0">
        {tasklist !== "" ? (
          <input
            className="bg-transparent text-center w-full text-ctp-text"
            onChange={(text) => setTitle(text.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={title}
            type="text"
            name=""
            ref={tasklistRef}
            id=""
          />
        ) : (
          "PLEASE SELECT A TASKLIST"
        )}
      </h1>

      {tasklist !== "" ? (
        <div className="flex flex-row max-w items-center gap-2 truncate">
          <TaskContainerHeaderSearchBar />

          <Dialog.Root>
            <DeleteModal />
            <DeleteModalButton />
          </Dialog.Root>
        </div>
      ) : null}
    </div>
  );
}
