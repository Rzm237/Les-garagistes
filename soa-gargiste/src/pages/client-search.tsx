import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Eye,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const clients = [
    {
      id: "1",
      name: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@email.com",
      vehicles: 2,
    },
    {
      id: "2",
      name: "Marie Martin",
      phone: "+33 6 23 45 67 89",
      email: "marie.martin@email.com",
      vehicles: 1,
    },
    {
      id: "3",
      name: "Pierre Dubois",
      phone: "+33 6 34 56 78 90",
      email: "pierre.dubois@email.com",
      vehicles: 3,
    },
    {
      id: "4",
      name: "Sophie Bernard",
      phone: "+33 6 45 67 89 01",
      email: "sophie.bernard@email.com",
      vehicles: 1,
    },
    {
      id: "5",
      name: "Luc Petit",
      phone: "+33 6 56 78 90 12",
      email: "luc.petit@email.com",
      vehicles: 2,
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Client Search</h1>

      {/* Search Bar */}
      <Card className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Search by Name or Phone
        </h2>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Enter client name or phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-4"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button className="bg-success hover:bg-success/90">
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        </div>
      </Card>

      {/* Results */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Results</h2>
          <span className="text-sm text-muted-foreground">
            {filteredClients.length} clients found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Client Name
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Phone
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Vehicles
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-center">
                    {client.vehicles}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => navigate(`/clients/${client.id}`)}
                        className="h-8 bg-primary hover:bg-primary/90 text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
