import { NavLink } from "react-router-dom";


function MainNavigation() {
  return (
    <header >
      <nav>
        <ul >
          <li>
            <NavLink
              to="/"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/library"
              
            >
              Library
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
