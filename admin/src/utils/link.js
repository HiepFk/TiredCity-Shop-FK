import { FaUserAlt, FaShoppingCart, FaProductHunt } from "react-icons/fa";
import { BsPieChartFill } from "react-icons/bs";

export const navbar = [
  {
    id: 1,
    title: "Quản lý người dùng",
    link: "/users",
    icon: (
      <div className="icon">
        <FaUserAlt />
      </div>
    ),
  },
  {
    id: 2,
    title: "Quản lý sản phẩm",
    link: "/products",
    icon: (
      <div className="icon">
        <FaProductHunt />
      </div>
    ),
  },
  {
    id: 3,
    title: "Quản lý đơn hàng",
    link: "/orders",
    icon: (
      <div className="icon">
        <FaShoppingCart />
      </div>
    ),
  },
  {
    id: 4,
    title: "Thống kê",
    link: "/",
    icon: (
      <div className="icon">
        <BsPieChartFill />
      </div>
    ),
  },
];
