"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FiSearch, FiTrash2, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";
import { useRouter } from "next/navigation";
import ownerFechData from "@/app/admin/ownerFetchData";
import toast from "react-hot-toast";
// Dummy users data
const initialUsers = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", role: "user", status: "active", joined: "2025-07-15" },
  { id: "u2", name: "Priya Verma", email: "priya@example.com", role: "user", status: "inactive", joined: "2025-08-02" },
  { id: "u3", name: "Aman Gupta", email: "aman@example.com", role: "user", status: "active", joined: "2025-08-22" },
  { id: "u4", name: "Neha Singh", email: "neha@example.com", role: "user", status: "active", joined: "2025-09-01" },
  { id: "u5", name: "Ravi Kumar", email: "ravi@example.com", role: "user", status: "inactive", joined: "2025-09-08" },
];

function useFilteredSorted(users, { q, role, sortBy }) {
  return useMemo(() => {
    let list = [...users];

    // Search
    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter((u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
    }

    // Role filter
    if (role && role !== "all") {
      list = list.filter((u) => u.role === role);
    }

    // Sort
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "joined") list.sort((a, b) => new Date(b.joined) - new Date(a.joined));

    return list;
  }, [users, q, role, sortBy]);
}

export default function AdminAllUsers() {
  let {owner}= ownerFechData()

  
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [sortBy, setSortBy] = useState("joined");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useFilteredSorted(users, { q, role, sortBy });
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

 const handleDelete = async (_id) => {
  const user = users.find((u) => u._id === _id);
  if (!user) return;

  const ok = confirm(`Are you sure you want to delete user "${user.name}"?`);
  if (!ok) return;

  try {
    const res = await fetch(`/api/user/${_id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`Error: ${err.message || "Failed to delete user"}`);
      return;
    }
    toast.success(" User Delete Successfully !")
    setUsers((prev) => prev.filter((u) => u._id !== _id));
  } catch (error) {
    console.error("Delete error:", error);
    alert("Something went wrong while deleting!");
  }
};


//  ---------------------- get USer all data  -------------------------------------

useEffect(()=>{
    const getUserAllData = async ()=>{
        let res = await fetch("/api/user",{
          method:"GET"
        })
        let data =  await res.json()
         if( data && data.success){
          setUsers(data.data)
         }
    }
    getUserAllData()
},[])


  return (
    <div className="min-h-screen pt-10 pb-15 mt-[-4px] md:pt-20 md:pb-20 text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <p className="text-black font-bold text-3xl mt-2 pb-2">Admin Profile</p>
          <AdminProfileSideBar owner={owner} />
        </aside>

        {/* Content */}
        <main className="lg:col-span-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">All Users</h1>
              <p className="text-sm text-gray-600 mt-1">Manage users — view, edit, or delete accounts</p>
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
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setPage(1);
                }}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="all">All roles</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
                <option value="customer">Customer</option>
              </select>

              {/* <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="joined">Joined Date</option>
                <option value="name">Name</option>
              </select> */}
            </div>
          </div>

          {/* TABLE (Desktop) */}
          <div className="hidden lg:block bg-white rounded-lg shadow p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] table-auto">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="py-3 w-40">ID</th>
                    <th className="py-3 w-60">Name</th>
                    <th className="py-3 w-100">Email</th>
                    <th className="py-3 w-60">Phone</th>
                    <th className="py-3 w-30">Role</th>
                    {/* <th className="py-3 w-30">Status</th> */}
                    <th className="py-3 w-40">Joined</th>
                    <th className="py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((u) => (
                    <tr key={u.id} className="border-b last:border-b-0">
                      <td className="py-4">{u._id ? u._id.slice(-8) : ""}</td>
                      <td className="py-4 font-medium">{u.name}</td>
                      <td className="py-4">{u.email}</td>
                      <td className="py-4">+91 8974563210</td>
                      <td className="py-4">{u.role}</td>
                      {/* <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            u.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td> */}
                      <td className="py-4">{u.joined}</td>
                      <td className="py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* <button title="View" className="p-2 rounded hover:bg-gray-100">
                            <FiEye />
                          </button> */}
                          {/* <button onClick={() => router.push(`/admin/update-user/${u.id}`)} title="Edit" className="p-2 rounded hover:bg-gray-100">
                            <CiEdit />
                          </button> */}
                          <button onClick={() => handleDelete(u._id)} className="p-2 rounded hover:bg-red-50 text-red-500">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pageItems.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-6 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD grid (Mobile + Tablet) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageItems.map((u) => (
              <article key={u.id} className="bg-white border rounded-lg shadow-sm p-4">
                <h3 className="font-semibold">{u.name}</h3>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-sm text-gray-500">+91 9874563210</p>
                <p className="text-sm">Role: {u.role}</p>
                <p className="text-sm">Joined: {u.joined}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {u.status}
                </span>
                <div className="flex justify-end items-center gap-2 mt-3">
                  {/* <button className="px-2 py-1 rounded bg-gray-100 text-sm">View</button> */}
                  {/* <button onClick={() => router.push(`/admin/update-user/${u.id}`)} className="px-2 py-1 rounded bg-gray-100 text-sm">
                    Edit
                  </button> */}
                  <button onClick={() => handleDelete(u.id)} className="px-2 py-1 rounded bg-red-50 text-red-500 text-sm">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <strong>{(page - 1) * perPage + 1}</strong> - <strong>{Math.min(page * perPage, filtered.length)}</strong> of{" "}
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
