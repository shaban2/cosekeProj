import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDataTable() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.18.5:9091/mwe/incoming/`, {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mails Table</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">Document ID</th>
            <th className="border p-2">Created By</th>
            <th className="border p-2">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.documentid}</td>
              <td className="border p-2">{item.created_by}</td>
              <td className="border p-2">{item.date_created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDataTable;
