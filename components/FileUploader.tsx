"use client";

import React, { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      setUploading(true);

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          if (file.size > MAX_FILE_SIZE) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name),
            );

            return toast({
              description: (
                <p className="body-2 text-white">
                  <span className="font-semibold">{file.name}</span> is too large.
                  Max file size is 50MB.
                </p>
              ),
              className: "error-toast",
            });
          }

          try {
            console.log("Starting upload for file:", file.name);
            const uploadedFile = await uploadFile({ file, ownerId, accountId, path });
            console.log("Upload completed for file:", file.name);

            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
              toast({
                description: (
                  <p className="body-2 text-white">
                    Successfully uploaded <span className="font-semibold">{file.name}</span>
                  </p>
                ),
                className: "success-toast",
              });
            }
          } catch (error) {
            console.error("Upload error for file:", file.name, error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

            // Remove the file from the upload list
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== file.name),
            );

            // Show error toast with specific message
            toast({
              description: (
                <p className="body-2 text-white">
                  Failed to upload <span className="font-semibold">{file.name}</span>
                  <br />
                  <span className="text-sm text-destructive">{errorMessage}</span>
                </p>
              ),
              className: "error-toast",
            });
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Upload process error:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        toast({
          description: (
            <p className="body-2 text-white">
              An error occurred during the upload process
              <br />
              <span className="text-sm text-destructive">{errorMessage}</span>
            </p>
          ),
          className: "error-toast",
        });
      } finally {
        setUploading(false);
      }
    },
    [ownerId, accountId, path, toast],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            toast({
              description: (
                <p className="body-2 text-white">
                  <span className="font-semibold">{file.name}</span> is too large.
                  Max file size is 50MB.
                </p>
              ),
              className: "error-toast",
            });
          } else {
            toast({
              description: (
                <p className="body-2 text-white">
                  Cannot upload <span className="font-semibold">{file.name}</span>
                  <br />
                  <span className="text-sm text-destructive">{error.message}</span>
                </p>
              ),
              className: "error-toast",
            });
          }
        });
      });
    }
  });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className={cn("cursor-pointer", uploading && "opacity-50")}>
      <input {...getInputProps()} />
      <Button
        type="button"
        className={cn("uploader-button", className)}
        disabled={uploading}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />{" "}
        <p>{uploading ? "Uploading..." : "Upload"}</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
