"use client";

import { Component } from "react";
import { FAQ_DATA } from "@/lib/data";

/**
 * =============================================================================
 * FAQ CLIENT COMPONENT
 * =============================================================================
 *
 * This component displays the Frequently Asked Questions section.
 *
 * Assignment requirement:
 * - Create a FAQ section with collapsible answers.
 * - Implement the functionality using JavaScript.
 *
 * Why this component is a class?
 * --------------------------------
 * The project specification requires the use of ES6 JavaScript classes.
 * Therefore, instead of using a React function component with hooks,
 * this component extends React.Component.
 *
 * Features:
 * - Displays all FAQ questions.
 * - Clicking a question expands its answer.
 * - Clicking it again collapses it.
 * - Only ONE answer can be open at a time.
 * - Uses React state to remember the opened question.
 * - Includes accessibility attributes (aria-expanded, aria-controls).
 */
export default class FaqClient extends Component {

  /**
   * Constructor
   *
   * Called automatically when the component is created.
   *
   * It initializes the component state and binds class methods
   * so they can correctly access "this".
   */
  constructor(props) {
    super(props);

    /**
     * Component state
     *
     * openIndex stores which FAQ item is currently expanded.
     *
     * Example:
     * null -> nothing is open
     * 0    -> first question is open
     * 1    -> second question is open
     * 2    -> third question is open
     */
    this.state = {
      openIndex: null,
    };

    /**
     * Bind the toggle function.
     *
     * In JavaScript class components,
     * methods lose their "this" reference when used as callbacks.
     * Binding ensures that "this" still refers to the component.
     */
    this.toggle = this.toggle.bind(this);
  }

  /**
   * Toggle Function
   *
   * Parameters:
   * i = index of the clicked FAQ.
   *
   * Behavior:
   * - If the clicked question is already open,
   *   close it.
   *
   * - Otherwise,
   *   close any currently open question
   *   and open the newly clicked one.
   *
   * setState automatically triggers a re-render.
   */
  toggle(i) {
    this.setState((prev) => ({

      /**
       * Compare the previously opened question
       * with the clicked question.
       *
       * Same question clicked:
       *      close it.
       *
       * Different question clicked:
       *      open the new one.
       */
      openIndex: prev.openIndex === i ? null : i,
    }));
  }

  /**
   * Render Method
   *
   * This function returns the HTML (JSX)
   * displayed on the screen.
   *
   * Every time state changes,
   * React automatically calls render() again.
   */
  render() {

    /**
     * Destructure state.
     *
     * Instead of writing:
     * this.state.openIndex
     *
     * we simply write:
     * openIndex
     */
    const { openIndex } = this.state;

    return (
      <section className="faq-section" id="faq">

        {/* ==========================================================
            FAQ Header
            ========================================================== */}

        <div className="hero" style={{ paddingTop: 8 }}>

          {/* Small heading above the title */}
          <span className="hero-eyebrow">
            Before you scroll away confused
          </span>

          {/* Main FAQ title */}
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>
            Frequently Overthought Questions
          </h1>

          {/* Short description */}
          <p className="lead">
            Everything you didn&apos;t know you needed to ask about your results.
          </p>

        </div>

        {/* ==========================================================
            FAQ List
            ========================================================== */}

        <div className="faq-list">

          {/*
            Loop through every FAQ object inside FAQ_DATA.

            FAQ_DATA example:

            [
              {
                q: "Question",
                a: "Answer"
              },
              ...
            ]

            map() creates one FAQ item for each object.
          */}
          {FAQ_DATA.map((item, i) => {

            /**
             * Determine whether
             * this question is currently open.
             *
             * Example:
             * openIndex = 2
             *
             * FAQ #2 -> true
             * all others -> false
             */
            const isOpen = openIndex === i;

            return (

              <div
                className={`faq-item${isOpen ? " is-open" : ""}`}
                key={item.q}
              >

                {/* ==================================================
                    Question Button
                    ==================================================

                    Clicking this button calls toggle(i).

                    aria-expanded tells screen readers
                    whether the content is currently open.
                */}

                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => this.toggle(i)}
                >

                  {/* Question text */}
                  <span>{item.q}</span>

                  {/* Plus icon (can rotate with CSS when open) */}
                  <span
                    className="faq-icon"
                    aria-hidden="true"
                  >
                    +
                  </span>

                </button>

                {/* ==================================================
                    Answer Container
                    ==================================================

                    The answer is always rendered.

                    CSS decides whether it is visible
                    by checking if the parent has
                    the "is-open" class.
                */}

                <div
                  className="faq-answer-wrap"
                  id={`faq-answer-${i}`}
                  role="region"
                >

                  {/* Used for smooth height animation */}
                  <div className="faq-answer-inner">

                    {/* Actual answer text */}
                    <p className="faq-answer">
                      {item.a}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </section>
    );
  }
}