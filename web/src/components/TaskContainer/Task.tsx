import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Checkbox } from "./Checkbox";
import { taskProps } from "./TaskContainer";

export function Task({ description, createdAt, priority }: taskProps) {
    return (
        <div className="flex flex-row w-5/6 bg-ctp-surface2 text-ctp-text items-center justify-between p-1 rounded-md px-5 border-2 border-ctp-peach">
            <div className="flex gap-4 items-center">
                <Checkbox />
                <div>
                    <p className="font-semibold text-lg">{description}</p>
                    <p className="font-light text-sm">{createdAt}</p>
                </div>
            </div>
            <DropdownMenu />
        </div>
    )
}