"use client";
import { Home, Search, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);

  const openChat = async (id) => {
    let response;
    try {
      response = await fetch(`/api/chats/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let chat = await response.json();
      if(response.ok){
       
        router.push(`/chat/${id}`);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      // console.log(chat);
    }
  };
  // Fetch chats
  useEffect(() => {
    let getChats = async () => {
      try {
        let result = await fetch("/api/chats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await result.json();
        console.log(data);
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    getChats();
  }, []);

  // Create new chat
  const handleNewChat = async () => {
    try {
      const result = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: `Chat ${chats.length + 1}` }),
      });
      const newChat = await result.json();
      setChats((prev) => [newChat, ...prev]);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleNewChat}>
                  <Plus />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Will Change it later to a real chat list */}
              {chats.map((item) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => openChat(item._id)}>
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
