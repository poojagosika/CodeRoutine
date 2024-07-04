import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

export const pages = [
  { name: "Explore", path: "/explore", role: "user", login: false },
  { name: "Problems", path: "/problems", role: "user", login: false },
  { name: "Add Problems", path: "/addProblems", role: "admin", login: true },
  { name: "Contest", path: "/contest", role: "user", login: false },
  { name: "Discuss", path: "/discuss", role: "user", login: true },
  { name: "Interview", path: "/interview", role: "user", login: false },
  { name: "Store", path: "/store", role: "user", login: true },
];
export const storeSubmenuItems = [
  { name: "Redeem", path: "/store/redeem" },
  { name: "Premium", path: "/store/premium" },
];

export const interviewSubmenuItems = [
  { name: "Online Interview", path: "/interview/onlineinterview" },
  { name: "Assessment", path: "/interview/assessment" },
];

export const settings = [
  { name: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
  { name: "Orders", path: "/settings/orders", icon: <ListAltIcon /> },
  { name: "My Playgrounds", path: "/settings/playgrounds", icon: <ImportantDevicesIcon /> },
  { name: "Appearance", path: "/settings/appearance", icon: <DarkModeOutlinedIcon /> },
  { name: "Sign Out", icon: <LogoutIcon /> },
];