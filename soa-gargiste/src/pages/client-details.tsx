import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Car,
  Edit,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ClientDetails() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const client = {
    name: "Jean Dupont",
    phone: "+33 6 12 34 56 78",
    email: "jean.dupont@email.com",
    address: "15 Rue de la République, 75001 Paris, France",
  };

  const vehicles = [
    {
      id: "1",
      model: "Renault Clio V",
      registration: "AB-123-CD",
      year: 2021,
      lastService: "15 Oct 2024",
    },
    {
      id: "2",
      model: "Peugeot 308 SW",
      registration: "EF-456-GH",
      year: 2019,
      lastService: "02 Sep 2024",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Client Details</h1>

      {/* Client Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Client Information</h2>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-base font-medium">{client.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="text-base font-medium">{client.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-base font-medium">{client.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="text-base font-medium">{client.address}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={() => navigate(`/quotes/create/${clientId}`)}
          className="h-auto py-4 bg-primary hover:bg-primary/90"
        >
          <FileText className="h-5 w-5 mr-2" />
          Create Quote for This Client
        </Button>
        <Button
          onClick={() => navigate(`/clients/${clientId}/add-vehicle`)}
          className="h-auto py-4 bg-success hover:bg-success/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Vehicle
        </Button>
      </div>

      {/* Associated Vehicles */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Associated Vehicles</h2>
          <span className="text-sm text-muted-foreground">
            {vehicles.length} vehicles
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Vehicle Model
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Registration
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Year
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Last Service
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{vehicle.model}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm">{vehicle.registration}</td>
                  <td className="py-3 px-2 text-sm">{vehicle.year}</td>
                  <td className="py-3 px-2 text-sm">{vehicle.lastService}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Button className="h-8 bg-primary hover:bg-primary/90 text-xs">
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
