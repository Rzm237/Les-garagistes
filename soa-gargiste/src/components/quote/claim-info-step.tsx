import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";

interface ClaimInfoStepProps {
  data: {
    claimNumber: string;
    insuranceNumber: string;
    incidentDate: string;
    damageDescription: string;
  };
  updateData: (data) => void;
}

export function ClaimInfoStep({ data, updateData }: ClaimInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-info/5 rounded-lg border border-info/20">
        <div className="p-2 bg-info/10 rounded-lg">
          <Info className="h-5 w-5 text-info" />
        </div>
        <div>
          <h3 className="font-semibold">Claim Information</h3>
          <p className="text-sm text-muted-foreground">
            Enter the details of the insurance claim
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="claimNumber">
            Claim Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="claimNumber"
            placeholder="e.g., CLM-2024-00123"
            value={data.claimNumber}
            onChange={(e) => updateData({ claimNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="insuranceNumber">
            Insurance File Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="insuranceNumber"
            placeholder="e.g., INS-2024-45678"
            value={data.insuranceNumber}
            onChange={(e) => updateData({ insuranceNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="incidentDate">
            Date of Incident <span className="text-destructive">*</span>
          </Label>
          <Input
            id="incidentDate"
            type="date"
            value={data.incidentDate}
            onChange={(e) => updateData({ incidentDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="damageDescription">
            Damage Description / Observations{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="damageDescription"
            placeholder="Describe the damage and any relevant observations..."
            rows={5}
            value={data.damageDescription}
            onChange={(e) => updateData({ damageDescription: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
