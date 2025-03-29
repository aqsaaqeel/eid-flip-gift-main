
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCard from "./pages/CreateCard";
import ViewCard from "./pages/ViewCard";
import NotFound from "./pages/NotFound";
import TestFirestore from "./TestFirestore"
// Create a new QueryClient
const queryClient = new QueryClient();

const App: React.FC = () => {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateCard />} />
            <Route path="/card/:id" element={<ViewCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <TestFirestore />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
