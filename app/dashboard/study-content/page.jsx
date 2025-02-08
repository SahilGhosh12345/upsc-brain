"use client";

import { useState } from 'react';
import { generateContent } from '@/aiServices/studyContent';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const content = await generateContent(topic);
      setResponse(content);
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-normal text-foreground mb-2">UPSC Study Assistant</h1>
          <p className="text-muted-foreground">Enter any topic to get comprehensive UPSC-focused content</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., Green Revolution, Indian Constitution, Economic Reforms 1991)"
              className="flex-1 p-4 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </form>

        {response && (
          <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border">
            <div className="p-6">
              {response.split('\n').map((line, index) => {
                // Handle section headings
                if (line.trim() === 'Brief Overview' || 
                    line.trim() === 'Key Points' || 
                    line.trim() === 'Potential UPSC Examination Approach' || 
                    line.trim() === 'Summary') {
                  return (
                    <h2 key={index} className="text-xl text-foreground font-medium mt-6 mb-4 pb-2 border-b border-border">
                      {line.trim()}
                    </h2>
                  );
                }
                // Handle bullet points
                else if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                  return (
                    <li key={index} className="ml-4 mb-3 text-card-foreground">
                      {line.trim().replace(/^[•-]\s*/, '')}
                    </li>
                  );
                }
                // Handle regular paragraphs
                else if (line.trim()) {
                  return (
                    <p key={index} className="mb-4 text-card-foreground leading-relaxed">
                      {line.trim()}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}