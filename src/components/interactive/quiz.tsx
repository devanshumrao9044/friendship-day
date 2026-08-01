import { useState } from "react";

type Question = { id: string; prompt: string; options: string[]; answer: number; note: string };

const questions: Question[] = [
  {
    id: "q1",
    prompt: "What do we do best together?",
    options: ["Absolutely nothing", "Making plans we cancel", "Arguing about films"],
    answer: 0,
    note: "Doing nothing with you is still the best plan.",
  },
  {
    id: "q2",
    prompt: "Which one is our signature move?",
    options: ["Being early", "A 3am phone call", "Group photos"],
    answer: 1,
    note: "3am, terrible snacks, best conversation.",
  },
  {
    id: "q3",
    prompt: "What did I keep from you all these years?",
    options: ["A concert ticket", "A doodle on a napkin", "A borrowed hoodie"],
    answer: 1,
    note: "The frog doodle. Framed, basically.",
  },
];

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = questions.filter((q) => answers[q.id] === q.answer).length;
  const done = Object.keys(answers).length === questions.length;

  return (
    <div className="glass rounded-3xl p-5">
      <h3 className="text-xl font-bold text-foreground">How well do you know us?</h3>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {done ? `${score} of ${questions.length} right — obviously.` : "Pick an answer for each one."}
      </p>

      <ol className="mt-5 space-y-5">
        {questions.map((question) => {
          const chosen = answers[question.id];
          return (
            <li key={question.id}>
              <fieldset>
                <legend className="font-semibold text-foreground">{question.prompt}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {question.options.map((option, index) => {
                    const selected = chosen === index;
                    const correct = index === question.answer;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [question.id]: index }))
                        }
                        aria-pressed={selected}
                        className={`min-h-11 rounded-full px-4 text-sm font-medium transition-colors ${
                          selected
                            ? correct
                              ? "bg-primary text-primary-foreground"
                              : "bg-destructive text-destructive-foreground"
                            : "bg-card text-foreground hover:bg-secondary"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {chosen === question.answer && (
                  <p className="mt-2 font-hand text-xl text-primary">{question.note}</p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>
    </div>
  );
}