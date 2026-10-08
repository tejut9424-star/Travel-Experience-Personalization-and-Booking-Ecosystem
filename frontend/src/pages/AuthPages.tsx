import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, KeyRound, Smartphone, RefreshCw, AlertCircle, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface AuthPageProps {
  mode?: 'login' | 'register';
  onNavigate: (tab: string, param?: any) => void;
}

export const AuthPages: React.FC<AuthPageProps> = ({ mode = 'login', onNavigate }) => {
  const { login, register, sendOtp, verifyOtp, loginWithOtp, registerWithOtp } = useAuth();
  const [isRegister, setIsRegister] = useState(mode === 'register');
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');

  // Form states
  const [name, setName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@tripora.ai');
  const [phone, setPhone] = useState('+1 (555) 382-9012');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('traveler');

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [generatedOtpDemo, setGeneratedOtpDemo] = useState<string | null>(null);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle OTP digit change & auto jump to next input
  const handleOtpChange = (index: number, val: string) => {
    // If pasted multi-digit value
    if (val.length > 1) {
      const cleanDigits = val.replace(/\D/g, '').slice(0, 6).split('');
      const newDigits = [...otpDigits];
      cleanDigits.forEach((d, i) => {
        if (i < 6) newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(cleanDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const singleDigit = val.replace(/\D/g, '');
    const newDigits = [...otpDigits];
    newDigits[index] = singleDigit;
    setOtpDigits(newDigits);

    if (singleDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setOtpDigits(newDigits);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  // Trigger Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setErrorMessage('Please enter a valid email address first');
      return;
    }
    setErrorMessage(null);
    setIsSendingOtp(true);

    try {
      const purpose = isRegister ? 'register' : 'login';
      const res = await sendOtp(email, purpose);

      if (res.success) {
        setOtpSent(true);
        setCountdown(60); // 60 seconds cooldown
        if (res.demoOtp) {
          setGeneratedOtpDemo(res.demoOtp);
        }
        setSuccessMessage(`OTP code sent to ${email}`);
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch {
      setErrorMessage('Connection error. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Autofill demo OTP helper
  const handleAutofillDemoOtp = (code: string) => {
    const digits = code.split('').slice(0, 6);
    setOtpDigits(digits);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
    inputRefs.current[5]?.focus();
  };

  // Final Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (authMethod === 'otp') {
        const fullOtp = otpDigits.join('');
        if (fullOtp.length < 6) {
          setErrorMessage('Please enter the complete 6-digit OTP code');
          setIsSubmitting(false);
          return;
        }

        if (isRegister) {
          await registerWithOtp(name, email, fullOtp, role, phone);
        } else {
          await loginWithOtp(email, fullOtp, role);
        }
      } else {
        // Password method
        if (isRegister) {
          await register(name, email, role);
        } else {
          await login(email, role);
        }
      }

      setIsSubmitting(false);
      onNavigate('dashboard');
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || 'Authentication failed. Please verify your OTP code.');
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 animate-in fade-in">
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-2xl space-y-6">
        
        {/* Brand Top */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-teal-500 to-indigo-600 flex items-center justify-center mx-auto shadow-glow">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display font-black text-2xl text-navy-950">
            {isRegister ? 'Create Your Account' : 'Welcome Back to Tripora'}
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {isRegister
              ? 'Join our verified AI travel companion platform with secure OTP authentication'
              : 'Sign in seamlessly using OTP verification code or password'}
          </p>
        </div>

        {/* Mode Selector: Register vs Login */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/90 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setOtpSent(false);
              setGeneratedOtpDemo(null);
              setErrorMessage(null);
            }}
            className={`py-2 rounded-xl transition-all ${
              !isRegister ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setOtpSent(false);
              setGeneratedOtpDemo(null);
              setErrorMessage(null);
            }}
            className={`py-2 rounded-xl transition-all ${
              isRegister ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span>Select Account Role</span>
            <span className="text-brand-600 capitalize font-semibold">{role}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-50 border border-slate-100 rounded-2xl">
            {(['traveler', 'partner', 'admin'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                  role === r
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Auth Method Switcher (OTP vs Password) */}
        <div className="flex items-center justify-center gap-2 p-1 bg-teal-50/70 border border-teal-100 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setAuthMethod('otp')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'otp' ? 'bg-teal-600 text-white shadow-sm' : 'text-teal-900 hover:bg-teal-100/50'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>OTP Code (Recommended)</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('password')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'password' ? 'bg-navy-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Password</span>
          </button>
        </div>

        {/* Live OTP Notification Demo Banner */}
        {generatedOtpDemo && (
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-teal-200 rounded-2xl p-3.5 space-y-2 animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-xs font-bold text-teal-900">Generated OTP Code</span>
              </div>
              <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                Valid for 5m
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-teal-100 shadow-sm">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-teal-600" />
                <span className="font-mono text-lg font-black tracking-widest text-navy-950">
                  {generatedOtpDemo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAutofillDemoOtp(generatedOtpDemo)}
                className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedOtp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOtp ? 'Filled!' : 'Autofill OTP'}</span>
              </button>
            </div>
            <p className="text-[11px] text-teal-700/90">
              For security, enter the 6-digit code above to complete your {isRegister ? 'registration' : 'login'}.
            </p>
          </div>
        )}

        {/* Error / Success Notices */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && !errorMessage && !generatedOtpDemo && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-navy-900 font-medium focus:outline-none focus:border-brand-500 transition-colors"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-24 py-2.5 text-navy-900 font-medium focus:outline-none focus:border-brand-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              
              {authMethod === 'otp' && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || countdown > 0 || !email}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shadow-sm"
                >
                  {isSendingOtp ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : countdown > 0 ? (
                    `${countdown}s`
                  ) : (
                    otpSent ? 'Resend' : 'Send OTP'
                  )}
                </button>
              )}
            </div>
          </div>

          {isRegister && authMethod === 'otp' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-navy-900 font-medium focus:outline-none focus:border-brand-500 transition-colors"
                />
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* OTP Code Entry Boxes */}
          {authMethod === 'otp' && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span>Enter 6-Digit Verification Code</span>
                {otpSent && (
                  <span className="text-teal-600 font-semibold">Code sent to email</span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(index, e)}
                    onPaste={handlePasteOtp}
                    className="w-12 h-12 text-center text-xl font-bold font-mono bg-slate-50 border-2 border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl shadow-inner outline-none transition-all"
                  />
                ))}
              </div>

              {!otpSent && (
                <p className="text-[11px] text-slate-400 italic">
                  Click <strong className="text-brand-600">"Send OTP"</strong> above to generate your verification code.
                </p>
              )}
            </div>
          )}

          {/* Password Input */}
          {authMethod === 'password' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-navy-900 focus:outline-none focus:border-brand-500 font-mono transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-brand-600 via-teal-600 to-indigo-600 hover:from-brand-700 hover:via-teal-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-glow hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isRegister
                    ? authMethod === 'otp' ? 'Verify OTP & Complete Registration' : 'Create Account'
                    : authMethod === 'otp' ? 'Verify OTP & Sign In' : 'Sign In'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>256-bit encrypted authentication with time-based OTP protection</span>
        </div>
      </div>
    </div>
  );
};
