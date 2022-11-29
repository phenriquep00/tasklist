import * as Dialog from "@radix-ui/react-dialog";
import { Trash } from "phosphor-react";

export function DeleteModalButton() {
  return (
    <Dialog.Trigger
      title="delete"
      className="flex text-ctp-crust items-center justify-center bg-ctp-red border-2 border-ctp-overlay0 rounded p-1 hover:ring-2 ring-ctp-flamingo hover:bg-opacity-80"
    >
      <Trash size={16} weight="bold" />
      <p>Delete</p>
    </Dialog.Trigger>
  );
}
