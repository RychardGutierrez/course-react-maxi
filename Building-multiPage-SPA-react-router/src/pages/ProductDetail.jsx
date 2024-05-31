import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const params = useParams();

  return (
    <>
      <h1>Product Detail {params.id}</h1>
    </>
  );
};

export default ProductDetail;
