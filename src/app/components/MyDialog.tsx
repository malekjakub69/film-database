import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { IcoTimes } from '../../assets/icons/IcoTimes';

const OVERLAY_TRANSITION_PROPS = {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0'
};

const DIALOG_TRANSITION_PROPS = {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95'
};

interface IDialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    className?: string;
    children: JSX.Element | JSX.Element[];
}

export const MyDialog: FC<IDialogProps> = ({ isOpen, closeDialog, className, children }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto rounded-lg" onClose={closeDialog}>
                <div className="h-screen flex justify-center items-center">
                    <Transition.Child {...OVERLAY_TRANSITION_PROPS}>
                        <Dialog.Overlay className="fixed inset-0 bg-[#2d2d2d] opacity-90" />
                    </Transition.Child>
                    <Transition.Child {...DIALOG_TRANSITION_PROPS}>
                        <div className={`relative bg-white rounded-xl flex flex-col ${className ? className : ''}`}>{children}</div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

interface IHeaderProps {
    className?: string;
    title: string;
    subtitle?: string;
    onClose: () => void;
}

export function MyDialogHeader({ title, subtitle, onClose, className }: IHeaderProps) {
    return (
        <div className={`w-full bg-gray-300 basis-24 shrink-0 grow-0 flex items-center p-8 rounded-t-lg ${className ? className : ''}`}>
            <div className={'basis-full'}>
                <h5 className={'text-[1.75rem] text-white font-semibold leading-none'}>{title}</h5>
                <h4 className={'text-[1.35rem] text-white'}>{subtitle || ''}</h4>
            </div>
            <div
                className={'grid content-center justify-items-center w-12 aspect-square bg-gray-800 rounded-lg'}
                onClick={() => onClose && onClose()}
            >
                <IcoTimes className={'fill-white w-1/2'} />
            </div>
        </div>
    );
}
