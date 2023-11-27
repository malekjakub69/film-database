import { FC, Fragment, ReactNode, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { IcoFavorites, IcoSearch } from '../../assets/icons';

interface IProps {
    className?: string;
}

interface INavItem {
    icon: ReactNode;
    name: string;
    url: string;
}

export const AppMenu: FC<IProps> = ({ className }) => {
    const navItems = useMemo<INavItem[]>(
        () => [
            { icon: <IcoSearch className={'fill-black h-18'} />, name: 'Hledat', url: '/films' },
            { icon: <IcoFavorites className={'fill-black h-18'} />, name: 'Oblíbené', url: '/favorites' }
        ],
        []
    );

    return (
        <div className={`flex gap-8 mt-4 mx-auto justify-around w-1/3 ${className || ''}`}>
            {navItems.map(({ icon, name, url }) => {
                return (
                    <NavLink to={url} className="flex flex-col justify-center items-center gap-1.5 relative" key={url}>
                        {({ isActive }) => (
                            <Fragment>
                                {isActive && <span className="bg-carrot-orange absolute h-full w-1 left-0"></span>}
                                {icon}
                                <span className="text-black uppercase text-[0.85rem] mb-2">{name}</span>
                            </Fragment>
                        )}
                    </NavLink>
                );
            })}
        </div>
    );
};
