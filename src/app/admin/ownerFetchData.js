"use client";
import { useState, useEffect } from "react";

export default function ownerFechData() {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const owner_id =
      typeof window !== "undefined" ? localStorage.getItem("owner_id") : null;

    const fetchOwner = async () => {
      if (!owner_id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/owner/${owner_id}`);
        const data = await res.json();
        setOwner(data);
      } catch (err) {
        console.error("Error fetching owner data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, []);

  return { owner, loading };
}
