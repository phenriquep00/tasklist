import { ArrowFatLineLeft, SignOut } from "phosphor-react";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { SettingsModal } from "../Modals/SettingsModal/SettingsModal";
import { SettingsModalButton } from "../Modals/SettingsModal/SettingsModalButton";
import * as Dialog from "@radix-ui/react-dialog";
import GitHubButton from "react-github-btn";
import { TasklistContext } from "../../hooks/TasklistContext";

interface SideBarMenuProps {
  closeSideBar: () => void;
}

export function SideBarMenu({ closeSideBar }: SideBarMenuProps) {
  const { user, setUser } = useContext(UserContext);
  const { tasklist, setTasklist } = useContext(TasklistContext);

  const handleSignOutButtonClick = () => {
    setUser("");
    setTasklist("");
  };

  const handleCollapseSideBarButtonClick = () => {
    closeSideBar();
  };

  return (
    <div className="flex flex-row items-end justify-end w-11/12 border-2 border-ctp-overlay0 gap-2 rounded overflow-hidden">
      {/* <!-- Place this tag where you want the button to render. --> */}
      <div className="flex mb-[-2px]">
        <GitHubButton
          href="https://github.com/phenriquep00/tasklist"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-show-count="true"
          aria-label="Star phenriquep00/tasklist on GitHub"
        >
          Star
        </GitHubButton>
      </div>

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
        title="colapse sidebar [ctrl + arrow left]"
        className="rounded-full hover:bg-ctp-surface2 p-1 mr-2"
        onClick={handleCollapseSideBarButtonClick}
      >
        <ArrowFatLineLeft size={20} color="#cdd6f4" />
      </button>
    </div>
  );
}
