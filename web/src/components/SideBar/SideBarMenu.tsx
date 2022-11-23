import { ArrowFatLineLeft, SignOut } from "phosphor-react";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { SettingsModal } from "../Modals/SettingsModal/SettingsModal";
import { SettingsModalButton } from "../Modals/SettingsModal/SettingsModalButton";
import * as Dialog from '@radix-ui/react-dialog';

interface SideBarMenuProps {
    closeSideBar: () => void;
}

export function SideBarMenu({ closeSideBar }: SideBarMenuProps) {

    const { user, setUser } = useContext(UserContext);

    const handleSignOutButtonClick = () => {
        setUser('');
    };

    const handleCollapseSideBarButtonClick = () => {
        closeSideBar();
    };


    return (
        <div className="flex flex-row items-end justify-end w-11/12 border-2 border-ctp-overlay0 gap-2 rounded">

            <Dialog.Root>
                <SettingsModalButton />
                <SettingsModal />
            </Dialog.Root>

            <button
                title="sign out"
                className="rounded-full hover:bg-ctp-surface2 p-1"
                onClick={handleSignOutButtonClick}
            >
                <SignOut size={20} color="#cdd6f4" />
            </button>
            <button
                title="colapse sidebar"
                className="rounded-full hover:bg-ctp-surface2 p-1 mr-2"
                onClick={handleCollapseSideBarButtonClick}
            >
                <ArrowFatLineLeft size={20} color="#cdd6f4" />
            </button>
        </div>
    )
}