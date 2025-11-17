import React, { useEffect, useState } from "react";

import { PORT } from "../../Backend/Keys/keys.js";

const SalesList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:${PORT}/api/sales`);
        if (!response.ok) throw new Error("Error al obtener los datos");
        const result = await response.json();
        setData(Array.isArray(result) ? result : result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Cliente</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.amount}</td>
            <td>{s.created_at}</td>
            <td>{s.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesList;