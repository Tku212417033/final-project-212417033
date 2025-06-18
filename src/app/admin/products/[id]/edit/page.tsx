"use client";
import { useState, useEffect } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { updateCabin } from "@/lib/actions/cabin.actions_33";
import { useParams } from "next/navigation";

export default function EditCabin() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { startUpload } = useUploadThing("cabinImage", {
    onClientUploadComplete: (res) => res && setImageUrl(res[0].url),
  });

  useEffect(() => {
    const fetchCabin = async () => {
      const res = await fetch(`/api/cabins/${id}`);
      const cabin = await res.json();
      setName(cabin.name);
      setDescription(cabin.description);
      setPrice(cabin.price);
      setImageUrl(cabin.image?.url || null);
    };
    fetchCabin();
  }, [id]);

  return (
    <form
      action={async () => {
        await updateCabin(id as string, { name, description, price }, imageUrl || undefined);
        alert("Cabin updated");
      }}
      className="p-4"
    >
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border p-2 mb-2 w-full" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 mb-2 w-full" />
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" className="border p-2 mb-2 w-full" />
      <input type="file" onChange={(e) => startUpload([e.target.files?.[0]])} className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Update
      </button>
    </form>
  );
}