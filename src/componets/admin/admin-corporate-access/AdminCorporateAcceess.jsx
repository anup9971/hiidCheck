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

// Dummy Data
const initialCorporates = [
  {
    id: "c1",
    name: "Tech Mahindra",
    industry: "IT Services",
    employees: 2000,
    status: "enabled",
    logo: "/corporates/corp1.png",
  },
  {
    id: "c2",
    name: "HDFC Bank",
    industry: "Banking",
    employees: 5000,
    status: "disabled",
    logo: "/corporates/corp2.png",
  },
  {
    id: "c3",
    name: "Tata Steel",
    industry: "Manufacturing",
    employees: 800,
    status: "enabled",
    logo: "/corporates/corp3.png",
  },
];

function useFilteredSorted(corporates, { q, sortBy }) {
  return useMemo(() => {
    let list = [...corporates];
    if (q?.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.industry.toLowerCase().includes(term)
      );
    }
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "employees") list.sort((a, b) => b.employees - a.employees);
    return list;
  }, [corporates, q, sortBy]);
}

export default function AdminCorporateAcceess() {
  const [corporates, setCorporates] = useState(initialCorporates);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useFilteredSorted(corporates, { q, sortBy });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const handleToggleStatus = (id) => {
    setCorporates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "enabled" ? "disabled" : "enabled" }
          : c
      )
    );
  };

  const handleDelete = (id) => {
    const corp = corporates.find((c) => c.id === id);
    if (!corp) return;
    const ok = confirm(`Delete "${corp.name}" ?`);
    if (!ok) return;
    setCorporates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen pt-16 pb-20 text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="pb-5 font-bold text-3xl">Admin Dashboard</p>
          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        {/* Main */}
        <main className="lg:col-span-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                All Corporates
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage corporate partners — enable/disable or delete
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
                  placeholder="Search by name or industry"
                />
              </div>

              {/* Sort */}
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
                  <th className="py-3">Industry</th>
                  <th className="py-3">Employees</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((c) => (
                  <tr key={c.id} className="border-b last:border-b-0">
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="font-medium">{c.name}</span>
                    </td>
                    <td className="py-4">{c.industry}</td>
                    <td className="py-4">{c.employees}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          c.status === "enabled"
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
                          onClick={() => handleToggleStatus(c.id)}
                          className={`px-3 py-1 rounded text-white ${
                            c.status === "enabled"
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {c.status === "enabled" ? "Disable" : "Enable"}
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
                    <td
                      colSpan={8}
                      className="py-8 text-center text-gray-500"
                    >
                      No corporates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CARD Grid (Mobile + Tablet) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageItems.map((c) => (
              <article
                key={c.id}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-3 flex flex-col items-center">
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.industry}</p>
                  <p className="text-xs text-gray-400">
                    {c.employees} employees
                  </p>
                  <span
                    className={`mt-2 px-3 py-1 rounded-full text-sm ${
                      c.status === "enabled"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleToggleStatus(c.id)}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        c.status === "enabled"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {c.status === "enabled" ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 bg-red-100 text-red-500 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
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
