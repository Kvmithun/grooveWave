
import { IconType } from "react-icons";

import { twMerge } from "tailwind-merge";
interface sidebarItemsProps{
    icon:IconType;
    label:string;
    active?:boolean;
    href:string;
}
const sidebarItem:React.FC<sidebarItemsProps>=({
    icon:Icon,
    label,
    active,
    href

})=>{
    return (
        <a
        href={href}
        className={twMerge(`
        flex
        flex-row
        h-auto
        items-center
        w-full
        gap-x-4
        text-md
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1
        `,
    active && "text-white")}
        >
            <Icon size={26}> </Icon>
            <p className="truncate w-full">{label}</p>
        </a>
    
    );
}
export default sidebarItem;