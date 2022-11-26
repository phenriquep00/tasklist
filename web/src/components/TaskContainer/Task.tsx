import { useState } from "react";
import { TasklistMenu } from "../TasklistMenu/TasklistMenu";
import { Checkbox } from "./Checkbox";

interface TaskComponentProps {
    name: string;
    createdAt: string;
    forceTaskUpdate: () => void;
}

export function Task({ name, createdAt, forceTaskUpdate }: TaskComponentProps) {

    const taskId = String(name + createdAt);

    return (
        <div
            className="flex flex-row w-5/6 bg-ctp-surface2 text-ctp-text items-center justify-between p-1 rounded-md px-5 border-2 border-ctp-green overflow-hidden"
        >
            <div className="flex gap-4 items-center">
                <Checkbox taskId={taskId} forceTaskUpdate={forceTaskUpdate} />
                <div>
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="font-light text-sm">{createdAt}</p>
                </div>
            </div>

        </div>
    )
}