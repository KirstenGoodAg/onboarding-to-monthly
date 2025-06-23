
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SIDEBAR_BG = "#336633";

const Sidebar = () => {
  const location = useLocation();
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Check onboarding completion status
  useEffect(() => {
    const checkOnboardingStatus = () => {
      const saved = localStorage.getItem('onboarding-checked');
      if (saved) {
        const checked = JSON.parse(saved);
        const isComplete = checked.every((item: boolean) => item === true);
        setOnboardingComplete(isComplete);
      }
    };

    // Check initially
    checkOnboardingStatus();

    // Listen for storage changes
    window.addEventListener('storage', checkOnboardingStatus);
    
    // Also check periodically in case localStorage is updated in same tab
    const interval = setInterval(checkOnboardingStatus, 1000);

    return () => {
      window.removeEventListener('storage', checkOnboardingStatus);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      img: "https://goodagriculture.com/wp-content/uploads/2025/05/tractor-1.png",
      alt: "Tractor",
      id: "tractor",
    },
    {
      label: "Upload",
      to: "/upload",
      img: "https://goodagriculture.com/wp-content/uploads/2025/05/add.png",
      alt: "Upload",
      id: "plus",
      defaultSvg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
      ),
    },
    {
      label: "Profile",
      to: "/profile",
      img: "https://goodagriculture.com/wp-content/uploads/2025/05/user.png",
      alt: "Profile",
      id: "profile",
    },
    ...(onboardingComplete ? [{
      label: "Transactions",
      to: "/transactions",
      img: "https://goodagriculture.com/wp-content/uploads/2025/05/dollar-sign.png",
      alt: "Transactions",
      id: "transactions",
    }] : []),
    ...(onboardingComplete ? [{
      label: "Reports",
      to: "/reports",
      img: "https://goodagriculture.com/wp-content/uploads/2025/05/reports-icon.png",
      alt: "Reports",
      id: "reports",
    }] : []),
    {
      label: "Inbox",
      to: "/inbox",
      img: "https://goodagriculture.com/wp-content/uploads/2025/05/mail.png",
      alt: "Inbox",
      id: "inbox",
    },
  ];

  return (
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col items-center py-6 z-40"
      style={{
        width: 84,
        background: SIDEBAR_BG,
        boxShadow: "2px 0 10px 0 rgba(0,0,0,0.046)",
      }}
    >
      <NavLink to="/dashboard" className="mb-8">
        <img
          src="https://goodagriculture.com/wp-content/uploads/2025/03/cropped-GA-Logo-Symbol-3.png"
          alt="Good Agriculture Logo"
          className="w-12 h-12 rounded-xl shadow-lg bg-white/80"
          style={{ background: "#fff", padding: 4, marginBottom: 32, borderRadius: 12 }}
        />
      </NavLink>
      <nav className="flex flex-col space-y-8 w-full items-center flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-center transition-all duration-150 w-12 h-12 rounded-xl
              ${isActive || location.pathname.startsWith(item.to) ? "bg-white/30 ring-2 ring-white" : "hover:bg-white/10"}
              `}
            title={item.label}
          >
            {
              item.img
                ? <img src={item.img} alt={item.alt} className="w-7 h-7" />
                : item.defaultSvg
            }
          </NavLink>
        ))}
      </nav>
      <div className="flex-1" />
    </aside>
  );
};

export default Sidebar;
