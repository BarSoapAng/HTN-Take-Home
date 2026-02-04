import { FaLaptopCode } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";

export default function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const handleLogoClick = (e) => {
    e.preventDefault()

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Make sure navbar shows when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Show navbar when scrolling up 50px past the threshold
        if (currentScrollY < lastScrollYRef.current) {
          setIsVisible(true);
        }
        // Hide navbar when scrolling down past the threshold
        else if (currentScrollY > lastScrollYRef.current) {
          setIsVisible(false);
        }
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 z-40 w-full transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className="flex justify-between px-20 py-1"
        style={{ backgroundColor: "var(--white)", borderBottom: "1px solid var(--blue)" }}
      >
        <a href="/" onClick={ handleLogoClick } className="flex items-center gap-5">
          <FaLaptopCode className="w-6 h-6"/>
          <div className="title">Events</div>
        </a>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              className="small-text rounded-xl border border-black/20 px-4 py-2 transition hover:translate-y-[-1px] hover:shadow-sm"
              style={{ backgroundColor: "var(--green)" }}
              onClick={onLogoutClick}
            >
              Log out
            </button>
          ) : (
            <button
              className="small-text rounded-xl border border-black/20 px-4 py-2 transition hover:translate-y-[-1px] hover:shadow-sm"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={onLoginClick}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

