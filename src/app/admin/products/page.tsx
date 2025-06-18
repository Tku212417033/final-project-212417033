import Link from "next/link";
import { getAllProducts } from "@/lib/actions/product.actions_33";

export default async function AdminProductsPage() {
  const { data } = await getAllProducts({ page: 1 });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Link href="/admin/products/create" className="bg-gray-200 p-2 rounded mb-4 inline-block">
        Create Product
      </Link>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id} className="bg-gray-700 text-white">
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">{product.rating.toFixed(1)}</td>
              <td className="border p-2">
                <Link href={`/admin/products/${product.id}/edit`} className="text-blue-400 mr-2">
                  Edit
                </Link>
                <a href={`/admin/products/${product.id}/delete`} className="text-red-400">
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}