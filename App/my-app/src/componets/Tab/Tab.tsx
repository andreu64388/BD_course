import React, { FC, useState, ReactNode } from "react";
import "./Tab.css";

type TabsProps = {
   children: ReactNode;
   tabs: { title: string }[];
};

const Tabs: FC<TabsProps> = ({ children, tabs }) => {
   const [activeIndex, setActiveIndex] = useState<number>(0);

   const handleTabClick = (index: number) => {
      setActiveIndex(index);
   };

   return (
      <div className="tabs">
         <div className="tabs__header">
            {tabs.map((tab, index) => (
               <button
                  key={index}
                  className={`tabs__header-btn ${activeIndex === index ? "active" : ""}`}
                  onClick={() => handleTabClick(index)}
               >
                  {tab.title}
               </button>
            ))}
         </div>
         <div className="tabs__content">
            {React?.Children.map(children, (child, index) =>
               activeIndex === index ? child : null
            )}
         </div>
      </div>
   );
};

export default Tabs;
