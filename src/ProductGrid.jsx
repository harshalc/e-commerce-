import React, { useEffect, useState } from 'react';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import './ProductGrid.css';

// Simulated fetchData function for large datasets
const fetchData = async () => {
  const data = Array.from({ length: 10000 }, (_, index) => ({
    id: index,
    name: `Product ${index + 1}`,
    price: (index + 1) * 5,
    category: `Category ${index % 5}`,
  }));
  return data;
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data);
    };
    getProducts();
  }, []);

  // Render each product
  const renderProduct = ({ index, key, style }) => {
    const product = products[index];
    return (
      <div key={key} style={style} className="product-card">
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
      </div>
    );
  };

  return (
    <div className="product-grid-container">
      <div className="sort-options">
        {/* Sorting options can be added here */}
      </div>
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                autoHeight
                height={height}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                rowCount={products.length}
                rowHeight={150} // Adjust the height of each row
                rowRenderer={renderProduct}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
};

export default ProductGrid;
