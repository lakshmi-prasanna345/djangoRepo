
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barchart from './barchart';
import PieChart from './piechart';
import DonutChart from './donut_chart';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Product() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedCondition,setSelectedCondition]=useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/get/")
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const updateQuantity = (productId, action) => {
    axios.put(`http://127.0.0.1:8000/products/update_quantity/${productId}/`, { action })
      .then(res => {
        // Update the quantity locally in the state
        setData(prevData => {
          const updatedData = prevData.map(product => {
            if (product.id === productId) {
              const updatedProduct = { ...product, quantity: res.data.quantity };
              return updatedProduct;
            }
            return product;
          });
          return updatedData;
        });
      })
      .catch(err => console.log(err));
  };
  const calculateGrandTotal = () => {
    let total = 0;
    data.forEach(product => {
      total += product.price * product.quantity;
    });
    return total;
  };
  const handleSearch = () => {
    // Fetch data based on the search query
    axios.get(`http://127.0.0.1:8000/products/search/?search=${searchQuery}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [selectedCondition]);

  const fetchData = () => {
    let url = "http://127.0.0.1:8000/dropdown/";
    if (selectedCondition) {
      url += `?selectedCondition=${selectedCondition}`;
    }
    console.log(url)
    axios.get(url)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <center>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary mt-2">
            Search
          </button>
        </div>
        <div>
        <DropdownButton id="dropdown-basic-button" title="Range">
          <Dropdown.Item onClick={() => setSelectedCondition('0-1000')}>between 0-1000</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCondition('1000-1500')}>between 1000-1500</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCondition('1500-2000')}>between 1500-2000</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCondition('2000-3000')}>between 2000-3000</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCondition('3000-4000')}>between 3000-4000</Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCondition('>4000')}>greater than 4000</Dropdown.Item>
        </DropdownButton>
        </div>
        <table className='table table-striped mt-5' style={{ width: "70%" }}>
          <thead className='table-dark'>
            <tr>
              <td>s.no</td>
              <td>Image</td>
              <td>Product name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><img className="rounded-circle" src={product.pimage} alt="Product" style={{ width: "40px" }} /></td>
                <td>{product.pname}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className='btn btn-primary'
                    onClick={() => updateQuantity(product.id, 'decrement')}
                  >
                    -
                  </button>
                  {product.quantity} {/* Display the product's quantity */}
                  <button
                    className='btn btn-primary'
                    onClick={() => updateQuantity(product.id, 'increment')}
                  >
                    +
                  </button>
                </td>
                <td>{product.price * product.quantity}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-end">Grand Total:</td>
              <td>{calculateGrandTotal()}</td>
            </tr>
          </tbody>
        </table>
      </center>
      <div>
        <Barchart />
        <PieChart />
        <DonutChart />
      </div>
    </div>
  );
}

export default Product;
