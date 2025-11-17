import React, { useEffect, useState } from "react";

import { PORT } from "../../Backend/Keys/keys.js";

const CustomerByCode = ({ code }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:${PORT}/api/customers/${code}`);
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
  }, [code]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || Object.keys(data).length === 0) {
    return <p>No se encontró al cliente</p>;
  };

  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Código</th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.address}</td>
            <td>{c.phone}</td>
            <td>{c.code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerByCode;