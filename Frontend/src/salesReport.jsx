import React, { useEffect, useState } from "react";

import { PORT } from "../../Backend/Keys/keys.js";

const SalesReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:${PORT}/api/report`);
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
          <th>Cliente</th>
          <th>Total de ventas</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.total_sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesReport;