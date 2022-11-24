import * as Dialog from '@radix-ui/react-dialog';
import { DeleteModalButton } from '../Modals/DeleteModal/DeleteModalbutton';
import { EditModal } from '../Modals/EditModal/EditModal';
import { DeleteModal } from '../Modals/DeleteModal/DeleteModal';
import { EditModalButton } from '../Modals/EditModal/EditModalButton';

export interface TasklistMenuProps {
    type: "task" | "tasklist",
    task?: string,
    forceTaskUpdate?: () => void;
}

export function TasklistMenu({type, task, forceTaskUpdate}: TasklistMenuProps) {
    return (
        <div className='flex flex-row gap-2'>
            <Dialog.Root>
                <EditModal />
                <EditModalButton />
            </Dialog.Root>

            <Dialog.Root>
                <DeleteModal type={type} task={task} forceTaskUpdate={forceTaskUpdate}/>
                <DeleteModalButton />
            </Dialog.Root>
        </div>

    )
}