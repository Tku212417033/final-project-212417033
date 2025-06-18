"use client";
import { deleteCabin } from "@/lib/actions/cabin.actions_33";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function DeleteCabin() {
  const { id } = useParams();

  async function handleDelete() {
    await deleteCabin(id as string);
    redirect("/admin/cabins");
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Confirm Delete</h1>
      <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
        Delete
      </button>
    </div>
  );
}