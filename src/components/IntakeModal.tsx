import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, Upload, Link as LinkIcon, Trash2, CheckCircle, Sparkles, FileText } from 'lucide-react';
import { IntakeAnswers, AttachedFile } from '../types';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answers: IntakeAnswers) => void;
  initialAnswers?: Partial<IntakeAnswers>;
}

const QUESTIONS = [
  {
    key: 'what',
    title: 'What do you sell?',
    hint: 'One line is enough. Be specific about your product, service, or craft.',
    type: 'text',
    placeholder: 'Handmade soy candles or B2B SaaS for freelancers',
    suggestions: [
      'B2B SaaS tool',
      'Handmade home goods',
      'Freelance brand design',
      'Specialty coffee shop',
      'Consulting & coaching',
      'Paid newsletter / community'
    ]
  },
  {
    key: 'who',
    title: 'Who is it for?',
    hint: 'The kind of person or team who would gladly buy and benefit from it.',
    type: 'text',
    placeholder: 'Busy professionals who want a calmer home',
    suggestions: [
      'Solo tech founders',
      'Eco-conscious homeowners',
      'Agency owners',
      'Freelance creators',
      'Remote knowledge workers'
    ]
  },
  {
    key: 'goal',
    title: 'What do you want most right now?',
    hint: 'Pick one primary target. You can adjust it after your plan is built.',
    type: 'pick',
    options: ['More customers', 'More sales', 'More followers', 'More bookings', 'High-ticket clients']
  },
  {
    key: 'money',
    title: 'How much can you spend each month?',
    hint: 'A rough feel is fine. Nothing is a completely valid answer.',
    type: 'pick',
    options: ['Nothing yet ($0)', 'A little ($50 - $200)', 'A moderate amount ($200 - $800)', 'Flexible ($1,000+)']
  },
  {
    key: 'time',
    title: 'How much time can you give each week?',
    hint: 'Mark sizes your daily actions so they fit comfortably in your real calendar.',
    type: 'pick',
    options: ['1 to 2 hours', '3 to 5 hours', '6 to 10 hours', '10 or more hours']
  },
  {
    key: 'src',
    title: 'Anything Mark should read?',
    hint: 'Add links (up to 5) or drop files (PDF, Word, Markdown, text, HTML, CSV).',
    type: 'src'
  }
];

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialAnswers
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<IntakeAnswers>({
    what: initialAnswers?.what || '',
    who: initialAnswers?.who || '',
    goal: initialAnswers?.goal || 'More customers',
    money: initialAnswers?.money || 'Nothing yet ($0)',
    time: initialAnswers?.time || '1 to 2 hours',
    links: initialAnswers?.links || [],
    files: initialAnswers?.files || []
  });

  const [linkInput, setLinkInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const currentQ = QUESTIONS[step];
  const progressPercent = ((step + 1) / QUESTIONS.length) * 100;

  const handleNext = () => {
    setErrorMsg('');
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(answers);
      onClose();
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    setErrorMsg('');
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(answers);
      onClose();
    }
  };

  const addLink = () => {
    const val = linkInput.trim();
    if (!val) return;

    try {
      const url = new URL(/^https?:\/\//i.test(val) ? val : 'https://' + val);
      if (!url.hostname.includes('.')) {
        setErrorMsg('Please enter a valid URL, e.g. yoursite.com or x.com/profile');
        return;
      }
      if (answers.links.length >= 5) {
        setErrorMsg('You can add up to 5 links.');
        return;
      }

      const formatted = url.hostname.replace(/^www\./, '') + (url.pathname.length > 1 ? url.pathname : '');
      setAnswers(prev => ({
        ...prev,
        links: [...prev.links, formatted]
      }));
      setLinkInput('');
      setErrorMsg('');
    } catch {
      setErrorMsg('That does not look like a link. Try entering yoursite.com');
    }
  };

  const removeLink = (index: number) => {
    setAnswers(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMsg('');

    const newFiles: AttachedFile[] = [];
    const validExts = /\.(pdf|docx?|md|markdown|txt|html?|csv|rtf)$/i;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (answers.files.length + newFiles.length >= 5) {
        setErrorMsg('Maximum 5 files allowed.');
        break;
      }
      if (!validExts.test(file.name)) {
        setErrorMsg(`Unsupported file: ${file.name}. Supported: PDF, Word, MD, TXT, CSV, HTML.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg(`${file.name} is larger than 5MB. Please choose a smaller file.`);
        continue;
      }

      newFiles.push({
        name: file.name,
        size: file.size,
        snippet: `Uploaded ${file.name} (${Math.round(file.size / 1024)} KB)`
      });
    }

    if (newFiles.length > 0) {
      setAnswers(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setAnswers(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050914]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[580px] bg-[#0E1525] border border-[#1B2640] rounded-3xl p-6 md:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)] text-[#EEF2FB] relative flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between text-xs font-medium text-[#97A3BA]">
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#97A3BA] hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#1B2640] rounded-full my-4 overflow-hidden">
          <div 
            className="h-full bg-[#2F6BFF] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Title & Hint */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#EEF2FB] mb-1.5">
            {currentQ.title}
          </h2>
          <p className="text-sm text-[#97A3BA]">
            {currentQ.hint}
          </p>
        </div>

        {/* Question Input Field */}
        <div className="flex-1 min-h-[140px]">
          {currentQ.type === 'text' && (
            <div>
              <input
                ref={inputRef}
                type="text"
                value={answers[currentQ.key as keyof IntakeAnswers] as string || ''}
                onChange={e => setAnswers({ ...answers, [currentQ.key]: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleNext();
                  }
                }}
                placeholder={currentQ.placeholder}
                className="w-full bg-[#060A14] border border-[#1B2640] focus:border-[#2F6BFF] rounded-2xl px-4 py-3.5 text-base md:text-lg text-[#EEF2FB] placeholder:text-[#566074] outline-none transition-colors"
                autoComplete="off"
              />

              {/* Suggestions */}
              {currentQ.suggestions && (
                <div className="mt-4">
                  <p className="text-xs text-[#97A3BA] mb-2 font-medium">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAnswers({ ...answers, [currentQ.key]: sug })}
                        className="text-xs py-1.5 px-3 rounded-full bg-white/5 border border-white/10 hover:border-[#2F6BFF] hover:bg-[#2F6BFF]/10 text-[#EEF2FB] transition-all text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentQ.type === 'pick' && (
            <div className="flex flex-col gap-2.5">
              {currentQ.options?.map((opt, i) => {
                const isSelected = answers[currentQ.key as keyof IntakeAnswers] === opt;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [currentQ.key]: opt })}
                    className={`w-full py-3 px-4 rounded-2xl border text-left text-sm md:text-base font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-[#2F6BFF] border-[#2F6BFF] text-white shadow-[0_4px_16px_rgba(47,107,255,0.35)]'
                        : 'bg-[#060A14] border-[#1B2640] text-[#EEF2FB] hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'src' && (
            <div className="flex flex-col gap-4">
              {/* Add Link Row */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="w-4 h-4 text-[#97A3BA] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={linkInput}
                    onChange={e => setLinkInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addLink();
                      }
                    }}
                    placeholder="Paste website, e.g. myproduct.com"
                    className="w-full bg-[#060A14] border border-[#1B2640] focus:border-[#2F6BFF] rounded-2xl pl-10 pr-3 py-3 text-sm text-[#EEF2FB] placeholder:text-[#566074] outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={addLink}
                  className="px-4 py-2.5 text-xs font-semibold bg-[#2F6BFF] text-white rounded-2xl hover:bg-[#2558d4] transition-colors shrink-0"
                >
                  Add link
                </button>
              </div>

              {/* Drag & Drop Upload */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-[#2F6BFF] bg-[#2F6BFF]/10 text-white' 
                    : 'border-[#1B2640] hover:border-white/20 bg-[#060A14]/50 text-[#97A3BA]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  hidden
                  accept=".pdf,.doc,.docx,.md,.markdown,.txt,.html,.htm,.csv,.rtf"
                  onChange={e => handleFiles(e.target.files)}
                />
                <Upload className="w-6 h-6 mx-auto mb-2 text-[#9DBCFF]" />
                <p className="text-sm font-medium text-[#EEF2FB]">
                  Choose files or drop them here
                </p>
                <p className="text-xs text-[#97A3BA] mt-1">
                  PDF, DOCX, Markdown, Text, HTML, CSV (Up to 5MB, max 5)
                </p>
              </div>

              {/* Sources List */}
              {(answers.links.length > 0 || answers.files.length > 0) && (
                <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                  {answers.links.map((link, idx) => (
                    <div key={`link-${idx}`} className="flex items-center justify-between py-1.5 px-3 bg-[#060A14] border border-[#1B2640] rounded-xl text-xs">
                      <span className="truncate max-w-[340px] text-[#9DBCFF]">
                        Link: {link}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLink(idx)}
                        className="text-[#97A3BA] hover:text-[#FFB547] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {answers.files.map((file, idx) => (
                    <div key={`file-${idx}`} className="flex items-center justify-between py-1.5 px-3 bg-[#060A14] border border-[#1B2640] rounded-xl text-xs">
                      <div className="flex items-center gap-1.5 truncate max-w-[340px]">
                        <FileText className="w-3.5 h-3.5 text-[#97A3BA] shrink-0" />
                        <span className="truncate text-[#EEF2FB]">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-[#97A3BA] hover:text-[#FFB547] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Error notification */}
        {errorMsg && (
          <p className="text-xs font-medium text-[#FFB547] mt-3">{errorMsg}</p>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 mt-8 pt-4 border-t border-[#1B2640]">
          <div>
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-sm font-medium text-[#97A3BA] hover:text-white rounded-full border border-[#1B2640] hover:border-white/20 transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSkip}
              className="px-4 py-2 text-sm font-medium text-[#97A3BA] hover:text-white rounded-full border border-transparent hover:border-[#1B2640] transition-all"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#2F6BFF] hover:bg-[#2558d4] rounded-full shadow-[0_4px_18px_rgba(47,107,255,0.4)] transition-all flex items-center gap-2"
            >
              <span>{step === QUESTIONS.length - 1 ? 'Show my plan' : 'Next'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
