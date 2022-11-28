import { ArrowFatLineRight } from "phosphor-react";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { NewTaskModalButton } from "../Modals/NewTasklistModal/NewTaskModalButton";
import { SideBarMenu } from "./SideBarMenu"
import { SideBarProfileCard } from "./SideBarProfileCard"
import { SideBarTasklists } from "./SideBarTasklists";
import * as Dialog from '@radix-ui/react-dialog';
import { NewTaskModal } from "../Modals/NewTasklistModal/NewTaskModal";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export function SideBar() {

    const {height, width} = useWindowDimensions();
    const { user, setUser } = useContext(UserContext);
    const [isSideBarOpen, setIsSideBarOpen] = useState(height >= 700 && width >= 641 ? true : false);
    const data = JSON.parse(user);

    const closeSideBar = () => {
        setIsSideBarOpen(false);
    };

    return (
        <>
            {
                isSideBarOpen
                    ?
                    (
                        <div className="md:min-w-[300px] flex flex-col gap-2 bg-ctp-mantle w-3/4 md:w-1/4 h-screen items-center justify-center rounded-r-md border-r-2 border-ctp-overlay1 transition-transform duration-300">
                            <SideBarMenu closeSideBar={closeSideBar} />
                            <SideBarProfileCard name={data.name} email={data.email} />
                            <SideBarTasklists email={data.email} />
                            <Dialog.Root>
                                <NewTaskModal />
                                <NewTaskModalButton />
                            </Dialog.Root>

                        </div>
                    )
                    :
                    <button
                        onClick={() => { setIsSideBarOpen(true) }}
                        title="expand sidebar"
                        className="absolute flex items-center justify-center w-8 h-8 p-1 top-4 left-4 rounded-full hover:ring-2 ring-offset-1 ring-ctp-lavender hover:bg-ctp-crust"
                    >
                        <ArrowFatLineRight size={28} color={"#a6e3a1"} weight="duotone" />
                    </button>
            }
        </>
    )
}