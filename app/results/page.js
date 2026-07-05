import { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export const metadata = {
  title: "Your Result — VibeCheck",
  description: "Your VibeCheck archetype result, with live facts pulled from a public Animals API.",
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<p>Loading your result…</p>}>
      <ResultsClient />
    </Suspense>
  );
}
