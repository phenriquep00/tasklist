import * as Dialog from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import { TasklistContext } from "../../../hooks/TasklistContext";
import { UserContext } from "../../../hooks/UserContext";
import { supabase } from "../../../supabaseClient";
import { DeleteModalConfirmButton } from "./DeleteModalConfirmButton";



export function DeleteModal() {
  const { tasklist, setTasklist } = useContext(TasklistContext);
  const { user, setUser } = useContext(UserContext);
  const data = JSON.parse(user);

  const [isLoading, setIsloading] = useState(false);


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

  const rewriteTasklistsForDeleteTasklist = async () => {
    const userTotalTasklists: any = await getCurrentUserTasklists();

    let tasklistToBeDeleted = Number();
    userTotalTasklists.map((tsklst: any) => {
      // find the tasklist that has the same name as the current tasklist
      if (tsklst !== null) {
        if (tsklst.name === tasklist) {
          // get the index of the tasklist
          tasklistToBeDeleted = userTotalTasklists.indexOf(tsklst);
        }
      }
    });
    delete userTotalTasklists[tasklistToBeDeleted];

    return userTotalTasklists;
  };

  const handleDeleteTasklist = async () => {
    setIsloading(true);

    const newUserTotalTasklists: any =
      await rewriteTasklistsForDeleteTasklist();
    await supabase
      .from("user")
      .update({ tasklists: newUserTotalTasklists })
      .eq("email", data.email)
      .then(() => {
        console.log("tasks updated");
      });
    setTasklist("");
    setIsloading(false);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80" />
      <Dialog.Content className="flex flex-col flex-1 max-h-auto max-w-auto items-center justify-between text-ctp-text bg-ctp-crust rounded-xl fixed top-1/2 left-1/2 w-1/2 h-1/2 p-4 translate-x-[-50%] translate-y-[-50%]">
        <Dialog.Title className="text-2xl text-ctp-text font-bold">
          <p>Delete tasklist {tasklist}?</p>
        </Dialog.Title>
        <Dialog.Description asChild>
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-lg">
              You are about to delete the tasklist{" "}
              <span className="text-ctp-sky font-bold">{tasklist}</span>{" "}
              permanently
            </span>

            <DeleteModalConfirmButton
              isLoading={isLoading}
              handleClick={handleDeleteTasklist}
            />
          </div>
        </Dialog.Description>
        <Dialog.Close asChild>
          <button className="p-2 bg-ctp-red rounded font-medium text-ctp-crust hover:ring-2 ring-ctp-peach">
            close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
