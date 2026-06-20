import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | CIÉLIE`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = products.filter((p) => p.slug !== params.slug);
  return <ProductView product={product} related={related} />;
}
