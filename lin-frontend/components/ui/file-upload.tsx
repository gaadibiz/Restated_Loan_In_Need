"use client"

import * as React from "react"
import { UploadIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange?: (file: File | null) => void
  accept?: string
  placeholder?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFileChange, accept, placeholder = "Click to upload", ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string>("")

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null
      setFileName(file ? file.name : "")
      onFileChange?.(file)
    }

    return (
      <div className="relative">
        <input
          type="file"
          ref={ref}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept={accept}
          {...props}
        />
        <div
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={cn("text-muted-foreground", fileName && "text-foreground")}>
            {fileName || placeholder}
          </span>
          <UploadIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
