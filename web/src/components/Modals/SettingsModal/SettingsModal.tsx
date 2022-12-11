import * as Dialog from "@radix-ui/react-dialog";
import { FileArrowUp } from "phosphor-react";

export function SettingsModal() {
  const handleUploadProfilePic = () => {
    //TODO: make the user select a photo and change its source in the db
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed z-20 inset-0 bg-black bg-opacity-80" />
      <Dialog.Content className="flex flex-col z-20 items-center justify-between text-ctp-text bg-ctp-crust rounded-xl fixed top-1/2 left-1/2 w-auto h-auto gap-6 p-6 translate-x-[-50%] translate-y-[-50%]">
        <Dialog.Title>
          <h1 className="text-xl font-bold">Settings</h1>
        </Dialog.Title>
        <Dialog.Description className="flex flex-col gap-4 items-center justify-center">
          <h1>In progress</h1>
          <div className="border-2 flex flex-col gap-4 p-4 justify-center items-center border-ctp-overlay1">
            <h2 className="text-lg font-semibold"> Change profile pic</h2>
            <div className="flex flex-row items-center gap-2">
              <h3 className="font-medium">Upload Image: </h3>
              <button
                onClick={handleUploadProfilePic}
                className="bg-ctp-surface1 p-2 rounded-md"
              >
                <FileArrowUp size={26} weight="bold" />
              </button>
            </div>
          </div>
          <div>shortcut reference</div>
        </Dialog.Description>
        <Dialog.Close>
          <button className="p-2 bg-ctp-red rounded font-medium text-ctp-crust hover:ring-2 ring-ctp-peach">
            close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
