import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppMenu } from '../layouts/AppMenu';

export const MainPage: FC = () => {
    return (
        <div className="flex absolute top-0 left-0 right-0 bottom-0">
            <div className="flex flex-col basis-full shrink bg-gray-100 max-h-full h-full overflow-hidden">
                <AppMenu className={'basis-24 shrink-0 grow-0'} />
                <div className="basis-full shrink px-10 py-7 overflow-hidden flex flex-col">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
