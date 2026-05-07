"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, Github, Linkedin, CheckCircle, MapPin, MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeading } from "./SectionHeading";
import { personalInfo } from "@/lib/data";
import { toast } from "sonner";

const SectionAmbient3D = dynamic(
  () => import("./SectionAmbient3D").then((mod) => ({ default: mod.SectionAmbient3D })),
  { ssr: false }
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const MAX_MESSAGE_LENGTH = 500;

const contactCards = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "text-cyan-accent bg-cyan-accent/10" },
  { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: "text-emerald-accent bg-emerald-accent/10" },
  { icon: Github, label: "GitHub", value: personalInfo.github, href: personalInfo.githubUrl, color: "text-purple-accent bg-purple-accent/10" },
  { icon: Linkedin, label: "LinkedIn", value: personalInfo.linkedin, href: personalInfo.linkedinUrl, color: "text-pink-accent bg-pink-accent/10" },
];

/* ---------- Floating Label Input ---------- */
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  const isActive = value.length > 0;
  return (
    <div className="floating-label-group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2.5 rounded-lg text-sm bg-background border ${
          error
            ? "border-destructive"
            : "border-input focus-glow-animated"
        } outline-none transition-all duration-300 pt-3 ${
          isActive ? "border-cyan-accent/50" : ""
        }`}
        placeholder={placeholder || " "}
      />
      <label
        htmlFor={id}
        className={`transition-all duration-200 ${
          isActive ? "float-active" : ""
        } ${error ? "!text-destructive" : ""}`}
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- Floating Label Textarea ---------- */
function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 5,
  maxLength = MAX_MESSAGE_LENGTH,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}) {
  const isActive = value.length > 0;
  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.8;
  const isOverLimit = charCount > maxLength;

  return (
    <div>
      <div className="floating-label-group">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength + 50))}
          rows={rows}
          className={`w-full px-3 py-2.5 rounded-lg text-sm bg-background border resize-none ${
            error
              ? "border-destructive"
              : isOverLimit
              ? "border-amber-accent"
              : "border-input focus-glow-animated"
          } outline-none transition-all duration-300 pt-3 ${
            isActive && !isOverLimit ? "border-cyan-accent/50" : ""
          }`}
          placeholder={placeholder || " "}
        />
        <label
          htmlFor={id}
          className={`transition-all duration-200 ${
            isActive ? "float-active" : ""
          } ${error ? "!text-destructive" : ""}`}
        >
          {label}
        </label>
      </div>
      <div className="flex items-center justify-between mt-1">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive"
          >
            {error}
          </motion.p>
        ) : (
          <span />
        )}
        <span
          className={`text-xs ml-auto transition-colors duration-200 ${
            isOverLimit
              ? "text-amber-accent font-medium"
              : isNearLimit
              ? "text-yellow-500"
              : "text-muted-foreground/50"
          }`}
        >
          {charCount}/{maxLength} characters
        </span>
      </div>
    </div>
  );
}

/* ---------- Success Animation ---------- */
function SuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center justify-center gap-3 py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-accent/20 to-purple-accent/20 border border-cyan-accent/40 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
        >
          <CheckCircle className="w-8 h-8 text-cyan-accent" />
        </motion.div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-sm font-medium gradient-text"
      >
        Email draft opened!
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground"
      >
        Complete sending in your mail app
      </motion.p>
    </motion.div>
  );
}

/* ---------- Main Contact Component ---------- */
export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    else if (form.message.length > MAX_MESSAGE_LENGTH)
      newErrors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const body = [
      `From: ${form.name} <${form.email}>`,
      "",
      form.message.trim(),
    ].join("\n");
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      form.subject.trim()
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    toast.success("Email draft opened in your mail app.", {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    });

    // Show success animation briefly
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setSubmitting(false);
    }, 2500);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 section-gradient-cyan relative overflow-hidden">
      <SectionAmbient3D variant="contact" />

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl relative z-10">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a question or want to collaborate? I'd love to hear from you"
        />

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-accent" />
                Contact Information
              </h3>
              <div className="space-y-3">
                {contactCards.map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <motion.a
                      key={card.label}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      className={`flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 p-2 rounded-lg hover:bg-muted/30`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center shrink-0`}>
                        <CardIcon className="w-4 h-4" />
                      </div>
                      {card.value}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card rounded-xl p-4 hover-glow-cyan"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-accent/15 to-purple-accent/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground mb-1">Open to Opportunities</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    I&apos;m currently open to internship opportunities, research
                    collaborations, and interesting projects. Feel free to reach out!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <SuccessAnimation key="success" />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput
                      id="name"
                      label="Name"
                      value={form.name}
                      onChange={(v) => updateField("name", v)}
                      error={errors.name}
                      placeholder=" "
                    />
                    <FloatingInput
                      id="email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => updateField("email", v)}
                      error={errors.email}
                      placeholder=" "
                    />
                  </div>

                  <FloatingInput
                    id="subject"
                    label="Subject"
                    value={form.subject}
                    onChange={(v) => updateField("subject", v)}
                    error={errors.subject}
                    placeholder=" "
                  />

                  <FloatingTextarea
                    id="message"
                    label="Message"
                    value={form.message}
                    onChange={(v) => updateField("message", v)}
                    error={errors.message}
                    placeholder=" "
                  />

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-shimmer"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899, #06b6d4)",
                      backgroundSize: "300% 100%",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Opening..." : "Send Message"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
