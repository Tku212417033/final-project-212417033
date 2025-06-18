import Link from "next/link";
import { getAllReviews, createReview, updateReview, deleteReview } from "@/lib/actions/review.actions_33";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default async function AdminReviewsPage() {
  const { data: reviews, totalPages } = await getAllReviews({ page: 1 });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <Button asChild>
          <Link href="/admin/reviews/create">Create Review</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell>{review.product.name}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/reviews/${review.id}/edit`}>Edit</Link>
                </Button>
                <form action={async () => {
                  'use server';
                  await deleteReview(review.id);
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
export async function CreateReviewPage() {
  return (
    <div>
      <h1>Create Review</h1>
      <form action={async (formData: FormData) => {
        'use server';
        const productId = formData.get("productId") as string;
        const rating = parseFloat(formData.get("rating") as string);
        const comment = formData.get("comment") as string;
        await createReview({ productId, rating, comment });
      }}>
        <input name="productId" placeholder="Product ID" required />
        <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating" required />
        <input name="comment" placeholder="Comment" required />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

// Edit Page (simple form)
export async function EditReviewPage({ params }: { params: { id: string } }) {
  const review = await prisma.review.findUnique({ where: { id: params.id }, include: { product: true } });
  if (!review) return <div>Review not found</div>;

  return (
    <div>
      <h1>Edit Review</h1>
      <form action={async (formData: FormData) => {
        'use server';
        const rating = parseFloat(formData.get("rating") as string);
        const comment = formData.get("comment") as string;
        await updateReview(review.id, { rating, comment });
      }}>
        <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue={review.rating} required />
        <input name="comment" defaultValue={review.comment} required />
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}