import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export default function ProjectLayout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
