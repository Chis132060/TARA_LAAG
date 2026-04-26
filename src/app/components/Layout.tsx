import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Map, CalendarDays, Ticket, User } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/app", icon: Home, label: "Home" },
    { path: "/app/map", icon: Map, label: "Map" },
    { path: "/app/trips", icon: CalendarDays, label: "Trips" },
    { path: "/app/bookings", icon: Ticket, label: "Bookings" },
    { path: "/app/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen max-w-[448px] mx-auto bg-[#F9F9FC]">
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[448px] bg-white border-t border-gray-100 px-2 py-3 shadow-2xl z-[2000]">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1.5 py-2 px-3 min-w-[64px] rounded-2xl transition-all ${active ? "bg-orange-50" : ""
                  }`}
              >
                <Icon
                  className={`w-6 h-6 ${active ? "text-[#FF7A00]" : "text-[#6B7280]"
                    }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span
                  className={`${active ? "text-[#FF7A00]" : "text-[#6B7280]"
                    }`}
                  style={{ fontSize: '11px', fontWeight: active ? 700 : 500 }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
