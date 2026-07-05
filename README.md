# full-stack-quiz-project


## 1

**Live site:** https://full-stack-quiz-project.vercel.app
**Repository:** https://github.com/Vanessamgh/full-stack-quiz-project
NOTE: IF YOU WANT TO RUN THE FILE YOU SHOULD CREATED .ENV IN VISUAL STUDI O FOLDER AND ADD DATABASE_URL  and DIRECT_URL
ALSO SETUP REQUIRED FOR API READ 2.B. API USED SECTION 

## 2.a. Author

- **Name:** Vanessa Mghames


## 2.b. API used
- **API used:** API Ninjas — Animals API (`https://api.api-ninjas.com/v1/animals`), requires a free account and an API key.
- **Where it's called:** `lib/api.js` (`AnimalApiService` class) → used in `app/results/ResultsClient.js`.
- **Loading / empty / error states:** each archetype fact card shows a "Loading live data…" state while the request is in flight, an "empty" state if the API returns no match, and an explicit error state (including a friendly message if no API key has been configured yet).
- **Client-side search/filter:** the results page includes a live text filter over the six archetype fact cards (no extra network requests — filtering happens instantly in the browser).

**Setup required:** the API key is currently a placeholder in `lib/api.js` And `js/api.js` (`YOUR_API_KEY_HERE`). To see live data:
1. Create a free account at https://api-ninjas.com/
2. Copy your API key.
3. Paste it into `API_NINJAS_KEY` in `lib/api.js`.

Without a key, the site still works — it falls back to the curated facts described below.


## 2.c. Brief description of the project

If you had the chance to spend a day in the wild, which animal would best match your vibe? Have you ever wondered about it? Take this fun personality quiz to discover the animal archetype that best fits your energy, mindset, and style.
VibeCheck is a single-page-per-view personality quiz. The visitor answers 15 multiple-choice questions and is matched to one of six animal archetypes (Wolf, Cat, Dog, Eagle, Owl, Dolphin) based on which type scores highest. The result page shows:

- A written personality profile (tagline, description, strengths) for the matched archetype — or a **hybrid** result if two archetypes tie.
- A full score breakdown chart across all six archetypes.
- **Live characteristics fetched from a public API** for every archetype (habitat, diet, top speed, lifespan), with search/filter over the results.
- A short history of the visitor's own past results, stored anonymously.
- A FAQ page explaining how scoring works, with collapsible question/answer cards.


## 2 d. Explanation of your custom requirement

**Requirement:** Create a FAQ section with collapsible answers using JavaScript.

**Implementation:** `app/faq/FaqClient.js` renders the FAQ list from `FAQ_DATA` and tracks which single item is open via component state (`openIndex`). Clicking a question toggles it open/closed; `aria-expanded` and `aria-controls` are kept in sync for accessibility, and only one answer is open at a time. See the inline code comment in `FaqClient.js` for details.

*(The vanilla-JS version of the same requirement lives in `js/accordion.js`, implemented as a standalone ES6 `Accordion` class that manages the open/close state and ARIA attributes directly on the DOM, plus keyboard arrow-key navigation between questions.)*


## 2 e. The AI-use appendix (tools, prompts, and what the AI got wrong)
**a. Tools used and what for:**
- cLAUDE.AI used to help with writing the CODE no intervention to push on github or deploy live URL all this work was done manually claude only replied to my specific questions.
- CHATGPT useed to generate the questions of the quiz and the faq questions/answers


**b. 2–3 actual prompts you used** (copy them verbatim from your own chat history):
1. Prompt 1:
hello i have a university project for a full stack course i took i have some requirement i want you to consider op-psychology tests or archetype quizzes I WILL SEND YOU REQUIREMENTS THE TEST I PREPARED AND THE FAQ I WANT PLEASE STRCTUREE ME A PROPER PLAN FAQ i have a requirement Create a FAQ section with collapsible answers using JavaScript.MAKE THE QUIZ ATTRACTIVE AND FUNNY AND RESPECT ALL REQUIREMENTS
What does this quiz measure?
It measures your personality tendencies based on your answers, not real psychology or diagnosis. It’s for entertainment and self-reflection.
❓ How is my result calculated?
Each answer gives points to different archetypes. The archetype with the highest score becomes your result.
❓ Can I get more than one result?
Yes. If two archetypes are close in score, you may be a hybrid personality (for example: Wolf + Owl).
❓ Is this scientifically accurate?
No. It is inspired by psychology concepts but simplified for fun and engagement.
❓ Why did I get this result?
Because your answers matched the traits associated with that archetype most strongly.
❓ Can I retake the quiz?
Yes. Your result may change depending on mood or choices.
❓ What are archetypes?
Archetypes are symbolic personality patterns (like “Leader,” “Observer,” “Explorer”) used to describe behavior styles.
❓ Are there right or wrong answers?
No. Every answer reflects a different personality trait.
❓ Why do results feel so accurate?
Because the questions are designed around common human behavior patterns.
❓ Can I share my result?
Yes! This quiz is designed for sharing on social media
Full Stack Development 
Final Project 2026 
 
Title 
Build & Deploy Your Website 
Due date  
July 5, 2026 
 
Objective 
Build a well-structured, visually attractive, and fully functional individual website using the full stack of front-end 
technologies covered during the course, and deploy it live to the web for free. The subject and theme of the 
website are entirely up to you, giving you the freedom to explore a topic you’re passionate about — but the site 
must be built around real content on a specific topic (no placeholder / “lorem ipsum” filler). 
Technologies & Requirements 
HTML & CSS 
• Use semantic HTML5 
• Style your site with hand-written CSS3 
• Implement Flexbox and Bootstrap 5 (Bootstrap is required for some students) for layout and components 
• Follow responsive design principles 
•  
JavaScript 
• All JavaScript must be written using ES6 classes 
• Use JavaScript to create real functionality (e.g., dynamic content, form interaction) 
• Avoid jQuery or older JS syntax 
 
Pages & Navigation 
• Minimum 3 pages (Home + 2 internal) 
• Use a consistent navigation bar (always showing in all pages) 
• Implement routing manually with anchors (<a href="page.html">) or dynamically with JS (optional) 
 
API Integration 
• Fetch data from at least one public API that requires registration / an API key (e.g., API Ninjas, …) 
• Display the data in a styled and user-friendly interface 
• Implement at least one of: client-side search, filtering, or pagination over the fetched data 
• Handle loading, error, and empty states properly 
 
Your Own Content 
• Beyond the API, include a meaningful set of your own curated or collected data about your topic (roughly 15+ 
real items) — not placeholder text 
 
 
 Full Stack Development – Final Project 2026 Page 2 of 5 
Individual Custom UI Requirement 
Each student has one unique front-end requirement (see the assignment table at the end). These include layout 
challenges like implementing a carousel, footer, modal, etc. The requirement must be clearly implemented, 
explained in a code comment, and described in your engineering log. 
Hosting & Deployment (free) 
• Deploy your site live, for free, on Vercel, Netlify, or GitHub Pages 
• The live URL must load with no console errors and be usable on a phone 
• You must submit both the live URL and the GitHub repository (see Submission) 
Process, Documentation & AI Use 
This part is graded and is how the work is shown to be your own.  
 
Version control discipline 
• Build the project through meaningful, incremental commits spread across the whole project period 
• A single bulk commit, or a few commits right before the deadline, loses marks; commit messages must be 
descriptive 
 
AI-use appendix (in the README) 
• You may use AI tools (Claude, ChatGPT, …), but you must disclose your use honestly and specifically: 
a. List the tools you used and what you used each one for 
b. Include 2–3 of the actual prompts you used 
c. Describe at least 2 specific things the AI got wrong or that did not work, and exactly how you found 
and fixed each one 
d. Undisclosed AI use, or an appendix that does not match your code and commit history, is 
treated as an academic-integrity violation 
 
Evidence (in the repo) 
• Screenshots of the site at mobile, tablet, and desktop widths 
Submission Instructions 
1. Upload your project to a public GitHub repository (full source code and evidence screenshots) 
2. Include a README.md file with: 
a. Your name 
b. API used 
c. Brief description of your project 
d. Explanation of your custom requirement 
e. The AI-use appendix (tools, prompts, and what the AI got wrong) 
3. Deploy the site and obtain a live URL (Vercel / Netlify / GitHub Pages) 
4. Submit both the GitHub repository link and the live deployment URL via Teams, inside the assignment 
section.  
Rules and Guidelines 
1. Individual Work: This project must be completed individually. Collaboration is not allowed. 
2. Originality: Near-identical code across students, or matching prior-year projects, will be flagged and 
investigated. 
3. Late Submissions: Late submissions will incur penalties unless prior approval is granted. 
 
 
 Full Stack Development – Final Project 2026 Page 3 of 5 
Grading Criteria 
15%     Website functionality 
15%     API integration (+ search/filter) 
10%     Code quality (ES6, no errors) 
10%     UI/UX & responsiveness 
10%     Unique UI requirement 
10%     Live deployment 
10%     Engineering docs 
10%     AI-use appendix 
 
10%       Creativity & polish 
Tools and Resources 
1. VS Code 
2. Github 
3. Key-based public API (OpenWeather, TMDB, API 
Ninjas, …) 
4. Bootstrap 
5. Vercel / Netlify / GitHub Pages 
6. AI (ChatGPT, Claude, …)  
 ---

## Q12. Your motivation:

A. Freedom
B. Peace
C. Connection
D. Success
E. Knowledge
F. Fun

---

## Q13. Your friend group role:

A. Protector
B. Lone wolf
C. Social glue
D. Goal setter
E. Advisor
F. Entertainer

---

## Q14. Your reaction to stress:

A. Fight through it
B. Withdraw
C. Seek support
D. Work harder
E. Think deeply
F. Laugh it off

---

## Q15. Your motto:

A. “Stay strong.”
B. “Stay calm.”
C. “Stay connected.”
D. “Stay focused.”
E. “Stay curious.”
F. “Stay weird.”

---
# 📊 Scoring System

| Answer | Animal     |
| ------ | ---------- |
| A      | 🐺 Wolf    |
| B      | 🐱 Cat     |
| C      | 🐶 Dog     |
| D      | 🦅 Eagle   |
| E      | 🦉 Owl     |
| F      | 🐬 Dolphin |

---

# 🏁 Result Meanings

### 🐺 Wolf

You’re independent, loyal, and strategic. You value freedom but protect your inner circle deeply.

### 🐱 Cat

You’re calm, selective, and mysterious. You like your space and don’t trust easily—but you care deeply.

### 🐶 Dog

You’re friendly, loyal, and emotional. People love your energy and kindness.

### 🦅 Eagle

You’re ambitious, focused, and goal-driven. You always aim high and think long-term.

### 🦉 Owl

You’re intelligent, observant, and analytical. You prefer thinking before acting.

### 🐬 Dolphin

You’re social, playful, and creative. You bring fun energy wherever you go.


2. Prompt 2:all of phase 3 is working correctly but why in result page we see Recent results from other players

🐶 Dog — 7/5/2026, 11:55:17 AM
🐬 Dolphin — 7/5/2026, 11:53:44 AM we must see this or the sql must be only for the person how created the test of for the users tell me is there spoemthing wrong?

Q: What should the results page show?
A: Make it private — each visitor only sees their own past results

3. i deploy on vercel now i want ti take the quiz on my phone what to do

**c. At least 2 specific things the AI got wrong, and exactly how you found and fixed each one:**

1. 
**Issue:**: The AI originally returned only one archetype (e.g., only “Owl”) even when multiple animals had the same highest score (e.g., Owl = 5 and Dolphin = 5).
**How I found it:** I checked the database output and quiz scoring logic in Neon and noticed that the stored results contained multiple equal top scores, but the result page only displayed a single animal instead of combining them.
**How I fixed it:** I modified the logic to check for all animals that share the maximum score instead of selecting only the first one. Now the system correctly returns combined archetypes such as “Owl + Dolphin” when they tie.

2. **Issue:** The results page was showing “Recent results from other players,” mixing data from different users instead of showing only the current user’s quiz history.
**How I found it:** I noticed inconsistent results appearing on the results page (e.g., Dog and Dolphin entries that did not belong to the same session), which indicated that the SQL query was pulling global data from all users.
**How I fixed it:** I identified that the database query had no user filtering, so I added a visitor_id field and updated the backend logic to store and retrieve results based on the specific user/browser. This ensured that each user only sees their own quiz results instead of a shared global leaderboard.



## 10. Screenshots (Responsive Evidence)

> 📌 **Attached in evidence folder 

- Mobile: `evidence/mobile.png` 
- Desktop: `evidence/desktop.png` — NOTE HERE I PASTED MY KEY IN PASTE KEY HERE SO THE LIVE API IS SHOWN
- TABLET : I don't have one to try