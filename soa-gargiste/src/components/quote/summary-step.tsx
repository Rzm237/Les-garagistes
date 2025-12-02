import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Camera,
  Car,
  CheckCircle,
  Save,
  Send,
  User,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SummaryStepProps {
  data: {
    claimNumber: string;
    insuranceNumber: string;
    incidentDate: string;
    damageDescription: string;
    photos: File[];
    repairLines: Array<{
      id: string;
      designation: string;
      type: "Part" | "Labor";
      quantity: number;
      unitCost: number;
      total: number;
    }>;
  };
}

export function SummaryStep({ data }: SummaryStepProps) {
  const navigate = useNavigate();

  const client = {
    name: "Jean Dupont",
    phone: "+33 6 12 34 56 78",
    email: "jean.dupont@email.com",
  };

  const vehicle = {
    model: "Renault Clio V",
    registration: "AB-123-CD",
    year: "2021",
  };

  const subtotal = data.repairLines.reduce((sum, line) => sum + line.total, 0);
  const vat = subtotal * 0.2;
  const totalAmount = subtotal + vat;

  const handleSaveDraft = () => {
    toast.success("Quote saved as draft");
    navigate("/dashboard");
  };

  const handleSendToInsurer = () => {
    toast.success("Quote sent to insurer successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
        <h2 className="text-2xl font-bold mb-2">Summary & Review</h2>
        <p className="text-sm text-muted-foreground">
          Step 4 of 4 - Please review all information carefully before sending
          to the insurer
        </p>
      </div>

      {/* Quote Information */}
      <div className="p-6 bg-card border border-border rounded-lg space-y-6">
        <h3 className="text-lg font-semibold">Quote Information</h3>

        {/* Client */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Client</h4>
          </div>
          <div className="pl-7 space-y-1 text-sm">
            <p>{client.name}</p>
            <p className="text-muted-foreground">{client.phone}</p>
            <p className="text-muted-foreground">{client.email}</p>
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Car className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Vehicle</h4>
          </div>
          <div className="pl-7 space-y-1 text-sm">
            <p>{vehicle.model}</p>
            <p className="text-muted-foreground">{vehicle.registration}</p>
            <p className="text-muted-foreground">Year: {vehicle.year}</p>
          </div>
        </div>

        {/* Claim */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Claim</h4>
          </div>
          <div className="pl-7 space-y-1 text-sm">
            <p>
              <span className="text-muted-foreground">Claim Number:</span>{" "}
              {data.claimNumber}
            </p>
            <p>
              <span className="text-muted-foreground">Insurance File:</span>{" "}
              {data.insuranceNumber}
            </p>
            <p>
              <span className="text-muted-foreground">Date:</span>{" "}
              {new Date(data.incidentDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Damage Description */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Damage Description</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {data.damageDescription}
        </p>
      </div>

      {/* Damage Photos */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Damage Photos{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({data.photos.length} photos)
            </span>
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {data.photos.slice(0, 3).map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={photo.name}
                className="w-full h-32 object-cover rounded-lg border border-border"
              />
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {photo.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Repair Lines */}
      <div className="p-6 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Repair Lines</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">
                  Designation
                </th>
                <th className="text-left py-2 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-center py-2 text-sm font-medium text-muted-foreground">
                  Quantity
                </th>
                <th className="text-right py-2 text-sm font-medium text-muted-foreground">
                  Unit Cost
                </th>
                <th className="text-right py-2 text-sm font-medium text-muted-foreground">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data.repairLines.map((line) => (
                <tr
                  key={line.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2 text-sm">{line.designation}</td>
                  <td className="py-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                        line.type === "Part"
                          ? "bg-info/10 text-info"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {line.type}
                    </span>
                  </td>
                  <td className="py-2 text-sm text-center">{line.quantity}</td>
                  <td className="py-2 text-sm text-right">
                    €{line.unitCost.toFixed(2)}
                  </td>
                  <td className="py-2 text-sm text-right">
                    €{line.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-2 max-w-xs ml-auto border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (20%):</span>
            <span>€{vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span>€{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleSaveDraft} variant="outline" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
        <Button
          onClick={handleSendToInsurer}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          <Send className="h-4 w-4 mr-2" />
          Send to Insurer
        </Button>
      </div>

      {/* Final Note */}
      <div className="flex items-start gap-3 p-4 bg-success/5 rounded-lg border border-success/20">
        <CheckCircle className="h-5 w-5 text-success mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Please review all information carefully before sending to the insurer
        </p>
      </div>
    </div>
  );
}
