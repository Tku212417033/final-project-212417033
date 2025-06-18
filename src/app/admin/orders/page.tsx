import Link from "next/link";
import { getAllOrders, createOrder, updateOrder, deleteOrder } from "@/lib/actions/order.actions_33";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default async function AdminOrdersPage() {
  const { data: orders, totalPages } = await getAllOrders({ page: 1 });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button asChild>
          <Link href="/admin/orders/create">Create Order</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.product.name}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/orders/${order.id}/edit`}>Edit</Link>
                </Button>
                <form action={async () => {
                  'use server';
                  await deleteOrder(order.id);
                }}>
                  <Button type="submit" variant="destructive" size="sm">
                    Delete
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Create Page (simple form)
export async function CreateOrderPage() {
  return (
    <div>
      <h1>Create Order</h1>
      <form action={async (formData: FormData) => {
        'use server';
        const userId = formData.get("userId") as string;
        const productId = formData.get("productId") as string;
        const quantity = parseInt(formData.get("quantity") as string);
        const total = parseFloat(formData.get("total") as string);
        await createOrder({ userId, productId, quantity, total });
      }}>
        <input name="userId" placeholder="User ID" required />
        <input name="productId" placeholder="Product ID" required />
        <input name="quantity" type="number" placeholder="Quantity" required />
        <input name="total" type="number" step="0.01" placeholder="Total" required />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

// Edit Page (simple form)
export async function EditOrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { user: true, product: true } });
  if (!order) return <div>Order not found</div>;

  return (
    <div>
      <h1>Edit Order</h1>
      <form action={async (formData: FormData) => {
        'use server';
        const quantity = parseInt(formData.get("quantity") as string);
        const total = parseFloat(formData.get("total") as string);
        await updateOrder(order.id, { quantity, total });
      }}>
        <input name="quantity" type="number" defaultValue={order.quantity} required />
        <input name="total" type="number" step="0.01" defaultValue={order.total} required />
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}