// import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Product from './products';
// import Table from './curdoperations';
// import BarChart from './barchart';
// import DonutChart from './donut_chart';
// import PieChart from './piechart';
// import Navbar from './Navbar';
// import Todo from './todo';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route exact path="/" element={<Product />} />
//           <Route path="/table" element={<Table />} />
//           <Route path="/barchart" element={<BarChart />} />
//           <Route path="/donutchart" element={<DonutChart />} />
//           <Route path="/piechart" element={<PieChart />} />
//         </Routes>
//       </div>
//     </Router>
//     // <Todo/>

//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Form1 from './client/form';
import ViewRecipes from './client/view-recipes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form1/>} />
        <Route path="/view-recipes" element={<ViewRecipes />} />
      </Routes>
    </Router>
  )
}