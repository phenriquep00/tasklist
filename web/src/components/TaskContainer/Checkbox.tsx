import * as Checkbox_ from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

export function Checkbox() {
    return (
        <Checkbox_.Root className='flex items-center justify-center bg-ctp-surface0 w-10 h-10 rounded-full hover:bg-ctp-surface1 hover:ring-2 ring-offset-1 ring-ctp-sky'>
            <Checkbox_.Indicator>
                <Check size={30} color="#fff" weight='bold'/>
            </Checkbox_.Indicator>
        </Checkbox_.Root >
    )
}