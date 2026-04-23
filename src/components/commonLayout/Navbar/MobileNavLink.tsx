import { NavItem } from "@/types/NavItem";
import ActiveLink from "./ActiveLink";

const MobileNavLink = ({
  link,
  onClick,
}: {
  link: NavItem;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className="w-full">
      <ActiveLink link={link} />
    </div>
  );
};

export default MobileNavLink;
