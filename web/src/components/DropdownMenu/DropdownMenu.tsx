import { DotsThreeVertical } from "phosphor-react";

export function DropdownMenu() {
    return (
        <div
            className="flex items-center justify-center p-1 rounded-full w-8 h-8 hover:bg-ctp-surface0 hover:cursor-pointer"
        >
            <DotsThreeVertical size={28} weight="bold" color="#a6e3a1" />
        </div>
    )
}