import React, { useState } from "react";
import './App.css'

import CustomerList from "./customerList.jsx";
import RegisterSale from "./registerSale.jsx";
import SalesList from "./salesList.jsx";
import CustomerByCode from "./customerByCode.jsx";
import SalesReport from "./salesReport.jsx";

function App() {
  //2 - Listar clientes
  const [showCustomers, setShowCustomers] = useState(false);
  //3 - Registrar venta
  const [amount, setAmount] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [message, setMessage] = useState("");
  //4 - Listar ventas
  const [showSales, setShowSales] = useState(false);
  //5 - Buscar cliente por código
  const [customerCode, setCustomerCode] = useState('');
  const [showCustomerByCode, setShowCustomerByCode] = useState(false);
  //6 - Mostrar reporte
  const [showReport, setShowReport] = useState(false);

  const buttonShowCustomers = () => {
    setShowCustomers(!showCustomers);
    setMessage("");
    setShowSales(false);
    setShowCustomerByCode(false);
    setShowReport(false);
  };

  const buttonRegisterSale = async (e) => {
    e.preventDefault();
    setShowCustomers(false);
    setShowSales(false);
    setShowCustomerByCode(false);
    setShowReport(false);
    if (!amount || !idCustomer) {
      setMessage("Debe completar todos los campos");
      return;
    }  
    try {
      const result = await RegisterSale(amount, idCustomer);
      setMessage(`Venta registrada con ID: ${result.id}`);
      setAmount("");
      setIdCustomer("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const buttonShowSales = () => {
    setShowCustomers(false);
    setMessage("");
    setShowSales(!showSales);
    setShowCustomerByCode(false);
    setShowReport(false);
  };

  const buttonShowCustomerByCode = (e) => {
    e.preventDefault();
    if (customerCode) {
      setShowCustomerByCode(!showCustomerByCode);
      setMessage("");
    } else {
      setMessage("Debe completar el campo de búsqueda");
    }
    setShowCustomers(false);
    setShowSales(false);
    setShowReport(false);
  }

  const buttonShowReport = () => {
    setShowCustomers(false);
    setMessage("");
    setShowSales(false);
    setShowCustomerByCode(false);
    setShowReport(!showReport);
  };

  return (
    <>   
    <div>
      <h1>WEB - Laboratorio 10</h1>
      <h4 className="subtitle">Daniel Alexander Armas Domínguez - 00232622 - Sección 02</h4>

      <div className="searchSection">
        <hr></hr>

        <button onClick={buttonShowCustomers} className="largeButton">
          {showCustomers ? "Ocultar clientes" : "Listar clientes"}
        </button>

        <form onSubmit={buttonRegisterSale}>
          <input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="ID de Cliente"
            value={idCustomer}
            onChange={(e) => setIdCustomer(e.target.value)}
          />
          <button type="submit">Registrar venta</button>
        </form>

        <button onClick={buttonShowSales} className="largeButton">
          {showSales ? "Ocultar ventas" : "Listar ventas"}
        </button>

        <form onSubmit={buttonShowCustomerByCode}>
          <input className="codigoInput"
            type="text"
            placeholder="Código"
            value={customerCode}
            onChange={(e) => setCustomerCode(e.target.value)}
          />
          <button type="submit">{showCustomerByCode ? "Ocultar" : "Buscar por código"}</button>
        </form>

        <button onClick={buttonShowReport} className="largeButton">
          {showReport ? "Ocultar reporte" : "Mostrar reporte"}
        </button>

        <hr></hr>
      </div>
      
    </div>
    
    <p>Resultados:</p>
    <div>
      {showCustomers && <CustomerList />}
      {message && <p>{message}</p>}
      {showSales && <SalesList />}
      {showCustomerByCode && <CustomerByCode code={customerCode} />}
      {showReport && <SalesReport />}
    </div>
    </>
  )
}

export default App;