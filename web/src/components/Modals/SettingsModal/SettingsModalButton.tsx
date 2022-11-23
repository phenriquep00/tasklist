import { Wrench } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function SettingsModalButton() {
    return (
        <Dialog.Trigger asChild>
            <button
                title="settings"
                className="rounded-full hover:bg-ctp-surface2 p-1"
            >
                <Wrench size={20} color="#cdd6f4" />
            </button>
        </Dialog.Trigger>

    )
}