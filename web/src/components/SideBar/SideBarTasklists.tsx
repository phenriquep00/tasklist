import axios from "axios";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { SideBarTasklistsUniqueList } from "./SideBarTasklistsUniqueList";

interface SideBarTasklistsProps {
    email: string;
};

interface tasklistProps {
    name: string;
    color: string;
    tasks: [];
}

export function SideBarTasklists({ email }: SideBarTasklistsProps) {

    const [tasklists, setTasklists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getUserTasklists = async () => {
        setIsLoading(true);
        //TODO: get all tasklists from a user
        setIsLoading(false);
    };

    useEffect(() => {
        getUserTasklists();
    }, []);

    return (
        <div className="flex flex-col gap-2 w-11/12 h-2/3 border-2 items-center border-ctp-overlay0 rounded p-2">
            <Loading active={isLoading} />
            {
                tasklists.map((tasklist: tasklistProps, index) => (
                    <SideBarTasklistsUniqueList key={index} name={tasklist.name} color={tasklist.color} />
                ))
                }
        </div>
    )
}