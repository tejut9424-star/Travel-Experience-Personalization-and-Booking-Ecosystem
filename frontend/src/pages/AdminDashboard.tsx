import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Server, 
  Database, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

interface AdminDashboardProps {
  onNavigate: (tab: string, param?: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { bookings, savedItineraries } = useTrip();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const services = [
    { name: 'Node.js API Gateway', status: 'Healthy', latency: '12ms', uptime: '99.99%', port: 5000 },
    { name: 'FastAPI AI Engine (Py 3.14)', status: 'Healthy', latency: '380ms', uptime: '99.95%', port: 8000 },
    { name: 'PostgreSQL Relational DB', status: 'Healthy', latency: '4ms', uptime: '100%', port: 5432 },
    { name: 'MongoDB Travel Documents', status: 'Healthy', latency: '6ms', uptime: '99.98%', port: 27017 },
    { name: 'Redis Cache & Rate Limiter', status: 'Healthy', latency: '1ms', uptime: '100%', port: 6379 },
    { name: 'Apache Kafka Event Broker', status: 'Healthy', latency: '8ms', uptime: '99.99%', port: 9092 }
  ];

  const auditLogs = [
    { time: '12:45:02', event: 'ItineraryGenerated', detail: 'User Alex Vance generated 7-Day Kyoto Itinerary', level: 'INFO' },
    { time: '12:46:18', event: 'PaymentCaptured', detail: 'Stripe token authorized $1,440 (Hoshinoya Stay)', level: 'SUCCESS' },
    { time: '12:48:30', event: 'KafkaEventDispatched', detail: 'BookingConfirmed event published to topic travel.bookings', level: 'INFO' },
    { time: '12:51:10', event: 'BudgetOptimized', detail: 'AI reduced target budget by 15% (-$297 savings calculated)', level: 'INFO' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Tripora AI Production Operations Center</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-white">
            System Telemetry & Health Audit
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time monitoring of AI inference latency, microservice mesh health, Kafka event pipelines, and verified transactions.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Ecosystem Users</span>
          <p className="text-2xl font-black text-navy-900">14,820</p>
          <p className="text-xs text-emerald-600 font-semibold">+240 signups today</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Gross Booking Volume (GMV)</span>
          <p className="text-2xl font-black text-navy-900">$184,920</p>
          <p className="text-xs text-brand-600 font-semibold">Verified Supplier Settlement</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">AI Synthesized Itineraries</span>
          <p className="text-2xl font-black text-navy-900">3,491</p>
          <p className="text-xs text-purple-600 font-semibold">Avg Latency: 380ms</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Ecosystem Error Rate</span>
          <p className="text-2xl font-black text-emerald-600">0.002%</p>
          <p className="text-xs text-slate-500">Zero Critical Outages</p>
        </div>
      </div>

      {/* Microservice Infrastructure Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-brand-600" />
          <span>Microservice Infrastructure Mesh</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-navy-900">{srv.name}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {srv.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Port: {srv.port}</span>
                <span>Latency: <strong className="text-navy-900 font-mono">{srv.latency}</strong></span>
                <span>Uptime: {srv.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Transaction & Security Audit Stream */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <span>Immutable Audit Log & Kafka Event Stream</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Stream ID: #tripora-audit-live</span>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.map((log, i) => (
            <div key={i} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 text-[11px]">{log.time}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  log.level === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-brand-50 text-brand-800'
                }`}>
                  {log.event}
                </span>
                <span className="text-slate-700 font-medium">{log.detail}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:block">STATUS 200 OK</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
