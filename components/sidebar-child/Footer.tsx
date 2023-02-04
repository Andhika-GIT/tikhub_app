import React from "react";

import type { NextPage } from "next";

interface IProps {
  mobile: boolean;
}

// const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
//   <div className={`flex flex-wrap gap-2 ${mt && "mt-3"}`}>
//     {items.map((item) => (
//       <p
//         key={item}
//         className="text-gray-400 text-sm hover:underline cursor-pointer"
//       >
//         {item}
//       </p>
//     ))}
//   </div>
// );

const Footer: NextPage<IProps> = ({ mobile }) => {
  return (
    <div className={`${mobile ? "mt-3" : "hidden md:block mt-6"}`}>
      <p className={`${mobile ? "text-center text-sm mt-4" : "text-sm mt-5"}`}>
        2023 TikHub
      </p>
    </div>
  );
};

export default Footer;
