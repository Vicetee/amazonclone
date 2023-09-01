import React from 'react';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SideNavContents = ({title, one, two, three}) => {
  return (
    <div className='text-amazon_blue py-3 border-b-[1px] border-b-gray-300'>
        <h3 className='text-lg font-titleFont font-semibold mb-2 px-6'>
            {title}
        </h3>
        <ul className='text-sm'>
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                {one}
                <span>
                    <KeyboardArrowRightIcon />
                </span>
            </li>
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                {two}
                <span>
                    <KeyboardArrowRightIcon />
                </span>
            </li>
            <li className='flex items-center justify-between hover:bg-zinc-200 px-6 py-2 cursor-pointer'>
                {three}
                <span>
                    <KeyboardArrowRightIcon />
                </span>
            </li>
        </ul>
    </div>
  )
};

export default SideNavContents;
