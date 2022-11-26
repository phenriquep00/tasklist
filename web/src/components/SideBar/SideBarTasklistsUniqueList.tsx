import { useContext, useState } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { TasklistMenu } from "../TasklistMenu/TasklistMenu";


interface SideBarTasklistsUniqueListProps {
  name: string;
}

export function SideBarTasklistsUniqueList({ name }: SideBarTasklistsUniqueListProps) {

  const [isMouseOver, setIsMouseOver] = useState(false);

  const { tasklist, setTasklist } = useContext(TasklistContext);

  const handleSideBarTasklistsUniqueListClick = () => {
    setTasklist(name);
  };

  return (
    <div
      tabIndex={0}
      onClick={handleSideBarTasklistsUniqueListClick}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="w-[95%] flex flex-row justify-between items-center bg-ctp-surface1 p-2 rounded hover:ring-2 ring-offset-1 ring-ctp-flamingo"
    >
      <p className="font-medium text-base">{name}</p>

      {
        isMouseOver && <TasklistMenu/>
      }
    </div>
  )
}