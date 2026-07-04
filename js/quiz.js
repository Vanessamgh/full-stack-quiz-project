/**
 * quiz.js
 * Drives the 15-question flow inside quiz.html.
 * No page reloads between questions — each answer swaps the DOM in place.
 */

class Quiz {
  constructor(questions, mountId) {
    this.questions = questions;
    this.mount = document.getElementById(mountId);
    this.currentIndex = 0;
    this.scores = { wolf: 0, cat: 0, dog: 0, eagle: 0, owl: 0, dolphin: 0 };

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
          <button class="quiz-option" data-type="${opt.type}">
            <span class="quiz-option-label">${opt.label}</span>
            <span>${opt.text}</span>
          </button>`
          )
          .join("")}
      </div>
    `;

    this.mount.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => this.selectAnswer(btn.dataset.type));
    });
  }

  selectAnswer(type) {
    this.scores[type]++;
    this.currentIndex++;

    if (this.currentIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      this.finish();
    }
  }

  finish() {
    const params = new URLSearchParams(this.scores);
    window.location.href = `results.html?${params.toString()}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Quiz(window.QUIZ_QUESTIONS, "quizMount");
});

window.Quiz = Quiz;
