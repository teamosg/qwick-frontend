import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
const ImagePreview = ({ url, onRemove }) => (
  <div className="relative aspect-square">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-foreground-strong text-white" />
    </button>
    <img
      src={url}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);
export default function ChatImageInput() {
  const [profilePicture, setProfilePicture] = useState(null);
  return (
    <div className="w-full max-w-40 sticky bottom-0  ">
      <Label htmlFor="profile">Profile Picture</Label>
      <div className="mt-1 w-full">
        {profilePicture ? (
          <ImagePreview
            url={profilePicture}
            onRemove={() => setProfilePicture(null)}
          />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setProfilePicture(imageUrl);
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border border-dashed flex items-center justify-center aspect-square rounded-md focus:outline-none focus:border-border-strong",
                  {
                    "border-foreground-muted bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} id="profile" />
                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
