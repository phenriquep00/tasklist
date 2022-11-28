import { useContext } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import * as Dialog from "@radix-ui/react-dialog";
import { DeleteModal } from "../Modals/DeleteModal/DeleteModal";
import { DeleteModalButton } from "../Modals/DeleteModal/DeleteModalbutton";

export function TaskContainerHeader() {
  const { tasklist, setTasklist } = useContext(TasklistContext);

  return (
    <div className="flex w-11/12  flex-row items-center justify-around gap-4 ">
      <h1 className="text-4xl font-bold">
        {tasklist !== "" ? tasklist : "PLEASE SELECT A TASKLIST"}
      </h1>

      {tasklist !== "" ? (
        <div className="flex flex-row flex-1 items-center gap-2">
          <div className="bg-ctp-surface2 flex flex-1 p-2 rounded hover:cursor-not-allowed">find a task [comming soon]</div>
          <Dialog.Root>
            <DeleteModal />
            <DeleteModalButton />
          </Dialog.Root>
        </div>
      ) : null}
    </div>
  );
}
