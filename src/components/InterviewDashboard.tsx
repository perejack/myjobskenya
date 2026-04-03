import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Briefcase, MapPin, DollarSign, CalendarPlus, Clock,
  Phone, Mail, MessageSquare, ChevronRight, Loader2,
  CheckCircle2, ArrowLeft, Sparkles, ShieldCheck
} from "lucide-react";
import type { Job } from "@/data/jobs";
import { PayHeroService } from "@/lib/payhero";
import { toast } from "sonner";

interface Props {
  job: Job;
  onClose: () => void;
}

type Screen = "home" | "book" | "payment" | "processing" | "success";
type ContactMode = "call" | "sms" | "email";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
];

function generateDates(): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() !== 0) dates.push(d); // skip Sundays
  }
  return dates;
}

export default function InterviewDashboard({ job, onClose }: Props) {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [contactMode, setContactMode] = useState<ContactMode | null>(null);
  const [contactValue, setContactValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [processing, setProcessing] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const dates = generateDates();

  const handleBook = () => setScreen("payment");

  const handlePay = async () => {
    if (!phoneNumber) return;
    setProcessing(true);
    
    const reference = `KCC-${job.id}-${Date.now()}`;
    const result = await PayHeroService.initiateSTKPush(
      phoneNumber,
      5,
      reference,
      contactValue
    );
    
    if (result.success && result.checkoutId) {
      setCheckoutId(result.checkoutId);
      setScreen("processing");
      
      // Poll for payment status
      await PayHeroService.pollPaymentStatus(
        result.checkoutId,
        30,
        () => {
          // Payment successful - redirect to thank you page for Google Ads conversion tracking
          const params = new URLSearchParams({
            job: job.title,
            org: job.organizationName,
            date: selectedDate?.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" }) || "",
            time: selectedTime
          });
          navigate(`/thank-you?${params.toString()}`);
          toast.success("Payment confirmed! Interview booked successfully.");
        },
        () => {
          // Payment failed
          setScreen("payment");
          setProcessing(false);
          toast.error("Payment failed. Please try again.");
        }
      );
    } else {
      setProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-x-[15%] lg:inset-y-6 z-[60] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            {screen !== "home" && screen !== "success" && (
              <button
                onClick={() => setScreen(screen === "payment" ? "book" : "home")}
                className="p-1.5 rounded-lg hover:bg-muted transition text-muted-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="font-display font-bold text-base text-foreground">
                Interview Dashboard
              </h2>
              <p className="text-xs text-muted-foreground">{job.organizationName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* HOME */}
            {screen === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 space-y-5"
              >
                {/* Position card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 p-6">
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1 text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Position Secured
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold bg-accent/20 text-accent-foreground px-2.5 py-1 rounded-full">
                        <Sparkles className="w-3 h-3" /> Qualified
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{job.organizationName}</p>
                    <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Status pills */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
                    <p className="text-2xl font-display font-bold text-primary">2</p>
                    <p className="text-xs text-muted-foreground mt-1">Open Slots</p>
                  </div>
                  <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 text-center">
                    <p className="text-2xl font-display font-bold text-accent">Pending</p>
                    <p className="text-xs text-muted-foreground mt-1">Interview Status</p>
                  </div>
                </div>

                {/* Book interview CTA */}
                <button
                  onClick={() => setScreen("book")}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <CalendarPlus className="w-5 h-5" />
                    Book Interview
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* BOOK INTERVIEW */}
            {screen === "book" && (
              <motion.div
                key="book"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 space-y-5"
              >
                <h3 className="font-display font-bold text-lg text-foreground">
                  Schedule Your Interview
                </h3>

                {/* Date picker */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Date
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {dates.map((d) => {
                      const isSelected = selectedDate?.toDateString() === d.toDateString();
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => setSelectedDate(d)}
                          className={`flex flex-col items-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-background text-foreground border-input hover:border-primary/50"
                          }`}
                        >
                          <span className="text-[10px] uppercase opacity-70">
                            {d.toLocaleDateString("en", { weekday: "short" })}
                          </span>
                          <span className="text-base font-bold">{d.getDate()}</span>
                          <span className="text-[10px] opacity-70">
                            {d.toLocaleDateString("en", { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time */}
                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                            selectedTime === t
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-input hover:border-primary/50"
                          }`}
                        >
                          <Clock className="w-3 h-3" />{t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact mode */}
                {selectedTime && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      How should we contact you?
                    </label>
                    <div className="flex gap-2">
                      {([
                        { mode: "call" as ContactMode, icon: Phone, label: "Call" },
                        { mode: "sms" as ContactMode, icon: MessageSquare, label: "SMS" },
                        { mode: "email" as ContactMode, icon: Mail, label: "Email" },
                      ]).map(({ mode, icon: Icon, label }) => (
                        <button
                          key={mode}
                          onClick={() => { setContactMode(mode); setContactValue(""); }}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            contactMode === mode
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-input hover:border-primary/50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />{label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact value */}
                {contactMode && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {contactMode === "email" ? "Email Address" : "Phone Number"}
                    </label>
                    <input
                      type={contactMode === "email" ? "email" : "tel"}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={contactMode === "email" ? "john@example.com" : "+254 712 345 678"}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    {contactValue && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1.5 text-xs text-primary mt-2 bg-primary/5 px-3 py-2 rounded-lg"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        You will receive a {contactMode === "call" ? "call" : contactMode === "sms" ? "SMS" : "email"} through this {contactMode === "email" ? "email" : "number"}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Book button */}
                {contactValue && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <button
                      onClick={handleBook}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
                    >
                      <CalendarPlus className="w-5 h-5" />
                      Book Interview
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* PAYMENT */}
            {screen === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 flex flex-col items-center"
              >
                <div className="w-full max-w-sm space-y-5">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      One Final Step
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Interview processing fee to guarantee attendance
                    </p>
                  </div>

                  <div className="bg-muted rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Position</span>
                      <span className="font-medium text-foreground">{job.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interview</span>
                      <span className="font-medium text-foreground">
                        {selectedDate?.toLocaleDateString("en", { month: "short", day: "numeric" })} · {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contact</span>
                      <span className="font-medium text-foreground">{contactValue}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold text-foreground">Processing Fee</span>
                      <span className="font-display font-bold text-xl text-primary">KES 5</span>
                    </div>
                    <p className="text-[11px] text-red-500 font-semibold text-center">
                      🔒 Fully refundable if you attend the interview
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1.5">
                      You will receive an STK push on this number
                    </p>
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={!phoneNumber || processing}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Payment…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        Complete Registration — KES 5
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* PROCESSING */}
            {screen === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 flex flex-col items-center justify-center h-full text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary mb-6"
                />
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  Processing Payment...
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Please check your phone and enter your M-Pesa PIN to complete the payment.
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Waiting for confirmation
                </p>
              </motion.div>
            )}

            {/* SUCCESS */}
            {screen === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 flex flex-col items-center justify-center h-full text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-14 h-14 text-primary" />
                </motion.div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Interview Booking Successful! 🎉
                </h3>
                <p className="text-muted-foreground text-sm mb-1">
                  Your interview for <span className="font-semibold text-foreground">{job.title}</span> has been confirmed.
                </p>
                <p className="text-muted-foreground text-sm mb-1">
                  📅 {selectedDate?.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                </p>
                <p className="text-sm text-primary font-medium mt-4 bg-primary/5 px-4 py-2 rounded-lg">
                  You will be contacted by our representative
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm hover:brightness-110 transition-all"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
