import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "./components/layout";
import { TooltipProvider } from "./components/ui/tooltip";
import AddVehicle from "./pages/add-vehicle";
import ClientDetails from "./pages/client-details";
import ClientSearch from "./pages/client-search";
import CreateQuote from "./pages/create-quote";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";

const App = () => (
  <TooltipProvider>
    <Toaster />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<ClientSearch />} />
          <Route path="clients/:clientId" element={<ClientDetails />} />
          <Route
            path="clients/:clientId/add-vehicle"
            element={<AddVehicle />}
          />
          <Route path="quotes/create" element={<CreateQuote />} />
          <Route path="quotes/create/:clientId" element={<CreateQuote />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
