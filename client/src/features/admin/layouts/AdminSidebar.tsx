import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router";
import { MdOutlineDashboard } from "react-icons/md";
import { IoPlayBackOutline } from "react-icons/io5";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import {
  Sidebar as SidebarContainer,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from "@/shared/ui/sidebar";

import { useRouteLoaderData } from "react-router";

import { logout } from "@/features";
import { queryClient } from "@/shared/config";
import { QUERY_KEY } from "@/shared";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Add projects",
    url: "/admin/projects/add",
    icon: <AiOutlineFolderAdd />,
  },
  {
    title: "Back to portfolio",
    url: "/",
    icon: <IoPlayBackOutline />,
  },
  {
    title: "Trash",
    url: "/admin/trash",
    icon: <GoTrash />,
  },
  {
    title: "Logout",
    url: "#",
    icon: <FiLogOut />,
    action: "logout",
  },
];

export const AdminSidebar = () => {
  const user = useRouteLoaderData("admin");
  const navigate = useNavigate();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.ME] });
      navigate("/", { replace: true });
    },
  });

  return (
    <SidebarContainer className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="h-15 pl-5 pr-0 text-sm font-bold text-gray-900 border-b border-gray-8 rounded-none">
            Welcome, {user?.username || "Guest"}!
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 mt-4">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.action ? (
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-primary w-full text-left cursor-pointer"
                      >
                        <span>{item.icon}</span>
                        <span className="text-sm">{item.title}</span>
                      </button>
                    ) : (
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-green-50  hover:text-primary [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium"
                      >
                        <span className="[.active_&]:text-white">
                          {item.icon}
                        </span>
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};
