"use client";
import { uploadimage } from "@/actions/upload-image-action";
import { getImagePath } from "@/src/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadProductImage({
  currentImage,
}: {
  currentImage?: string;
}) {

  const [image, setImage] = useState("");
  //useCallback evita que la funcion se ejecute en cada render
  const onDrop = useCallback(async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    const image = await uploadimage(formData);
    setImage(image);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop: onDrop,
    maxFiles: 1,
  });
  return (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Product Image
        </label>
        <div
          {...getRootProps({
            className: `
            py-20 border-2 border-dashed  text-center 
            ${isDragActive ? "border-gray-900 text-gray-900 bg-gray-200 " : "border-gray-400 text-gray-400 bg-white"} 
            ${isDragReject ? "border-none bg-white" : "cursor-not-allowed"}
        `,
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && <p>Drop Image</p>}
          {isDragReject && <p>Invalid Image</p>}
          {!isDragActive && <p>Drag and Drop here</p>}
        </div>
      </div>
      {/* Si el usuario no ha seleccionado una nueva imagen
→ mostrar la imagen actual

Si selecciona una nueva
→ ocultar la imagen actual */}
      {image && (
        <div className="py-5 space-3">
          <p className="font-bold">Product image:</p>
          <div className="w-75 h-105 relative">
            <Image
              src={image}
              alt="Published image"
              className="object-cover"
              fill
              unoptimized
            />
          </div>
        </div>
      )}

      {currentImage && !image && (
        <div className="py-5 space-3">
          <p className="font-bold">Current image:</p>
          <div className="w-75 h-105 relative">
            <Image
              src={getImagePath(currentImage)}
              alt="Published image"
              className="object-cover"
              fill
              unoptimized
            />
          </div>
        </div>
      )}
      <input
        type="hidden"
        name="image"
        defaultValue={image ? image : currentImage}
      />
    </>
  );
}
