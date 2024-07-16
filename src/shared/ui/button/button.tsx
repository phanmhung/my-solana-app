import React from 'react';
import cls from './button.module.scss';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className={cls.button_wrapper}>
            {children}
        </button>
    );
};

export default Button;