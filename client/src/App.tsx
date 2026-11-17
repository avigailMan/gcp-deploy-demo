
import { useEffect, useState } from "react";
import "./App.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const apiBaseUrl = (
        import.meta.env.VITE_API_BASE_URL || ""
      ).replace(/\/$/, "");
      
      const response = await fetch(
        `${apiBaseUrl}/api/products`
      );
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  return (
    <main className="container">
      <header>
        <div>
          <h1>Product Dashboard</h1>
          <p>React + Node.js + GCP</p>
        </div>

        <button onClick={() => void loadProducts()}>
          Refresh
        </button>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="products">
        {products.map((product) => (
          <article className="product" key={product.id}>
            <h2>{product.name}</h2>
            <p>₪{product.price}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
