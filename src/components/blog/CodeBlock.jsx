import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function CodeBlock({ code, language = 'javascript', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-[#171715]/10 bg-[#171715] text-[#F8F7F2] shadow-md transition-all">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#20201D] border-b border-white/10 text-xs font-mono text-[#A8A49C]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#C8B99A]" />
          <span>{title || language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer text-xs"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed selection:bg-[#C8B99A]/30">
        <pre className="text-[#ECEAE5]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
