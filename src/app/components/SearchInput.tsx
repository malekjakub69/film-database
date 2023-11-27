import { FC } from 'react';

interface IProps {
    className?: string;
    onChange: (value: string) => void;
}

export const SearchInput: FC<IProps> = ({ className, onChange }) => {
    return (
        <div className={`${className} relative h-14`}>
            <input
                type="text"
                className=" w-full h-full focus:outline-0 border-2  text-xl p-2.5 rounded-lg"
                placeholder={'Zadej název filmu'}
                onChange={(value) => {
                    onChange(value.target.value);
                }}
                required
            />
        </div>
    );
};
