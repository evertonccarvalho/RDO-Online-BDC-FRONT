import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";

interface SideBarTriggerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarTrigger: React.FC<SideBarTriggerProps> = ({ open, setOpen }) => {
  return (
    <div className="flex justify-end py-3">
      <HiMenuAlt3
        size={26}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </div>
  );
};

export default SideBarTrigger;
