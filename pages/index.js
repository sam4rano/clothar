
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import data from "../utils/data";






export default function Home() {
  return (
    <>
      <Layout title="Home Page">
        <h2 className="h2 my-4">Latest Products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols lg:grid-cols-4">
          {data.products.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
            ></ProductItem>
          ))}
          {/* {data.products.map((product) => {
            <ProductItem product={product} key={product.slug}></ProductItem>;
          })} */}
        </div>
      </Layout>
    </>
  );
}
