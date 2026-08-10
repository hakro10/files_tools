import React, { useState, useMemo } from 'react';
import { CopyButton } from '../../common/CopyButton';
import { ErrorAlert } from '../../common/ErrorAlert';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import {
  ShieldCheck,
  KeyRound,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlN1aXRlIERldmVsb3BlciIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjUyNDYwODAwMH0.F8yURrIpFEimb2m_XXN9vt6x27_nnNhcbx_mBgStsuQ";
const SAMPLE_SECRET = "your-256-bit-secret-key";

export const JwtDecoder: React.FC = () => {
  const [jwtInput, setJwtInput] = useState<string>(SAMPLE_JWT);
  const [secretKey, setSecretKey] = useState<string>(SAMPLE_SECRET);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Decode JWT Parts locally
  const { header, payload, decodeError, headerStr, payloadStr } = useMemo(() => {
    if (!jwtInput.trim()) {
      return { header: null, payload: null, decodeError: null, headerStr: '', payloadStr: '' };
    }

    const parts = jwtInput.trim().split('.');
    if (parts.length !== 3) {
      return {
        header: null,
        payload: null,
        decodeError: 'Invalid JWT format: A valid JWT must contain 3 parts separated by dots (header.payload.signature).',
        headerStr: '',
        payloadStr: ''
      };
    }

    try {
      const base64UrlDecode = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const headerObj = JSON.parse(base64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(base64UrlDecode(parts[1]));

      return {
        header: headerObj,
        payload: payloadObj,
        decodeError: null,
        headerStr: JSON.stringify(headerObj, null, 2),
        payloadStr: JSON.stringify(payloadObj, null, 2)
      };
    } catch (err: any) {
      return {
        header: null,
        payload: null,
        decodeError: `Failed to decode JWT Base64 payload: ${err.message}`,
        headerStr: '',
        payloadStr: ''
      };
    }
  }, [jwtInput]);

  // Expiration claims analysis
  const expClaimInfo = useMemo(() => {
    if (!payload || typeof payload.exp !== 'number') {
      return { hasExp: false, isExpired: false, expDate: null, relativeTime: '' };
    }
    const expMs = payload.exp * 1000;
    const nowMs = Date.now();
    const isExpired = nowMs > expMs;
    const expDate = new Date(expMs);

    const diffSeconds = Math.abs(Math.round((expMs - nowMs) / 1000));
    const days = Math.floor(diffSeconds / 86400);
    const hours = Math.floor((diffSeconds % 86400) / 3600);
    const mins = Math.floor((diffSeconds % 3600) / 60);

    let relativeTime = `${mins} mins`;
    if (days > 0) relativeTime = `${days} days, ${hours} hrs`;
    else if (hours > 0) relativeTime = `${hours} hrs, ${mins} mins`;

    return {
      hasExp: true,
      isExpired,
      expDate,
      relativeTime: isExpired ? `Expired ${relativeTime} ago` : `Expires in ${relativeTime}`
    };
  }, [payload]);

  // Verify HMAC signature via Web Crypto API (crypto.subtle)
  const handleVerifySignature = async () => {
    if (!jwtInput || !secretKey || !header) return;
    setIsVerifying(true);
    setVerifyStatus('idle');

    try {
      const parts = jwtInput.trim().split('.');
      const alg = header.alg || 'HS256';

      let hashName = 'SHA-256';
      if (alg === 'HS384') hashName = 'SHA-384';
      if (alg === 'HS512') hashName = 'SHA-512';

      if (!alg.startsWith('HS')) {
        setVerifyStatus('invalid');
        setIsVerifying(false);
        return;
      }

      const encoder = new TextEncoder();
      const secretBytes = encoder.encode(secretKey);

      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        secretBytes,
        { name: 'HMAC', hash: hashName },
        false,
        ['verify']
      );

      const dataToSign = encoder.encode(`${parts[0]}.${parts[1]}`);

      // Convert Base64URL signature to Uint8Array
      let b64Sig = parts[2].replace(/-/g, '+').replace(/_/g, '/');
      while (b64Sig.length % 4) {
        b64Sig += '=';
      }
      const binarySig = atob(b64Sig);
      const sigBytes = new Uint8Array(binarySig.length);
      for (let i = 0; i < binarySig.length; i++) {
        sigBytes[i] = binarySig.charCodeAt(i);
      }

      const isValid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, dataToSign);
      setVerifyStatus(isValid ? 'valid' : 'invalid');
    } catch (err) {
      console.error('Signature verification error:', err);
      setVerifyStatus('invalid');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Sample Loading */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setJwtInput(SAMPLE_JWT);
              setSecretKey(SAMPLE_SECRET);
              setVerifyStatus('idle');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-cyan-700 dark:text-cyan-300 border border-slate-300 dark:border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Load Sample Token
          </button>
          <button
            onClick={() => {
              setJwtInput('');
              setSecretKey('');
              setVerifyStatus('idle');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-300 dark:border-slate-700 transition"
          >
            Clear
          </button>
        </div>

        {/* Expiration Status Badge */}
        {payload && expClaimInfo.hasExp && (
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
              expClaimInfo.isExpired
                ? 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30'
                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{expClaimInfo.relativeTime}</span>
          </div>
        )}
      </div>

      {/* Raw Token Input Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Encoded JWT Token String
          </label>
          <CopyButton textToCopy={jwtInput} />
        </div>
        <textarea
          value={jwtInput}
          onChange={(e) => {
            setJwtInput(e.target.value);
            setVerifyStatus('idle');
          }}
          placeholder="Paste encoded JWT string (header.payload.signature)..."
          className="w-full h-28 p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-mono text-cyan-900 dark:text-cyan-300 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none leading-relaxed shadow-inner transition-colors"
        />
        <ErrorAlert message={decodeError} title="JWT Decoding Error" />
      </div>

      {/* Decoded Sections: Header & Payload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Header Decoded */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider font-mono">
              Header (Algorithm & Token Type)
            </span>
            <CopyButton textToCopy={headerStr} />
          </div>
          <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-red-200 dark:border-red-900/30 text-xs font-mono text-red-800 dark:text-red-300 overflow-auto h-52 leading-relaxed shadow-inner transition-colors">
            <code>{headerStr || '// Header claims will appear here'}</code>
          </pre>
        </div>

        {/* Payload Decoded */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">
              Payload (Claims & Data)
            </span>
            <CopyButton textToCopy={payloadStr} />
          </div>
          <pre className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border border-purple-200 dark:border-purple-900/30 text-xs font-mono text-purple-800 dark:text-purple-300 overflow-auto h-52 leading-relaxed shadow-inner transition-colors">
            <code>{payloadStr || '// Payload claims will appear here'}</code>
          </pre>
        </div>
      </div>

      {/* AdSlot Output */}
      <AdSlotOutput />

      {/* Web Crypto Signature Verification Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase font-mono tracking-wider">
              Web Crypto HMAC Signature Verification
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            Executed 100% Client-Side
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Enter your secret key below to verify the HMAC signature locally using the browser native Web Crypto API (<code className="text-cyan-700 dark:text-cyan-300 font-mono">crypto.subtle</code>). Secret keys are never transmitted to any server.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Enter secret key (e.g. your-256-bit-secret-key)..."
              value={secretKey}
              onChange={(e) => {
                setSecretKey(e.target.value);
                setVerifyStatus('idle');
              }}
              className="w-full px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 text-xs font-mono text-slate-900 dark:text-slate-200 outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleVerifySignature}
            disabled={!secretKey || !jwtInput || !!decodeError || isVerifying}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shrink-0"
          >
            {isVerifying ? (
              <span>Verifying...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Signature</span>
              </>
            )}
          </button>
        </div>

        {/* Verification Result Notification */}
        {verifyStatus !== 'idle' && (
          <div
            className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-3 ${
              verifyStatus === 'valid'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-300'
            }`}
          >
            {verifyStatus === 'valid' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-emerald-900 dark:text-emerald-200">Signature Verified!</strong>
                  <span>The HMAC signature is a cryptographic match with the provided secret key.</span>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                <div>
                  <strong className="block text-red-900 dark:text-red-200">Invalid Signature!</strong>
                  <span>The signature does not match the header, payload, or secret key.</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
