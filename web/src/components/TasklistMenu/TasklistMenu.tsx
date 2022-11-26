import * as Dialog from '@radix-ui/react-dialog';
import { DeleteModalButton } from '../Modals/DeleteModal/DeleteModalbutton';
import { EditModal } from '../Modals/EditModal/EditModal';
import { DeleteModal } from '../Modals/DeleteModal/DeleteModal';
import { EditModalButton } from '../Modals/EditModal/EditModalButton';


export function TasklistMenu() {
    return (
        <div className='flex flex-row gap-2'>
            <Dialog.Root>
                <EditModal />
                <EditModalButton />
            </Dialog.Root>

            <Dialog.Root>
                <DeleteModal />
                <DeleteModalButton />
            </Dialog.Root>
        </div>

    )
}