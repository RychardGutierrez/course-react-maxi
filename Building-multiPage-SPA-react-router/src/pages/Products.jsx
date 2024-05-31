import { Link } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 'p1',
    title: 'Product 1',
  },
  {
    id: 'p2',
    title: 'Product 2',
  },
  {
    id: 'p3',
    title: 'Product 3',
  },
  {
    id: 'p4',
    title: 'Product 4',
  },
];

const Products = () => {
  return (
    <>
      <h1>List of Products</h1>
      <ul>
        {PRODUCTS.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/products/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>

      <p>
        <Link to="/">Go to Home</Link>
      </p>
    </>
  );
};

export default Products;
