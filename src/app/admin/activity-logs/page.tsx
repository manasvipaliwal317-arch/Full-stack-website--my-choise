"use client";

import React from "react";
import { ACTIVITY_LOGS } from "@/lib/data";
import { ShieldAlert, Clock, ShieldCheck } from "lucide-react";

export default function AdminActivityLogsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Security Audit Trail</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">System Activity Audit Logs</h1>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/5 border-b border-white/10 text-white font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Action Detail</th>
                <th className="p-4">Executed By</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ACTIVITY_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-white">{log.action}</td>
                  <td className="p-4 text-luxury-gold font-medium">{log.adminName}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10">
                      {log.type}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400 font-mono">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
