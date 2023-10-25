import { NavLink } from "react-router-dom";


function MainNavigation() {
  return (
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
  );
}

export default MainNavigation;
