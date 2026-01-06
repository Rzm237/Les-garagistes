import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Save, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function AddVehicle() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [formData, setFormData] = useState({
    registration: "",
    brand: "",
    model: "",
    year: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.registration ||
      !formData.brand ||
      !formData.model ||
      !formData.year
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Vehicle saved successfully!");
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Add Vehicle</h1>

      <Card className="p-8">
        <div className="flex items-start gap-4 mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Car className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Vehicle Information</h2>
            <p className="text-sm text-muted-foreground">
              Fill in the details below to add a new vehicle
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="registration">
              Registration (Immatriculation){" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="registration"
              placeholder="e.g., AB-123-CD"
              value={formData.registration}
              onChange={(e) =>
                setFormData({ ...formData, registration: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">
              Brand (Marque) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="brand"
              placeholder="e.g., Renault, Peugeot, BMW"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">
              Model <span className="text-destructive">*</span>
            </Label>
            <Input
              id="model"
              placeholder="e.g., Clio, 308, X5"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">
              Year <span className="text-destructive">*</span>
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="e.g., 2021"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Vehicle
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/clients/${clientId}`)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>

          <p className="text-xs text-destructive text-center">
            * Required fields must be filled out
          </p>
        </form>
      </Card>
    </div>
  );
}
