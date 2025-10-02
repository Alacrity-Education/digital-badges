"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageUploadControl({
  existingImageUrl,
}: {
  existingImageUrl: string | null;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(existingImageUrl);

  useEffect(() => {
    const uploadToBucket = async () => {
      if (image) {
        //upload image to server through api
        const formData = new FormData();
        formData.append("image", image);
        const res = await fetch("/api/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setUrl(data.url);
        console.log(data);
      }
    };
    uploadToBucket();
  }, [image]);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Badge Image</legend>
      <label
        htmlFor="badge-image-control"
        className="h-32 w-32 rounded-full hover:shadow-2xl transition-all shadow-md border-2 border-base-content/50"
      >
        <Image
          alt="badge-image"
          height={500}
          width={500}
          src={
            image
              ? URL.createObjectURL(image)
              : url
                ? url
                : "https://placehold.co/500x500/png"
          }
          className="h-full w-full object-cover rounded-full"
        />
      </label>

      <input
        id={"badge-image-control"}
        type="file"
        className="hidden"
        value={""}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
        accept="image/*"
      />
      <input
        onChange={() => {}}
        required
        type="hidden"
        name="imageUrl"
        value={url || ""}
      />
    </fieldset>
  );
}
