"use client";

import { useState, useEffect } from "react";

interface Apartment {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  address?: string;
  price?: number;
  eloScore: number;
  totalVotes: number;
  wins: number;
  losses: number;
}

interface GameState {
  apartment1: Apartment | null;
  apartment2: Apartment | null;
  loading: boolean;
  voting: boolean;
  lastVote: {
    winner: Apartment | null;
    loser: Apartment | null;
  } | null;
}

export default function ApartmentGame() {
  const [gameState, setGameState] = useState<GameState>({
    apartment1: null,
    apartment2: null,
    loading: true,
    voting: false,
    lastVote: null,
  });

  const fetchNewPair = async () => {
    setGameState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch("/api/apartments/random");
      const data = await response.json();
      if (response.ok) {
        setGameState((prev) => ({
          ...prev,
          apartment1: data.apartment1,
          apartment2: data.apartment2,
          loading: false,
          lastVote: null,
        }));
      } else {
        setGameState((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      setGameState((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleVote = async (winnerId: string, loserId: string) => {
    if (gameState.voting) return;
    setGameState((prev) => ({ ...prev, voting: true }));
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winnerId, loserId }),
      });
      const data = await response.json();
      if (response.ok) {
        setGameState((prev) => ({
          ...prev,
          lastVote: {
            winner: data.winner,
            loser: data.loser,
          },
        }));
        setTimeout(() => {
          fetchNewPair();
        }, 2000);
      } else {
        setGameState((prev) => ({ ...prev, voting: false }));
      }
    } catch (error) {
      setGameState((prev) => ({ ...prev, voting: false }));
    }
  };

  useEffect(() => {
    fetchNewPair();
  }, []);

  if (gameState.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading apartments...</p>
        </div>
      </div>
    );
  }

  if (!gameState.apartment1 || !gameState.apartment2) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No apartments available for voting.</p>
        <button
          onClick={fetchNewPair}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Rate My Dorm</h1>
        <p className="text-gray-600">Choose the better apartment!</p>
      </div>
      {gameState.lastVote && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-center space-x-4">
            <span className="text-green-800 font-medium">
              {gameState.lastVote.winner?.name} won!
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Apartment 1 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={gameState.apartment1.imageUrl}
              alt={gameState.apartment1.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{gameState.apartment1.name}</h3>
              {gameState.apartment1.description && (
                <p className="text-sm opacity-90 mb-2">{gameState.apartment1.description}</p>
              )}
              {gameState.apartment1.address && (
                <p className="text-sm opacity-75 mb-2">{gameState.apartment1.address}</p>
              )}
              <div className="flex items-center space-x-4 text-sm">
                <span>{Math.round(gameState.apartment1.eloScore)} ELO</span>
                <span>{gameState.apartment1.wins}W/{gameState.apartment1.losses}L</span>
                {gameState.apartment1.price && (
                  <span>${gameState.apartment1.price}/mo</span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleVote(gameState.apartment1!.id, gameState.apartment2!.id)}
            disabled={gameState.voting}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-110"
          >
            ❤️
          </button>
        </div>
        {/* VS Divider */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-400 mb-2">VS</div>
            <div className="text-sm text-gray-500">Click to vote</div>
          </div>
        </div>
        {/* Apartment 2 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={gameState.apartment2.imageUrl}
              alt={gameState.apartment2.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{gameState.apartment2.name}</h3>
              {gameState.apartment2.description && (
                <p className="text-sm opacity-90 mb-2">{gameState.apartment2.description}</p>
              )}
              {gameState.apartment2.address && (
                <p className="text-sm opacity-75 mb-2">{gameState.apartment2.address}</p>
              )}
              <div className="flex items-center space-x-4 text-sm">
                <span>{Math.round(gameState.apartment2.eloScore)} ELO</span>
                <span>{gameState.apartment2.wins}W/{gameState.apartment2.losses}L</span>
                {gameState.apartment2.price && (
                  <span>${gameState.apartment2.price}/mo</span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleVote(gameState.apartment2!.id, gameState.apartment1!.id)}
            disabled={gameState.voting}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-110"
          >
            ❤️
          </button>
        </div>
      </div>
      {gameState.voting && (
        <div className="text-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Processing your vote...</p>
        </div>
      )}
    </div>
  );
} 