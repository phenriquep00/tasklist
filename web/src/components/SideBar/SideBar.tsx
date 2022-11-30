import { ArrowFatLineRight } from "phosphor-react";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { NewTaskModalButton } from "../Modals/NewTasklistModal/NewTaskModalButton";
import { SideBarMenu } from "./SideBarMenu";
import { SideBarProfileCard } from "./SideBarProfileCard";
import { SideBarTasklists } from "./SideBarTasklists";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTaskModal } from "../Modals/NewTasklistModal/NewTaskModal";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useHotkeys } from "react-hotkeys-hook";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  forceTasklistUpdate: boolean;
  setForceTasklistUpdate: (arg0: boolean) => void;
}

export function SideBar({ isOpen, setIsOpen, forceTasklistUpdate, setForceTasklistUpdate }: SideBarProps) {
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const data = JSON.parse(user);

  useHotkeys("ctrl + left", () => {
    setIsOpen(false);
  });

  useHotkeys("ctrl + right", () => {
    setIsOpen(true);
  });

  const closeSideBar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <div className="z-10 flex flex-col gap-2 bg-ctp-mantle w-3/4 md:w-1/4 h-screen items-center justify-center rounded-r-md border-r-2 border-ctp-overlay1 transition-transform duration-300">
          <SideBarMenu closeSideBar={closeSideBar} />
          <SideBarProfileCard name={data.name} email={data.email} />
          <SideBarTasklists email={data.email} isSideBarOpen={setIsOpen} forceTasklistUpdate={forceTasklistUpdate} setForceTasklistUpdate={setForceTasklistUpdate}/>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <NewTaskModal isOpen={setOpen}/>
            <NewTaskModalButton />
          </Dialog.Root>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          title="expand sidebar [ctrl + arrow right]"
          className="absolute z-10 flex items-center justify-center w-8 h-8 p-1 top-50 left-2 rounded-full hover:ring-2 ring-offset-1 ring-ctp-lavender hover:bg-ctp-crust"
        >
          <ArrowFatLineRight size={28} color={"#a6e3a1"} weight="duotone" />
        </button>
      )}
    </>
  );
}
