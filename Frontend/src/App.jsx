import React, { useState } from "react";
import './App.css'

import CustomerList from "./customerList.jsx";
import SalesList from "./salesList.jsx";
import CustomerByCode from "./customerByCode.jsx";
import SalesReport from "./salesReport.jsx";

function App() {
  const [showCustomers, setShowCustomers] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [customerCode, setCustomerCode] = useState('');
  const [showCustomerByCode, setShowCustomerByCode] = useState(false);

  const buttonShowCustomers = () => {
    setShowCustomers(!showCustomers);
    setShowSales(false);
    setShowReport(false);
    setShowCustomerByCode(false);
  };

  const buttonShowSales = () => {
    setShowSales(!showSales);
    setShowCustomers(false);
    setShowReport(false);
    setShowCustomerByCode(false);
  };

  const buttonShowCustomerByCode = (e) => {
    e.preventDefault();
    if (customerCode) {
      setShowCustomerByCode(!showCustomerByCode);
    }
    setShowCustomers(false);
    setShowSales(false);
    setShowReport(false);
  }

  const buttonShowReport = () => {
    setShowReport(!showReport);
    setShowSales(false);
    setShowCustomers(false);
    setShowCustomerByCode(false);
  };

  return (
    <>   
    <div>
      <h1>WEB - Laboratorio 10</h1>
      <h4 className="subtitle">Daniel Alexander Armas Domínguez - 00232622 - Sección 02</h4>

      <hr></hr>

      <button onClick={buttonShowCustomers}>
        {showCustomers ? "Ocultar clientes" : "Listar clientes"}
      </button>

      <button>
        3 - Registrar venta
      </button>

      <button onClick={buttonShowSales}>
        {showSales ? "Ocultar ventas" : "Listar ventas"}
      </button>

      <form onSubmit={buttonShowCustomerByCode}>
        <input
          type="text"
          placeholder="Código"
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
        />
        <button type="submit">{showCustomerByCode ? "Ocultar" : "Buscar por código"}</button>
      </form>

      <button onClick={buttonShowReport}>
        {showReport ? "Ocultar reporte" : "Mostrar reporte"}
      </button>
    </div>

    <hr></hr>
    
    <p>Resultados:</p>
    <div>
      {showCustomers && <CustomerList />}
      {showSales && <SalesList />}
      {showCustomerByCode && <CustomerByCode code={customerCode} />}
      {showReport && <SalesReport />}
    </div>
    </>
  )
}

export default App;