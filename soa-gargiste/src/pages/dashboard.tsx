import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  Camera,
  Car,
  CheckCircle2,
  Edit,
  Eye,
  FileText,
  Info,
  Search,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "success",
      message: "Quote #2024-0042 validated by insurer Allianz",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "warning",
      message: "Quote #2024-0038 rejected - Additional documentation required",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "info",
      message: "Photos requested for vehicle BMW X5 - Quote #2024-0041",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "info",
      message: "New message from insurer regarding Quote #2024-0035",
      time: "2 days ago",
    },
  ];

  const recentQuotes = [
    {
      number: "#2024-0042",
      status: "Approved",
      vehicle: "Renault Clio - AB-123-CD",
      client: "Jean Dupont",
    },
    {
      number: "#2024-0041",
      status: "In Progress",
      vehicle: "BMW X5 - EF-456-GH",
      client: "Marie Martin",
    },
    {
      number: "#2024-0040",
      status: "Pending",
      vehicle: "Peugeot 308 - IJ-789-KL",
      client: "Pierre Dubois",
    },
    {
      number: "#2024-0039",
      status: "Approved",
      vehicle: "Audi A4 - MN-012-OP",
      client: "Sophie Bernard",
    },
    {
      number: "#2024-0038",
      status: "Rejected",
      vehicle: "Mercedes C-Class - QR-345-ST",
      client: "Luc Petit",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-success/10 text-success";
      case "In Progress":
        return "bg-info/10 text-info";
      case "Pending":
        return "bg-warning/10 text-warning";
      case "Rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case "info":
        return <Camera className="h-5 w-5 text-info" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/5 border-success/20";
      case "warning":
        return "bg-warning/5 border-warning/20";
      case "info":
        return "bg-info/5 border-info/20";
      default:
        return "bg-muted/5 border-muted/20";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Notifications */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          Notifications from Insurer
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border flex items-start gap-3 ${getNotificationBg(
                notification.type,
              )}`}
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate("/quotes/create")}
            className="h-auto py-6 flex flex-col gap-2 bg-primary hover:bg-primary/90"
          >
            <FileText className="h-6 w-6" />
            <span>Create New Quote</span>
          </Button>
          <Button
            onClick={() => navigate("/clients")}
            variant="secondary"
            className="h-auto py-6 flex flex-col gap-2"
          >
            <Search className="h-6 w-6" />
            <span>Search Client</span>
          </Button>
          <Button
            onClick={() => navigate("/clients")}
            variant="secondary"
            className="h-auto py-6 flex flex-col gap-2"
          >
            <Car className="h-6 w-6" />
            <span>Access Vehicles</span>
          </Button>
        </div>
      </div>

      {/* Recent Quotes */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Quotes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Quote Number
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Vehicle
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Client
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentQuotes.map((quote) => (
                <tr
                  key={quote.number}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-3 px-2 text-sm">{quote.number}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
                        quote.status,
                      )}`}
                    >
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">{quote.vehicle}</td>
                  <td className="py-3 px-2 text-sm">{quote.client}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
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
