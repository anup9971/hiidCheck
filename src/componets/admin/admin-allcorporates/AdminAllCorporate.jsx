"use client";

import { useState, useMemo } from "react";
import {
  FiEdit,
  FiSearch,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

// Dummy Corporates data
const initialCorporates = [
  {
    id: "c1",
    name: "Tata Consultancy Services",
    employees: 500,
    status: "active",
    image: "/corporate/corp1.jpg",
  },
  {
    id: "c2",
    name: "Infosys Ltd",
    employees: 300,
    status: "active",
    image: "/corporate/corp2.jpg",
  },
  {
    id: "c3",
    name: "Wipro Enterprises",
    employees: 200,
    status: "inactive",
    image: "/corporate/corp3.jpg",
  },
  {
    id: "c4",
    name: "HCL Technologies",
    employees: 400,
    status: "active",
    image: "/corporate/corp4.jpg",
  },
];

function useFilteredSorted(corporates, { q, status, sortBy }) {
  return useMemo(() => {
    let list = [...corporates];

    // search
    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(term));
    }

    // status
    if (status && status !== "all") {
      list = list.filter((c) => c.status === status);
    }

    // sort
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "employees") list.sort((a, b) => b.employees - a.employees);

    return list;
  }, [corporates, q, status, sortBy]);
}

export default function AdminCorporatesPage() {
  const [corporates, setCorporates] = useState(initialCorporates);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useFilteredSorted(corporates, { q, status, sortBy });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id) => {
    const corp = corporates.find((c) => c.id === id);
    if (!corp) return;
    const ok = confirm(`Delete "${corp.name}" ? This action cannot be undone.`);
    if (!ok) return;
    setCorporates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleStatus = (id) => {
    setCorporates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen pt-15 md:mt-20 pb-20 md:pb-40 mt-[-4px] text-black bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="pb-5 font-bold text-3xl">Admin Dashboard</p>
          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        {/* Corporates content */}
        <main className="lg:col-span-4">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                All Corporates
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage corporates — view, edit or delete
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
                  placeholder="Search by name"
                />
              </div>

              {/* Filters */}
              <select
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
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="name">Name</option>
                <option value="employees">Employees</option>
              </select>
            </div>
          </div>

          {/* TABLE (Desktop) */}
          <div className="hidden lg:block bg-white rounded-lg shadow p-4 md:p-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3">Corporate</th>
                  <th className="py-3">Hotel Name</th>                 
                  <th className="py-3"> Address</th>

                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((c) => (
                  <tr key={c.id} className="border-b last:border-b-0">
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <span className="font-medium">{c.name}</span>
                    </td>
                    <td className="py-4">{c.employees}</td>
                    <td className="py-4">{c.employees}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          c.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          title="Edit"
                          onClick={() => alert("Edit " + c.id)}
                          className="p-2 rounded hover:bg-gray-100"
                        >
                          <FiEdit />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDelete(c.id)}
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
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No corporates found.
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
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-500">
                    Employees: {c.employees}
                  </p>
                  <div className="flex justify-between mt-2 text-sm text-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        c.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert("Edit " + c.id)}
                        className="px-3 py-1 bg-gray-100 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-1 bg-red-100 text-red-500 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {pageItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">
                No corporates found.
              </div>
            )}
          </div>

          {/* pagination */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <strong>{(page - 1) * perPage + 1}</strong> -{" "}
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
