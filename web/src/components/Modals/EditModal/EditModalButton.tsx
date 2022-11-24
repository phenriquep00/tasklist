import * as Dialog from '@radix-ui/react-dialog';
import { PencilLine } from 'phosphor-react';

export function EditModalButton() {

    return (
        <Dialog.Trigger
            title='edit'
            className="flex gap-2 items-center justify-center border-2 border-ctp-overlay0 rounded-full p-1 hover:ring-2 ring-ctp-flamingo hover:bg-opacity-80"
        >
            <PencilLine size={16} weight="regular" color='#fab387' />
        </Dialog.Trigger>
    )
}