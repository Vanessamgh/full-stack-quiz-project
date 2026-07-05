/**
 * quiz.js
 * Drives the 15-question flow inside quiz.html.
 * No page reloads between questions — each answer swaps the DOM in place.
 * Clicking an option selects it; Back / Next buttons control navigation.
 */

class Quiz {
  constructor(questions, mountId) {
    this.questions = questions;
    this.mount = document.getElementById(mountId);
    this.currentIndex = 0;
    this.scores = { wolf: 0, cat: 0, dog: 0, eagle: 0, owl: 0, dolphin: 0 };
    this.answers = []; // type chosen for each question index, so Back/Next can restore selection

    if (!this.mount) {
      console.error(`Quiz: no element with id "${mountId}" found`);
      return;
    }
    this.renderQuestion();
  }

  get progressPercent() {
    return Math.round((this.currentIndex / this.questions.length) * 100);
  }

  renderQuestion() {
    const question = this.questions[this.currentIndex];
    const selectedType = this.answers[this.currentIndex];
    const isLast = this.currentIndex === this.questions.length - 1;

    this.mount.innerHTML = `
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width:${this.progressPercent}%"></div>
      </div>
      <p class="quiz-step">Question ${this.currentIndex + 1} of ${this.questions.length}</p>
      <h2 class="quiz-question">${question.text}</h2>
      <div class="quiz-options">
        ${question.options
          .map(
            (opt) => `
          <button class="quiz-option${opt.type === selectedType ? " is-selected" : ""}" data-type="${opt.type}">
            <span class="quiz-option-label">${opt.label}</span>
            <span>${opt.text}</span>
          </button>`
          )
          .join("")}
      </div>
      <div class="quiz-nav">
        <button class="btn btn-ghost quiz-back" ${this.currentIndex === 0 ? "disabled" : ""}>&larr; Back</button>
        <button class="btn btn-primary quiz-next" ${selectedType ? "" : "disabled"}>
          ${isLast ? "See my result" : "Next"} &rarr;
        </button>
      </div>
    `;

    this.mount.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => this.selectOption(btn));
    });

    this.mount.querySelector(".quiz-back").addEventListener("click", () => this.goBack());
    this.mount.querySelector(".quiz-next").addEventListener("click", () => this.goNext());
  }

  selectOption(btn) {
    this.answers[this.currentIndex] = btn.dataset.type;

    this.mount.querySelectorAll(".quiz-option").forEach((b) => b.classList.remove("is-selected"));
    btn.classList.add("is-selected");

    this.mount.querySelector(".quiz-next").disabled = false;
  }

  goNext() {
    const selectedType = this.answers[this.currentIndex];
    if (!selectedType) return;

    this.currentIndex++;

    if (this.currentIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      this.finish();
    }
  }

  goBack() {
    if (this.currentIndex === 0) return;
    this.currentIndex--;
    this.renderQuestion();
  }

  finish() {
    Object.keys(this.scores).forEach((key) => (this.scores[key] = 0));
    this.answers.forEach((type) => {
      if (type) this.scores[type]++;
    });

    const params = new URLSearchParams(this.scores);
    window.location.href = `results.html?${params.toString()}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz(window.QUIZ_QUESTIONS, "quizMount");
});

window.Quiz = Quiz;