import { auth } from "@/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div>
      <nav>
        {session?.user?.role === "admin" ? (
          <div>
            <a href="/admin/products">Products</a>
            <a href="/admin/users">Users</a>
          </div>
        ) : (
          <div>
            <a href="/user/profile">Profile</a>
            <a href="/user/orders">Orders</a>
          </div>
        )}
        <a href="/api/auth/signout">Sign Out</a>
      </nav>
      {children}
    </div>
  );
}