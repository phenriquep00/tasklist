import { useContext, useEffect, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";

interface SideBarTasklistsUniqueListProps {
  name: string;
  numberOfTasks: () => number;
  isSideBarOpen: (arg0: boolean) => void;
  isMobile: boolean;
}

export function SideBarTasklistsUniqueList({
  name,
  numberOfTasks,
  isSideBarOpen,
  isMobile,
}: SideBarTasklistsUniqueListProps) {
  const { tasklist, setTasklist } = useContext(TasklistContext);

  const handleSideBarTasklistsUniqueListClick = () => {
    setTasklist(name);
    if (isMobile) isSideBarOpen(false);
  };

  return (
    <button
      tabIndex={0}
      onClick={handleSideBarTasklistsUniqueListClick}
      className="w-[95%] flex flex-row justify-between items-center bg-ctp-surface1 p-2 rounded hover:ring-2 ring-offset-1 ring-ctp-flamingo"
    >
      <p className="font-medium text-base truncate">{name}</p>
      <p className="bg-ctp-surface0 rounded px-2">{numberOfTasks()}</p>
    </button>
  );
}
