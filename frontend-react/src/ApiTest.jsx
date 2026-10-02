import React, { useEffect, useState } from "react";

function ApiTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Users, setUser] = useState([]);
  async function fetchUsers() {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!response.ok) {
        throw new Error("HTTP Error Occured.");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        Users.map((user) => <p key={user.id}>{user.name}</p>)}
    </div>
  );
}

export default ApiTest;
