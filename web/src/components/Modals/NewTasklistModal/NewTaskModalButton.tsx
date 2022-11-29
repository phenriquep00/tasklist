import { Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function NewTaskModalButton() {
  return (
    <Dialog.Trigger asChild>
      <button className="flex gap-2 items-center justify-center bg-ctp-green text-ctp-crust font-semibold text-xl w-11/12 h-[10vh] border-2 border-ctp-overlay0 rounded p-1 hover:ring-2 ring-offset-1 ring-ctp-flamingo hover:bg-opacity-80">
        <Plus size={32} weight="bold" /> New list
      </button>
    </Dialog.Trigger>
  );
}
