import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Lightbulb, Plus, Trash2, Wrench } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RepairLine {
  id: string;
  designation: string;
  type: "Part" | "Labor";
  quantity: number;
  unitCost: number;
  total: number;
}

interface RepairLinesStepProps {
  data: {
    repairLines: RepairLine[];
  };
  updateData: (data) => void;
}

export function RepairLinesStep({ data, updateData }: RepairLinesStepProps) {
  const [newLine, setNewLine] = useState({
    designation: "",
    type: "Part" as "Part" | "Labor",
    quantity: 0,
    unitCost: 0,
  });

  const handleAddLine = () => {
    if (
      !newLine.designation ||
      newLine.quantity <= 0 ||
      newLine.unitCost <= 0
    ) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    const line: RepairLine = {
      id: Date.now().toString(),
      ...newLine,
      total: newLine.quantity * newLine.unitCost,
    };

    updateData({ repairLines: [...data.repairLines, line] });
    setNewLine({ designation: "", type: "Part", quantity: 0, unitCost: 0 });
    toast.success("Repair line added");
  };

  const handleRemoveLine = (id: string) => {
    updateData({
      repairLines: data.repairLines.filter((line) => line.id !== id),
    });
    toast.success("Repair line removed");
  };

  const subtotal = data.repairLines.reduce((sum, line) => sum + line.total, 0);
  const vat = subtotal * 0.2;
  const totalAmount = subtotal + vat;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-info/5 rounded-lg border border-info/20">
        <div className="p-2 bg-info/10 rounded-lg">
          <Wrench className="h-5 w-5 text-info" />
        </div>
        <div>
          <h3 className="font-semibold">Add Repair Line</h3>
          <p className="text-sm text-muted-foreground">
            Enter the details of the repair or part
          </p>
        </div>
      </div>

      {/* Add Line Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="designation">
            Designation <span className="text-destructive">*</span>
          </Label>
          <Input
            id="designation"
            placeholder="e.g., Front bumper replacement"
            value={newLine.designation}
            onChange={(e) =>
              setNewLine({ ...newLine, designation: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">
            Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={newLine.type}
            onValueChange={(value: "Part" | "Labor") =>
              setNewLine({ ...newLine, type: value })
            }
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Part">Part (Pièce)</SelectItem>
              <SelectItem value="Labor">Labor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">
            Quantity <span className="text-destructive">*</span>
          </Label>
          <Input
            id="quantity"
            type="number"
            min="0"
            value={newLine.quantity || ""}
            onChange={(e) =>
              setNewLine({ ...newLine, quantity: Number(e.target.value) })
            }
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="unitCost">
            Unit Cost (€) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="unitCost"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={newLine.unitCost || ""}
            onChange={(e) =>
              setNewLine({ ...newLine, unitCost: Number(e.target.value) })
            }
          />
        </div>

        <div className="md:col-span-2 flex items-end">
          <Button
            type="button"
            onClick={handleAddLine}
            className="w-full bg-success hover:bg-success/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Line
          </Button>
        </div>
      </div>

      {/* Repair Lines Table */}
      {data.repairLines.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Repair Lines</h3>
            <span className="text-sm text-muted-foreground">
              {data.repairLines.length} lines
            </span>
          </div>

          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium">
                    Designation
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium">
                    Type
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium">
                    Unit Cost
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium">
                    Total
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.repairLines.map((line) => (
                  <tr key={line.id} className="border-t border-border">
                    <td className="py-3 px-4 text-sm">{line.designation}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                          line.type === "Part"
                            ? "bg-info/10 text-info"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {line.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      {line.quantity}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      €{line.unitCost.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium">
                      €{line.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveLine(line.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">VAT (20%):</span>
              <span className="font-medium">€{vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
              <span>Total Amount:</span>
              <span>€{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="flex items-start gap-3 p-4 bg-warning/5 rounded-lg border border-warning/20">
        <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Add all necessary parts and labor to ensure an
          accurate quote
        </p>
      </div>
    </div>
  );
}
