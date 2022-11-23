import { useContext } from "react";
import { TasklistContext } from "../../hooks/TasklistContext";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";


interface SideBarTasklistsUniqueListProps {
    name: string;
}

export function SideBarTasklistsUniqueList({ name }: SideBarTasklistsUniqueListProps) {

    const { tasklist, setTasklist } = useContext(TasklistContext);

    const handleSideBarTasklistsUniqueListClick = () => {
        setTasklist(name);
    };

    return (
        <button
            onClick={handleSideBarTasklistsUniqueListClick}
            className="w-[95%] flex flex-row justify-between items-center bg-ctp-surface1 p-2 rounded hover:ring-2 ring-offset-1 ring-ctp-flamingo"
        >
            <p className="font-medium text-base">{name}</p>
            
            <DropdownMenu />
        </button>
    )
}