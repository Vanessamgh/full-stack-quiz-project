/**
 * accordion.js
 * Individual custom UI requirement: collapsible FAQ answers.
 * Renders from a plain data array and manages open/close state + ARIA attributes.
 */

class Accordion {
  /**
   * @param {string} mountId - id of the container to render into
   * @param {{q: string, a: string}[]} items - question/answer data
   * @param {{allowMultiple: boolean}} options
   */
  constructor(mountId, items, options = { allowMultiple: false }) {
    this.mount = document.getElementById(mountId);
    this.items = items;
    this.allowMultiple = options.allowMultiple;
    this.panels = [];

    if (!this.mount) {
      console.error(`Accordion: no element with id "${mountId}" found`);
      return;
    }
    this.render();
    this.bindEvents();
  }

  render() {
    this.mount.innerHTML = this.items
      .map(
        (item, i) => `
      <div class="faq-item" data-index="${i}">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}" id="faq-question-${i}">
          <span>${item.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer-wrap" id="faq-answer-${i}" role="region" aria-labelledby="faq-question-${i}">
          <div class="faq-answer-inner">
            <p class="faq-answer">${item.a}</p>
          </div>
        </div>
      </div>`
      )
      .join("");

    this.panels = Array.from(this.mount.querySelectorAll(".faq-item"));
  }

  bindEvents() {
    this.mount.addEventListener("click", (e) => {
      const button = e.target.closest(".faq-question");
      if (!button) return;
      const panel = button.closest(".faq-item");
      this.toggle(panel);
    });

    this.mount.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const focusable = Array.from(this.mount.querySelectorAll(".faq-question"));
      const currentIndex = focusable.indexOf(document.activeElement);
      if (currentIndex === -1) return;
      e.preventDefault();
      const nextIndex =
        e.key === "ArrowDown"
          ? (currentIndex + 1) % focusable.length
          : (currentIndex - 1 + focusable.length) % focusable.length;
      focusable[nextIndex].focus();
    });
  }

  toggle(panel) {
    const isOpen = panel.classList.contains("is-open");
    if (!this.allowMultiple) {
      this.panels.forEach((p) => this.close(p));
    }
    isOpen ? this.close(panel) : this.open(panel);
  }

  open(panel) {
    panel.classList.add("is-open");
    panel.querySelector(".faq-question").setAttribute("aria-expanded", "true");
  }

  close(panel) {
    panel.classList.remove("is-open");
    panel.querySelector(".faq-question").setAttribute("aria-expanded", "false");
  }
}

const FAQ_DATA = [
  {
    q: "What does this quiz measure?",
    a: "It measures your personality tendencies based on your answers, not real psychology or diagnosis. It's for entertainment and self-reflection.",
  },
  {
    q: "How is my result calculated?",
    a: "Each answer gives points to different archetypes. The archetype with the highest score becomes your result.",
  },
  {
    q: "Can I get more than one result?",
    a: "Yes. If two archetypes are close in score, you may be a hybrid personality \u2014 for example, Wolf + Owl.",
  },
  {
    q: "Is this scientifically accurate?",
    a: "No. It's inspired by psychology concepts but simplified for fun and engagement.",
  },
  {
    q: "Why did I get this result?",
    a: "Because your answers matched the traits associated with that archetype most strongly.",
  },
  {
    q: "Can I retake the quiz?",
    a: "Yes. Your result may change depending on your mood or choices.",
  },
  {
    q: "What are archetypes?",
    a: 'Archetypes are symbolic personality patterns \u2014 like "Leader," "Observer," or "Explorer" \u2014 used to describe behavior styles.',
  },
  {
    q: "Are there right or wrong answers?",
    a: "No. Every answer reflects a different personality trait.",
  },
  {
    q: "Why do results feel so accurate?",
    a: "Because the questions are designed around common human behavior patterns \u2014 it's the Barnum effect doing its thing, honestly.",
  },
  {
    q: "Can I share my result?",
    a: "Yes! This quiz is designed for sharing on social media.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  new Accordion("faqList", FAQ_DATA, { allowMultiple: false });
});

window.Accordion = Accordion;
window.FAQ_DATA = FAQ_DATA;
