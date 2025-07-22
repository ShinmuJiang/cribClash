"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalApartments: number;
  totalVotes: number;
  averageElo: number;
  topElo: number;
}

export default function Stats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/apartments");
      const apartments = await response.json();
      if (response.ok && Array.isArray(apartments)) {
        const totalVotes = apartments.reduce((sum, apt) => sum + apt.totalVotes, 0);
        const averageElo = apartments.length > 0
          ? apartments.reduce((sum, apt) => sum + apt.eloScore, 0) / apartments.length
          : 0;
        const topElo = apartments.length > 0
          ? Math.max(...apartments.map(apt => apt.eloScore))
          : 0;
        setStats({
          totalApartments: apartments.length,
          totalVotes,
          averageElo,
          topElo,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Game Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
            🏠
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalApartments}</div>
          <div className="text-sm text-gray-600">Apartments</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
            🗳️
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalVotes}</div>
          <div className="text-sm text-gray-600">Total Votes</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
            📈
          </div>
          <div className="text-2xl font-bold text-gray-900">{Math.round(stats.averageElo)}</div>
          <div className="text-sm text-gray-600">Avg ELO</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
            🏆
          </div>
          <div className="text-2xl font-bold text-gray-900">{Math.round(stats.topElo)}</div>
          <div className="text-sm text-gray-600">Top ELO</div>
        </div>
      </div>
    </div>
  );
} 