"use client";
import React, { useState, useEffect } from "react";
import {
  Plus,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Bot,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
const ChatPage = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [recentChats, setRecentChats] = useState<any[]>([]);
  const handleNewChat = async () => {
    setIsCreating(true);
    console.log(prompt);
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (response.ok) {
        const chat = await response.json();

        router.push(`/chat/${chat._id}`);
      } else if (response.status === 401) {
        alert("Unauthorized! Please Login to continue");
      } else {
        throw new Error("Failed to create chat");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setIsCreating(false);
    }
  };
  const { user, isSignedIn } = useUser(); // Clerk State

  useEffect(() => {
    const getRecentChats = async () => {
      try {
        let result = await fetch("/api/chats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await result.json();

        setRecentChats(data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    if (isSignedIn) {
      console.log("Signed In");
      getRecentChats();
    }
  }, [isSignedIn]);


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

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-blue-50 dark:from-zinc-900 dark:to-slate-900">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16">
        <div className="max-w-4xl w-full text-center">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <MessageSquare className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to AI Chat
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Start a conversation with our advanced AI assistant. Ask
              questions, get creative, or explore new ideas together.
            </p>
          </div>

          {/* New Chat Button */}
          <div className="mb-12">
            <button
              onClick={handleNewChat}
              disabled={isCreating}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Chat...
                </>
              ) : (
                <>
                  <Plus className="h-6 w-6" />
                  Start New Chat
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </div>

          {/* Quick Start Prompts */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Recent Chats
            </h2>
            {recentChats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {recentChats.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => openChat(item._id)}
                    className="group p-4 text-left bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-white dark:hover:bg-zinc-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <h1 className="text-gray-600 p-20">
                No Recent Chats, Start a New One
              </h1>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                AI-Powered
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced language model for intelligent conversations
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Real-time Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Stream responses for natural conversation flow
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Personalized
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save and continue conversations anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
