import * as Dialog from "@radix-ui/react-dialog";
import { FormEvent, useContext, useState } from "react";
import { TasklistContext } from "../../../hooks/TasklistContext";
import { UserContext } from "../../../hooks/UserContext";
import { supabase } from "../../../supabaseClient";
import { Loading } from "../../Loading/Loading";

export function NewTaskModal() {
  const [isLoading, setIsloading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { tasklist, setTasklist } = useContext(TasklistContext);
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

  // rewrite the json adding the new task data
  const rewriteTasklists = async (nameOfTheNewTasklist: string) => {
    const userTotalTasklists: any = await getCurrentUserTasklists();

    userTotalTasklists.push({
      name: nameOfTheNewTasklist,
      tasks: [
        {
          name: "first task",
          createdAt: new Date(),
          completed: false,
        },
      ],
    });
    // console.log(ModifyedTasklistWithNewlyCreatedTask);

    // recreate the json
    const newTasklistsJson: any[] = [];
    userTotalTasklists.map((tsklst: any) => {
      newTasklistsJson.push(tsklst);
    });

    return newTasklistsJson;
  };

  const handleCreateNewTasklist = async (event: FormEvent) => {
    setIsloading(true);
    event.preventDefault();

    var createValidator = true;

    const formData = new FormData(event.target as HTMLFormElement);
    const dataFromForm: any = Object.fromEntries(formData);

    const totalTasklists: any = await getCurrentUserTasklists();
    totalTasklists.map(async (tasklist: any) => {
      if (tasklist !== null && tasklist.name == dataFromForm.name) {
        alert("You already have a tasklist with this name");
        createValidator = false;
      }
    });

    if (createValidator) {
      const newUserTotalTasklists: any = await rewriteTasklists(
        dataFromForm.name
      );
      await supabase
        .from("user")
        .update({ tasklists: newUserTotalTasklists })
        .eq("email", data.email)
        .then(() => {
          console.log("tasks updated");
          alert("New tsaklist created");
          setTasklist(dataFromForm.name);
        });
    }

    setIsloading(false);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 z-20" />
      <Dialog.Content className="flex z-20 flex-col items-center justify-between text-ctp-text bg-ctp-crust rounded-xl fixed top-1/2 left-1/2 w-auto h-auto gap-6 p-4 translate-x-[-50%] translate-y-[-50%]">
        <Dialog.Title className="text-xl font-bold">
          Create new task
        </Dialog.Title>
        <Dialog.Description asChild>
          <form action="" onSubmit={handleCreateNewTasklist}>
            <div className="flex flex-row gap-2 items-center justify-center">
              <label
                className="text-ctp-text font-semibold text-lg"
                htmlFor="name"
              >
                tasklist name:{" "}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="p-2 rounded bg-ctp-surface2"
              />

              <button
                type="submit"
                className="flex items-center justify-center p-2 bg-ctp-green rounded font-medium text-ctp-crust hover:ring-2 ring-ctp-peach"
              >
                {isLoading ? <Loading active={isLoading} /> : "finish"}
              </button>
            </div>
          </form>
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
