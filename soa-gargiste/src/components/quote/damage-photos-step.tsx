import { Button } from "@/components/ui/button";
import { Camera, Lightbulb, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface DamagePhotosStepProps {
  data: {
    photos: File[];
  };
  updateData: (data: any) => void;
}

export function DamagePhotosStep({ data, updateData }: DamagePhotosStepProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // Validate file types
    const validFiles = files.filter((file) => {
      const isValid = file.type.startsWith("image/");
      if (!isValid) {
        toast.error(`${file.name} is not a valid image file`);
      }
      return isValid;
    });

    // Validate file sizes (max 10MB)
    const sizedFiles = validFiles.filter((file) => {
      const isValidSize = file.size <= 10 * 1024 * 1024;
      if (!isValidSize) {
        toast.error(`${file.name} is too large (max 10MB)`);
      }
      return isValidSize;
    });

    if (sizedFiles.length === 0) return;

    const newPhotos = [...data.photos, ...sizedFiles];
    updateData({ photos: newPhotos });

    // Create previews
    sizedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    toast.success(`${sizedFiles.length} photo(s) added`);
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    updateData({ photos: newPhotos });
    setPreviews(newPreviews);
    toast.success("Photo removed");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
      handleFileSelect({ target: fileInputRef.current } as any);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-info/5 rounded-lg border border-info/20">
        <div className="p-2 bg-info/10 rounded-lg">
          <Camera className="h-5 w-5 text-info" />
        </div>
        <div>
          <h3 className="font-semibold">Upload Damage Photos</h3>
          <p className="text-sm text-muted-foreground">
            Add photos of the vehicle damage
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <button
        type="button"
        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-muted rounded-full">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Drag and drop photos here</p>
            <p className="text-xs text-muted-foreground mt-1">or</p>
          </div>
          <Button type="button" className="bg-primary hover:bg-primary/90">
            <Camera className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, HEIC (Max 10MB per file)
          </p>
        </div>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Uploaded Photos Grid */}
      {previews.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Uploaded Photos</h3>
            <span className="text-sm text-muted-foreground">
              {previews.length} photos
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Damage ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg border border-border"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhoto(index);
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {data.photos[index]?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="flex items-start gap-3 p-4 bg-warning/5 rounded-lg border border-warning/20">
        <Lightbulb className="h-5 w-5 text-warning mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Add multiple angles of the damage for better
          assessment by the insurer
        </p>
      </div>
    </div>
  );
}
