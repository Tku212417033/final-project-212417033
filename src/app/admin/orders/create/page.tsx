"use client";
import { useState } from "react";
import { createOrder } from "@/lib/actions/order.actions_33";
import { useSession } from "next-auth/react";

export default function CreateOrder() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(session?.user?.id || "");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <form
      action={async () => {
        await createOrder(userId, productId, quantity);
        alert("Order created");
      }}
      className="p-4"
    >
      <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="border p-2 mb-2 w-full" />
      <input value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Product ID" className="border p-2 mb-2 w-full" />
      <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Quantity" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create
      </button>
    </form>
  );
}