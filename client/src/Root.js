import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

const RootLayout = ({code}) => {
 
  return (
    <>
      <Navigation />
      <main >
        <Outlet code={code} />
      </main>
    </>
  );
}

export default RootLayout;