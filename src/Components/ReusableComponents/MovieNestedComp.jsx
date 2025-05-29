import { Outlet } from "react-router-dom";
import NavBar from "./NavbarComponent";

const NestedMovies = () => (
  <>
    <header className="fixed top-0 z-50">
      <NavBar />
    </header>
    <div>
      <Outlet />
    </div>
  </>
);

export default NestedMovies;
