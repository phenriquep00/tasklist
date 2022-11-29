import { useContext, useEffect, useRef, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import * as Dialog from "@radix-ui/react-dialog";
import { DeleteModal } from "../Modals/DeleteModal/DeleteModal";
import { DeleteModalButton } from "../Modals/DeleteModal/DeleteModalbutton";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { TaskContainerHeaderSearchBar } from "./TaskContainerHeaderSearchBar";

export function TaskContainerHeader() {
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const { height, width } = useWindowDimensions();
  const [title, setTitle] = useState<string>(tasklist);
  const tasklistRef = useRef<any>();

  const handleEditTaskistName= () => {
    //TODO: find the tasklist with the same name and change it
  };

  useEffect(() => {setTitle(tasklist)}, [tasklist]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleEditTaskistName();
    }
  };

  return (
    <div
      className={`flex w-11/12  ${
        height >= 700 && width >= 641 ? "flex-row" : "flex-col"
      } items-center justify-around gap-4`}
    >
      <h1 className="flex md:text-4xl text-2xl font-bold truncate border-2 p-2 rounded-md border-ctp-overlay0">
        {tasklist !== "" ? (
          <input className="bg-transparent text-center w-full text-ctp-text" onChange={(text) => setTitle(text.target.value)} value={title} type="text" name="" id="" />
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
