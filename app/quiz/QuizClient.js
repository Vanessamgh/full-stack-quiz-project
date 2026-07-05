"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS } from "@/lib/data";
import { getVisitorId } from "@/lib/visitor";

export default function QuizClient() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [saving, setSaving] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];
  const selectedType = answers[currentIndex];
  const isLast = currentIndex === QUIZ_QUESTIONS.length - 1;
  const progressPercent = Math.round((currentIndex / QUIZ_QUESTIONS.length) * 100);

  function selectOption(type) {
    const next = [...answers];
    next[currentIndex] = type;
    setAnswers(next);
  }

  function goBack() {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }

  function goNext() {
    if (!selectedType) return;
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finish();
    }
  }

  async function finish() {
    const scores = { wolf: 0, cat: 0, dog: 0, eagle: 0, owl: 0, dolphin: 0 };
    answers.forEach((type) => {
      if (type) scores[type]++;
    });

    setSaving(true);
    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores, visitorId: getVisitorId() }),
      });
    } catch (err) {
      // Non-blocking: saving to the leaderboard is a bonus feature.
      // The quiz result itself still works via the URL params below.
      console.error("Could not save result to leaderboard:", err);
    }

    const params = new URLSearchParams(scores);
    router.push(`/results?${params.toString()}`);
  }

  return (
    <div className="quiz-card" aria-live="polite">
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>
      <p className="quiz-step">
        Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
      </p>
      <h2 className="quiz-question">{question.text}</h2>
      <div className="quiz-options">
        {question.options.map((opt) => (
          <button
            key={opt.type}
            type="button"
            className={`quiz-option${opt.type === selectedType ? " is-selected" : ""}`}
            onClick={() => selectOption(opt.type)}
          >
            <span className="quiz-option-label">{opt.label}</span>
            <span>{opt.text}</span>
          </button>
        ))}
      </div>
      <div className="quiz-nav">
        <button
          type="button"
          className="btn btn-ghost quiz-back"
          disabled={currentIndex === 0}
          onClick={goBack}
        >
          &larr; Back
        </button>
        <button
          type="button"
          className="btn btn-primary quiz-next"
          disabled={!selectedType || saving}
          onClick={goNext}
        >
          {saving ? "Saving…" : isLast ? "See my result" : "Next"} &rarr;
        </button>
      </div>
    </div>
  );
}
