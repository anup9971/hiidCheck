"use client";
import { useState } from "react";
import AdminProfileSideBar from "../admin-dasboard/AdminProfileSideBar";

const initialOwners = [
  { id: "o1", name: "Rahul Sharma", email: "rahul@gmail.com", isEnabled: true },
  { id: "o2", name: "Anita Verma", email: "anita@gmail.com", isEnabled: false },
];

const initialRooms = [
  { id: "r1", name: "Room 101", ownerId: "o1", price: 2000, isEnabled: true },
  { id: "r2", name: "Room 102", ownerId: "o1", price: 2500, isEnabled: true },
  { id: "r3", name: "Room 201", ownerId: "o2", price: 3000, isEnabled: false },
];

export default function AdminAllClientsAccess() {
  const [tab, setTab] = useState("owners");
  const [owners, setOwners] = useState(initialOwners);
  const [rooms, setRooms] = useState(initialRooms);

  const toggleOwner = (ownerId) => {
    setOwners((prev) =>
      prev.map((o) => (o.id === ownerId ? { ...o, isEnabled: !o.isEnabled } : o))
    );

    const owner = owners.find((o) => o.id === ownerId);
    if (owner && owner.isEnabled) {
      setRooms((prev) =>
        prev.map((r) => (r.ownerId === ownerId ? { ...r, isEnabled: false } : r))
      );
    }
  };

  const toggleRoom = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    const owner = owners.find((o) => o.id === room.ownerId);
    if (!owner?.isEnabled) return;
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, isEnabled: !r.isEnabled } : r))
    );
  };

  return (
    <div className="min-h-screen mt-[-4px] pt-20 pb-15 md:pb-25 text-black bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-6">
        <aside className="lg:col-span-2">
          <AdminProfileSideBar user={{ name: "Admin" }} />
        </aside>

        <main className="lg:col-span-4">
          <p className="text-2xl pb-5 font-bold text-center">All Clients Access</p>
          <div className="flex gap-2 mb-6 justify-center">
            {["owners", "rooms"].map((t) => (
              <button
                key={t}
                className={`px-4 py-2 rounded ${tab === t ? "bg-[#5f8575] text-white" : "bg-gray-200"}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Owners */}
          {tab === "owners" && (
            <div>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-white p-4 rounded shadow">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="py-2">Name</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owners.map((o) => (
                      <tr key={o.id} className="border-b text-center">
                        <td className="py-2">{o.name}</td>
                        <td className="py-2">{o.email}</td>
                        <td className="py-2">{o.isEnabled ? "Enabled" : "Disabled"}</td>
                        <td className="py-2">
                          <button
                            onClick={() => toggleOwner(o.id)}
                            className={`px-3 py-1 rounded text-white ${
                              o.isEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {o.isEnabled ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden grid grid-cols-1 gap-4">
                {owners.map((o) => (
                  <div key={o.id} className="bg-white rounded shadow p-4">
                    <p className="font-semibold">{o.name}</p>
                    <p className="text-sm">{o.email}</p>
                    <p className="text-sm mt-1">Status: {o.isEnabled ? "Enabled" : "Disabled"}</p>
                    <button
                      onClick={() => toggleOwner(o.id)}
                      className={`mt-2 px-3 py-1 rounded text-white w-full ${
                        o.isEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {o.isEnabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rooms */}
          {tab === "rooms" && (
            <div>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-white p-4 rounded shadow">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="py-2">Owner</th>
                      <th className="py-2">Room Name</th>
                      <th className="py-2">Price</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((r) => {
                      const owner = owners.find((o) => o.id === r.ownerId);
                      return (
                        <tr key={r.id} className="border-b text-center">
                          <td className="py-2">{owner?.name || "Unknown"}</td>
                          <td className="py-2">{r.name}</td>
                          <td className="py-2">₹{r.price}</td>
                          <td className="py-2">{r.isEnabled ? "Enabled" : "Disabled"}</td>
                          <td className="py-2">
                            <button
                              onClick={() => toggleRoom(r.id)}
                              disabled={!owner?.isEnabled}
                              className={`px-3 py-1 rounded text-white ${
                                r.isEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              {r.isEnabled ? "Disable" : "Enable"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden grid grid-cols-1 gap-4">
                {rooms.map((r) => {
                  const owner = owners.find((o) => o.id === r.ownerId);
                  return (
                    <div key={r.id} className="bg-white rounded shadow p-4">
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-sm">Owner: {owner?.name || "Unknown"}</p>
                      <p className="text-sm">Price: ₹{r.price}</p>
                      <p className="text-sm">Status: {r.isEnabled ? "Enabled" : "Disabled"}</p>
                      <button
                        onClick={() => toggleRoom(r.id)}
                        disabled={!owner?.isEnabled}
                        className={`mt-2 px-3 py-1 rounded text-white w-full ${
                          r.isEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {r.isEnabled ? "Disable" : "Enable"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
