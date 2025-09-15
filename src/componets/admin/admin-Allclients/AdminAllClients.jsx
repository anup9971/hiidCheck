"use client";
import { useState, useMemo, useEffect } from "react";
import {

  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";
import toast from "react-hot-toast";

// Dummy clients data

// const initialClients = [
//   { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", property: "Hotel Delhi Airport", status: "active" },
//   { id: 2, name: "Priya Verma", email: "priya@example.com", phone: "9998887777", property: "Goa Beach Resort", status: "active" },
//   { id: 3, name: "Aman Gupta", email: "aman@example.com", phone: "8765432109", property: "Mumbai Business Inn", status: "active" },
//   { id: 4, name: "Neha Singh", email: "neha@example.com", phone: "9988776655", property: "Jaipur Heritage Stay", status: "active" },
//   { id: 5, name: "Ankit Kumar", email: "ankit@example.com", phone: "9123456789", property: "Goa Ocean View", status: "active" },
//   { id: 6, name: "Rohit Yadav", email: "rohit@example.com", phone: "7890654321", property: "Shimla Hill Top", status: "active" },
// ];

function useFilteredSorted(clients, { q, status, sortBy }) {
  return useMemo(() => {
    let list = [...clients];

    // search
    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term)
      );
    }

    // status
    if (status && status !== "all") {
      list = list.filter((c) => c.status === status);
    }

    // sort
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "email") list.sort((a, b) => a.email.localeCompare(b.email));

    return list;
  }, [clients, q, status, sortBy]);
}

export default function AdminAllClients() {
useEffect(() => {
  const getClients = async () => {
    try {
      const res = await fetch("/api/owner", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json(); // <-- await here
      console.log(data);
      
      setClients(data.data)
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  getClients();
}, []);

  const [clients, setClients] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const filtered = useFilteredSorted(clients, { q, status, sortBy });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

const handleDelete = async (_id) => {
  try {
  
    const client = clients.find((c) => c._id === _id);
    if (!client) return;

    const ok = confirm(`Delete "${client.name}" ?`);
    if (!ok) return;

    // Call your API to delete
    alert("You Are Sure Delete this Client ? ") 
    const res = await fetch(`/api/owner/${_id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`Error: ${err.message || "Failed to delete client"}`);
      return;
    }

    // Update state locally only after successful delete
    setClients((prev) => prev.filter((c) => c._id !== _id));

     toast.success("Client deleted successfully ")
  } catch (error) {
    console.error("Delete error:", error);
    alert("Something went wrong while deleting!");
  }
};


  // const handleEdit = (id) => {
  //   alert("Edit client: " + id);
  // };

  return (
    <div className="min-h-screen pt-15 pb-20 md:pt-20  md:pb-40 mt-[-4px] bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="text-black font-bold text-3xl mt-2 pb-2 ">Admin Profile</p>

          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        {/* Clients Content */}
        <main className="lg:col-span-4">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">All Clients</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage clients — view, edit or delete
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Search */}
              <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                <div className="px-3 text-gray-400">
                  <FiSearch />
                </div>
                <input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  className="px-3 py-2 w-44 md:w-64 outline-none"
                  placeholder="Search by name or email"
                />
              </div>

              {/* Filters */}
              {/* <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select> */}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>

          {/* TABLE (Desktop) */}
         <div className="hidden lg:block bg-white rounded-lg shadow p-4 md:p-6 overflow-x-auto">
  <table className="w-full table-auto min-w-[1000px]">
    <thead>
      <tr className="text-left text-sm text-gray-500 border-b">
        <th className="py-3">Name</th>
        <th className="py-3">Email</th>
        <th className="py-3">Phone</th>
        <th className="py-3 w-60 ">Property Name</th>
        <th className="py-3">Status</th>
        <th className="py-3 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pageItems.map((c) => (
        <tr key={c._id} className="border-b last:border-b-0">
          <td className="py-4 font-medium">{c.name}</td>
          <td className="py-4">{c.email}</td>
          <td className="py-4">{c.phone}</td>
          <td className="py-4 w-60">{c.propertyName}</td>
          <td className="py-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                c.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {c.active ? "Active" : "Inactive"}
            </span>
          </td>
          <td className="py-4 text-right">
            <div className="inline-flex items-center gap-2">
              <button
                title="Delete"
                onClick={() => handleDelete(c._id)}
                className="p-2 rounded hover:bg-red-50 text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>
          </td>
        </tr>
      ))}

      {pageItems.length === 0 && (
        <tr>
          <td colSpan={6} className="py-8 text-center text-gray-500">
            No clients found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


          {/* CARD grid (Mobile + Tablet) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageItems.map((c) => (
              <article
                key={c.id}
                className="bg-white border rounded-lg shadow-sm p-4"
              >
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.email}</p>
                <p className="text-sm text-gray-500">📞 {c.phone}</p>
                <p className="text-sm text-gray-500 mt-1">
                  🏨 {c.property}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(c.id)}
                      className="px-2 py-1 rounded bg-gray-100 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-2 py-1 rounded bg-red-50 text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {pageItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">
                No clients found.
              </div>
            )}
          </div>

          {/* pagination */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <strong>{(page - 1) * perPage + 1}</strong> -{" "}
              <strong>{Math.min(page * perPage, filtered.length)}</strong> of{" "}
              <strong>{filtered.length}</strong>
            </div>

            <div className="inline-flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 rounded border bg-white disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              <div className="px-3 py-2 rounded border bg-white">
                Page {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 rounded border bg-white disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
