'use client';

import { Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import type { FileType } from '@/types';
import type { DropzoneOptions } from 'react-dropzone';

import { cn, formatFileSize, wait } from '@/lib/utils';

import { FileThumbnail } from '@/components/file-thumbnail';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { ScrollArea } from '@repo/design-system/components/scroll-area';

export interface FileDropzoneProps extends Partial<DropzoneOptions> {
  className?: string;
  value?: FileType[];
  onFilesChange?: (files: FileType[]) => void;
}

export function FileDropzone({
  className,
  value,
  onFilesChange,
  ...props
}: FileDropzoneProps) {
  const [files, setFiles] = useState<FileType[]>(value || []);
  const [loadingFiles, setLoadingFiles] = useState<Set<string>>(new Set());

  const maxFiles = props.multiple ? props.maxFiles : 1;
  const isDisabled = maxFiles === files.length;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
      setLoadingFiles(new Set(newFiles.map((file) => file.id)));

      // Simulate file processing
      for (const file of newFiles) {
        await wait(2000); // Simulate 2 seconds of processing
        setLoadingFiles((prev) => {
          const newLoadingFiles = new Set(prev);
          newLoadingFiles.delete(file.id);
          return newLoadingFiles;
        });
      }
    },
    [files, onFilesChange]
  );

  useEffect(() => {
    if (value) {
      setFiles(value);
    }
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isDisabled,
    ...props,
    maxFiles,
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((file) => {
      if (file.id === fileId) {
        URL.revokeObjectURL(file.url);
        return false;
      }

      return true;
    });

    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  return (
    <div
      data-slot="file-dropzone"
      {...getRootProps()}
      className={cn(
        'relative flex h-[17.75rem] w-full cursor-pointer rounded-lg border-2 border-muted-foreground border-dashed transition-colors hover:border-primary hover:bg-muted/50',
        isDragActive && 'border-primary bg-muted/50',
        isDisabled && 'cursor-not-allowed',
        className
      )}
    >
      <input {...getInputProps()} />
      <ScrollArea className="w-0 flex-1 p-6">
        {files.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative flex cursor-auto flex-col gap-2 rounded-lg border bg-background p-2"
              >
                {file.type.startsWith('image/') ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={165}
                    height={165}
                    className="pointer-events-none aspect-square self-center rounded object-contain"
                  />
                ) : (
                  <FileThumbnail
                    fileName={file.name}
                    className="aspect-square size-full self-center text-sm"
                  />
                )}
                {loadingFiles.has(file.id) && (
                  <div className="absolute inset-0 flex items-center justify-center rounded bg-background/50">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="truncate font-medium text-sm">{file.name}</p>
                  <p className="font-semibold text-muted-foreground text-xs">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute end-1 top-1 h-4 w-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-2 p-4 text-center">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Drag and drop some files here, or click to select files
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
