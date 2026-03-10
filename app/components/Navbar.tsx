import { ArrowRight, Box } from "lucide-react";
import { Button } from "./ui/Button";
import { useOutletContext } from "react-router";

const Navbar = () => {
  const { isSignedIn, userName, userId, signIn, signOut } =
    useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.log("Sign out", error);
      }
    } else {
      try {
        await signIn();
      } catch (error) {
        console.log("Sigin failed", error);
      }
    }
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Roomify</span>
          </div>
          <ul className="links">
            <a href="#">Products</a>
            <a href="#">Pricing</a>
            <a href="#">Company</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>

        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {userName ? `Welcome, ${userName}` : "Welcome"}
              </span>
              <Button size="sm" onClick={handleAuthClick} className="btn">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthClick}
                className="btn"
              >
                Login
              </Button>
              <a href="#" className="cta">
                <span>Get Started</span>
                <ArrowRight className="icon" />
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
