import { FaStoreAlt } from "react-icons/fa";
import { BsPieChartFill, BsTruck } from "react-icons/bs";
import { TbLayoutDashboard } from "react-icons/tb";
import { FiUser } from "react-icons/fi";

export const navbar = [
  {
    id: 1,
    title: "Dashboard",
    link: "/",
    icon: (
      <div className="icon">
        <TbLayoutDashboard />
      </div>
    ),
  },
  {
    id: 2,
    title: "Users",
    link: "/users",
    icon: (
      <div className="icon">
        <FiUser />
      </div>
    ),
  },
  {
    id: 3,
    title: "Products",
    link: "/products",
    icon: (
      <div className="icon">
        <FaStoreAlt />
      </div>
    ),
  },
  {
    id: 4,
    title: "Orders",
    link: "/orders",
    icon: (
      <div className="icon">
        <BsTruck />
      </div>
    ),
  },
  {
    id: 5,
    title: "Chart",
    link: "/chart",
    icon: (
      <div className="icon">
        <BsPieChartFill />
      </div>
    ),
  },
];
