import { twMerge } from "tailwind-merge"; 


import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { FiTable } from "react-icons/fi";

interface BoxProps{
    children:React.ReactNode;
    className?:string;

}
const Box: React.FC<BoxProps>=({
    children,
    className
})=>{
    return (
        <div
        className={twMerge(
            `bg-neutral-900
            rounded-lg 
            w-full
            h-fit`,
            className 
        )}
        >
            {children}
        </div>
    );
}
export default Box;