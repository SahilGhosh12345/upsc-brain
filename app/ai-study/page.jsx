// app/answer-analysis/page.js
import AnswerAnalysis from '@/components/AnswerAnalysis';

export const metadata = {
  title: 'Answer Analysis - UPSC Preparation',
  description: 'Analyze your UPSC answers with AI-powered feedback'
};

export default function AnswerAnalysisPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Answer Analysis Tool
        </h1>
        <AnswerAnalysis />
      </div>
    </main>
  );
}