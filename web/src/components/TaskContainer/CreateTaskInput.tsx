import axios from 'axios';
import { KeyboardEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { TasklistContext } from '../../hooks/TasklistContext';
import { UserContext } from '../../hooks/UserContext';
import { Loading } from '../Loading/Loading';

interface CreateTaskInputProps {
    forceTaskUpdate: () => void;
}

export function CreateTaskInput({ forceTaskUpdate }: CreateTaskInputProps) {

    const { tasklist, setTasklist } = useContext(TasklistContext);
    const { user, setUser } = useContext(UserContext);
    const data = JSON.parse(user);

    const [value, setValue] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const tasklistId = useRef('');
    const reference = useRef<any>();

    useHotkeys('shift+space', () => {
        reference.current.focus();
    });

    const handleCreateNewTask = async () => {
        setIsloading(true);
        // get tasklist id
        //TODO: get the current tasklistid from database

        //post new task
        //TODO: post the current

        setIsloading(false);
        forceTaskUpdate();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            handleCreateNewTask();
        }
    };

    return (
        <>
            {
                isLoading
                    ?
                    <div className="flex flex-row items-center justify-center w-11/12 h-16 px-6 rounded-md border-4 border-ctp-mauve text-ctp-crust text-lg font-bold ring-ctp-sky ring-offset-ctp-lavender">
                        <Loading active={isLoading} />
                    </div>
                    :
                    (
                        <input
                            ref={reference}
                            className="flex flex-row items-center bg-ctp-flamingo w-11/12 h-16 placeholder-ctp-overlay0 px-6 py-4 rounded-md border-4 border-ctp-mauve text-ctp-crust text-lg font-bold ring-ctp-sky ring-offset-ctp-lavender"
                            onChange={(text) => setValue(text.target.value)}
                            onKeyDown={handleKeyDown}
                            type="text"
                            name=""
                            id=""
                            placeholder="Create a task [shift + space]"
                        />
                    )
            }
        </>
    )
}