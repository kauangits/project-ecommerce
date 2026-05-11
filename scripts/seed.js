async function seed() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  console.log("rodando seed...");
  const products = data.products.map((p) => ({
    id: p.id,
    name: p.title,
    price: p.price,
    category: p.category,
    images:
      p.images.length > 1 ? p.images : [p.thumbnail, p.thumbnail, p.thumbnail],
    description: p.description,
    longDescription:
      p.description +
      " Produto de alta qualidade, recomendado para uso contínuo.",
    rating: p.rating,
    stock: p.stock,
    reviews: (p.reviews || []).map((r) => ({
      name: r.reviewerName,
      rating: r.rating,
      comment: r.comment,
    })),
  }));
  console.log(JSON.stringify({ products }, null, 2));
}

seed();
