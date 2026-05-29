import { useState, useCallback, useRef, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ArrowLeft, GraduationCap, Briefcase, Clock, DollarSign, Calendar, BookOpen, Video, Building, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/data/jobs";
import ApplicationProcessing from "./ApplicationProcessing";
import ApplicationSuccess from "./ApplicationSuccess";
import InterviewDashboard from "./InterviewDashboard";

interface Props {
  job: Job | null;
  onClose: () => void;
}

const steps = ["Personal Info", "Background", "Preferences", "Review"];

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body transition-all";

interface FormData {
  name: string; email: string; phone: string; location: string;
  education: string; experience: string; workType: string;
  interviewMode: string; employmentType: string; salaryRange: string;
  availability: string; willingToTrain: string;
}

const initialForm: FormData = {
  name: "", email: "", phone: "", location: "",
  education: "", experience: "", workType: "",
  interviewMode: "", employmentType: "", salaryRange: "",
  availability: "", willingToTrain: "",
};

type Phase = "form" | "processing" | "success" | "dashboard";

// Question card wrapper with icon
function QuestionCard({ 
  icon: Icon, 
  title, 
  children,
  selected,
  questionRef
}: { 
  icon?: React.ElementType; 
  title: string; 
  children: React.ReactNode;
  selected?: boolean;
  questionRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <motion.div 
      ref={questionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br from-muted/50 to-muted rounded-2xl p-5 border transition-all ${
        selected ? 'border-primary/30 shadow-lg shadow-primary/5' : 'border-border/50'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

// Stylish radio pill with animation
function RadioPill({ 
  label, 
  selected, 
  onClick,
  onSelectNext
}: { 
  label: string; 
  selected: boolean; 
  onClick: () => void;
  onSelectNext?: () => void;
}) {
  const handleClick = () => {
    onClick();
    if (onSelectNext) {
      setTimeout(onSelectNext, 300);
    }
  };
  
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className={`relative px-5 py-3 rounded-xl text-sm font-medium border-2 transition-all overflow-hidden ${
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
          : "bg-background text-muted-foreground border-input hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {selected && (
        <motion.div
          layoutId="selected-bg"
          className="absolute inset-0 bg-primary"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

export default function ApplicationDrawer({ job, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [phase, setPhase] = useState<Phase>("form");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Refs for each question for auto-scroll
  const questionRefs = {
    education: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    workType: useRef<HTMLDivElement>(null),
    interviewMode: useRef<HTMLDivElement>(null),
    employmentType: useRef<HTMLDivElement>(null),
    salaryRange: useRef<HTMLDivElement>(null),
    availability: useRef<HTMLDivElement>(null),
    willingToTrain: useRef<HTMLDivElement>(null),
  };

  // Scroll to top when step changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  if (!job) return null;

  const handleSubmit = () => setPhase("processing");

  const handleProcessingComplete = () => setPhase("success");

  const handleClose = () => {
    setPhase("form");
    setStep(0);
    setForm(initialForm);
    onClose();
  };

  const set = (key: keyof FormData) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  // Get next question ref for auto-scroll
  const getNextQuestionRef = (currentKey: keyof typeof questionRefs) => {
    const keys = Object.keys(questionRefs) as (keyof typeof questionRefs)[];
    const currentIndex = keys.indexOf(currentKey);
    if (currentIndex < keys.length - 1) {
      return () => {
        const nextKey = keys[currentIndex + 1];
        questionRefs[nextKey].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
    }
    return undefined;
  };

  if (phase === "dashboard") {
    return <InterviewDashboard job={job} onClose={handleClose} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-card shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {phase === "form" && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <div>
                <h2 className="font-display font-bold text-lg text-foreground">Apply: {job.title}</h2>
                <p className="text-sm text-primary font-medium">{job.organizationName}</p>
              </div>
              <button onClick={handleClose} className="p-2 rounded-xl hover:bg-muted transition text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Steps Progress */}
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center">
                    <motion.div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i < step 
                          ? "bg-primary text-primary-foreground" 
                          : i === step 
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20" 
                            : "bg-muted text-muted-foreground"
                      }`}
                      animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className={`w-12 h-1 mx-1 rounded-full transition-all ${
                        i < step ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm font-medium text-foreground">
                {steps[step]}
              </p>
            </div>
          </>
        )}

        {/* Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6">
          {phase === "processing" && (
            <ApplicationProcessing
              jobTitle={job.title}
              orgName={job.organizationName}
              onComplete={handleProcessingComplete}
            />
          )}

          {phase === "success" && (
            <ApplicationSuccess
              jobTitle={job.title}
              orgName={job.organizationName}
              onSecure={() => setPhase("dashboard")}
              onBookInterview={() => setPhase("dashboard")}
            />
          )}

          {phase === "form" && (
            <AnimatePresence mode="wait">
              <motion.div 
                key={step} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {step === 0 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground">Let's get to know you</h3>
                      <p className="text-sm text-muted-foreground mt-1">Fill in your personal details</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input value={form.name} onChange={(e) => set("name")(e.target.value)} className={inputClass} placeholder="John Kamau" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                        <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} className={inputClass} placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={(e) => set("phone")(e.target.value)} className={inputClass} placeholder="+254 712 345 678" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Where do you live?</label>
                        <input value={form.location} onChange={(e) => set("location")(e.target.value)} className={inputClass} placeholder="e.g. Nairobi, Mombasa, Kisumu" />
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-3">
                        <GraduationCap className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground">Your Background</h3>
                      <p className="text-sm text-muted-foreground mt-1">Tell us about your education and experience</p>
                    </div>
                    <div className="space-y-5">
                      <QuestionCard 
                        icon={GraduationCap} 
                        title="Education Level"
                        selected={!!form.education}
                        questionRef={questionRefs.education}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["Primary", "Secondary", "College", "University"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.education === opt} 
                              onClick={() => set("education")(opt)}
                              onSelectNext={getNextQuestionRef('education')}
                            />
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard 
                        icon={Briefcase} 
                        title="Work Experience"
                        selected={!!form.experience}
                        questionRef={questionRefs.experience}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["0–1 years", "1–5 years", "5–10 years", "10+ years"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.experience === opt} 
                              onClick={() => set("experience")(opt)}
                            />
                          ))}
                        </div>
                      </QuestionCard>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3">
                        <Building className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground">Your Preferences</h3>
                      <p className="text-sm text-muted-foreground mt-1">What are you looking for?</p>
                    </div>
                    <div className="space-y-4">
                      <QuestionCard 
                        icon={Clock} 
                        title="Preferred Work Type"
                        selected={!!form.workType}
                        questionRef={questionRefs.workType}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["Full Time", "Part Time"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.workType === opt} 
                              onClick={() => set("workType")(opt)}
                              onSelectNext={getNextQuestionRef('workType')}
                            />
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard 
                        icon={Video} 
                        title="Preferred Interview Mode"
                        selected={!!form.interviewMode}
                        questionRef={questionRefs.interviewMode}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["Physical", "Online"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.interviewMode === opt} 
                              onClick={() => set("interviewMode")(opt)}
                              onSelectNext={getNextQuestionRef('interviewMode')}
                            />
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard 
                        icon={Building} 
                        title="Employment Type"
                        selected={!!form.employmentType}
                        questionRef={questionRefs.employmentType}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["Permanent", "Contract"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.employmentType === opt} 
                              onClick={() => set("employmentType")(opt)}
                              onSelectNext={getNextQuestionRef('employmentType')}
                            />
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard 
                        icon={DollarSign} 
                        title="Expected Salary Range (KES)"
                        selected={!!form.salaryRange}
                        questionRef={questionRefs.salaryRange}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["15k–30k", "30k–50k", "50k–80k", "80k–120k", "120k+"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.salaryRange === opt} 
                              onClick={() => set("salaryRange")(opt)}
                              onSelectNext={getNextQuestionRef('salaryRange')}
                            />
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard 
                        icon={Calendar} 
                        title="When can you start?"
                        selected={!!form.availability}
                        questionRef={questionRefs.availability}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["Immediately", "Within 2 weeks", "Within 1 month", "More than 1 month"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.availability === opt} 
                              onClick={() => set("availability")(opt)}
                              onSelectNext={getNextQuestionRef('availability')}
                            />
                          ))}
                        </div>
                      </QuestionCard>

                      <QuestionCard 
                        icon={BookOpen} 
                        title="Willing to undergo training?"
                        selected={!!form.willingToTrain}
                        questionRef={questionRefs.willingToTrain}
                      >
                        <div className="flex flex-wrap gap-2">
                          {["Yes", "No"].map((opt) => (
                            <RadioPill 
                              key={opt} 
                              label={opt} 
                              selected={form.willingToTrain === opt} 
                              onClick={() => set("willingToTrain")(opt)}
                            />
                          ))}
                        </div>
                      </QuestionCard>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground">Review Your Application</h3>
                      <p className="text-sm text-muted-foreground mt-1">Make sure everything looks correct</p>
                    </div>
                    <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-5 space-y-3 border border-border/50">
                      {[
                        ["Position", job.title], ["Organization", job.organizationName], ["Salary", job.salary],
                        ["Name", form.name], ["Email", form.email], ["Phone", form.phone],
                        ["Location", form.location], ["Education", form.education], ["Experience", form.experience],
                        ["Work Type", form.workType], ["Interview", form.interviewMode], ["Employment", form.employmentType],
                        ["Expected Salary", form.salaryRange], ["Available", form.availability], ["Training", form.willingToTrain],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm py-2 border-b border-border/30 last:border-0">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium text-foreground">{value || "—"}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mt-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((r) => (
                          <li key={r} className="text-xs text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {phase === "form" && (
          <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
            <button
              onClick={() => (step > 0 ? setStep(step - 1) : handleClose())}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> {step > 0 ? "Back" : "Cancel"}
            </button>
            <motion.button
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
            >
              {step < 3 ? "Continue" : "Submit Application"} <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
