"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { 
  Image as ImageIcon, 
  Camera, 
  User, 
  Activity, 
  Video, 
  Lock, 
  Trash2, 
  Save, 
  ChevronDown,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <DashboardShell>
      <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-6">
        
        {/* SECTION: Cover Photo */}
        <section className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#1db954]" /> Cover Photo
            </h2>
            <button className="text-sm font-medium text-[var(--text-subdued)] hover:text-white transition">
              Change Cover
            </button>
          </div>
          <div className="w-full h-32 md:h-48 rounded-lg overflow-hidden bg-gradient-to-r from-[#1db954] to-black mb-2 relative group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1518605368461-1e1e11af2817?q=80&w=1200&h=400&auto=format&fit=crop" 
              alt="Cover" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
            />
          </div>
          <p className="text-xs text-[var(--text-subdued)]">Recommended size: 1200x400px. Max 10MB.</p>
        </section>

        {/* SECTION: Profile Photo */}
        <section className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-bold flex items-center gap-2 mb-6">
            <Camera className="w-5 h-5 text-[var(--text-subdued)]" /> Profile Photo
          </h2>
          <div className="flex items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=256&h=256&auto=format&fit=crop"
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-[#2a2a2a] object-cover"
            />
            <div className="flex flex-col gap-1">
              <button className="text-sm font-bold text-white hover:text-[#1db954] transition text-left">
                Select New Photo
              </button>
              <p className="text-xs text-[var(--text-subdued)]">JPG, JPEG, PNG up to 5MB.</p>
            </div>
          </div>
        </section>

        {/* SECTION: Account Information */}
        <section className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-bold flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-[#8b5cf6]" /> Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Full Name</label>
              <input 
                type="text" 
                defaultValue=""
                className="w-full bg-transparent border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Email Address</label>
              <input 
                type="email" 
                defaultValue=""
                className="w-full bg-transparent border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
          </div>
        </section>

        {/* SECTION: Athletic Profile */}
        <section className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-bold flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-[#3b82f6]" /> Athletic Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Date of Birth</label>
              <input 
                type="date" 
                defaultValue=""
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Current Club</label>
              <input 
                type="text" 
                defaultValue=""
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Location (City, Country)</label>
              <input 
                type="text" 
                defaultValue=""
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Availability Status</label>
              <div className="relative">
                <select className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:border-[#1db954]">
                  <option>Under Contract</option>
                  <option>Free Agent</option>
                  <option>Open to Offers</option>
                </select>
                <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[var(--text-subdued)] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm text-[var(--text-subdued)] font-medium">Primary Position</label>
            <div className="relative">
              <select className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:border-[#1db954]">
                <option>Attacking Midfielder</option>
                <option>Central Midfielder</option>
                <option>Winger</option>
              </select>
              <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[var(--text-subdued)] pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Height (cm)</label>
              <input 
                type="number" 
                defaultValue=""
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Weight (kg)</label>
              <input 
                type="number" 
                defaultValue=""
                className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-subdued)] font-medium">Dominant Foot</label>
              <div className="relative">
                <select className="w-full bg-[#121212] border border-[#333] rounded-lg px-4 py-2 text-white appearance-none focus:outline-none focus:border-[#1db954]">
                  <option>Right</option>
                  <option>Left</option>
                  <option>Both</option>
                </select>
                <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-[var(--text-subdued)] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-md hover:bg-gray-200 transition">
              <Save className="w-4 h-4" /> Save Profile Info
            </button>
          </div>
        </section>

        {/* SECTION: Manage Videos */}
        <section className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-bold flex items-center gap-2 mb-6">
            <Video className="w-5 h-5 text-[#a855f7]" /> Manage Videos
          </h2>
          
          <div className="space-y-4">
            {/* Video Item 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#222] border border-[#333] rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-black rounded-md flex-shrink-0 relative overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1574629810360-7efbb2bbc9ac?q=80&w=200&h=150&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="thumbnail" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">My edit</h4>
                  <p className="text-[11px] text-[var(--text-subdued)] mt-1">2/10/2026</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-1.5 bg-[#3f2121] text-red-400 text-sm font-medium rounded-md hover:bg-red-900/40 transition border border-red-900/50">
                Delete <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Video Item 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#222] border border-[#333] rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-black rounded-md flex-shrink-0 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=200&h=150&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="thumbnail" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Match Highlights</h4>
                  <p className="text-[11px] text-[var(--text-subdued)] mt-1">2/10/2026</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-1.5 bg-[#3f2121] text-red-400 text-sm font-medium rounded-md hover:bg-red-900/40 transition border border-red-900/50">
                Delete <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION: Security */}
        <section className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-[#ef4444] font-bold flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5" /> Security
          </h2>
          
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white font-medium">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-transparent border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white font-medium">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-transparent border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-white font-medium">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#1db954]"
              />
            </div>

            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3f2121] text-red-400 font-medium rounded-md hover:bg-red-900/40 transition border border-red-900/50 mt-2 w-fit">
              <Lock className="w-4 h-4" /> Update Password
            </button>
          </div>
        </section>

      </main>
    </DashboardShell>
  );
}