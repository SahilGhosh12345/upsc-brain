'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const subjectData = [
  { name: 'History', score: 75 },
  { name: 'Polity', score: 82 },
  { name: 'Geography', score: 68 },
  { name: 'Economics', score: 90 },
  { name: 'Science', score: 85 },
]

const progressData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 70 },
  { week: 'Week 3', score: 75 },
  { week: 'Week 4', score: 72 },
  { week: 'Week 5', score: 80 },
  { week: 'Week 6', score: 85 },
]

export default function Performance() {
  const [feedback, setFeedback] = useState('')

  const generateFeedback = () => {
    // This is where you'd integrate with an AI service
    setFeedback(`Based on your recent performance:

1. Strong performance in Economics (90%) and Science (85%). Keep up the good work in these areas.
2. Solid understanding of Polity (82%). Consider focusing on more advanced topics to further improve.
3. History (75%) is above average, but there's room for improvement. Review key events and their implications.
4. Geography (68%) needs the most attention. Focus on physical geography and current environmental issues.

Overall, you're making good progress. To improve further:
- Dedicate more time to Geography, particularly map-based questions.
- For History, focus on connecting events and understanding their long-term impacts.
- In Polity, start analyzing current events in the context of constitutional provisions.
- Maintain your strong performance in Economics and Science through regular revision.

Keep up the consistent study habits and you'll see improvement across all subjects!`)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Performance Tracker</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>Your performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Study Time</CardTitle>
                <CardDescription>Your weekly study hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">30 hours</p>
                <p className="text-muted-foreground">This week</p>
                <p className="mt-4 text-lg">Previous weeks:</p>
                <ul className="list-disc list-inside">
                  <li>Last week: 28 hours</li>
                  <li>Two weeks ago: 32 hours</li>
                  <li>Three weeks ago: 29 hours</li>
                </ul>
                <p className="mt-4 font-semibold">Average: 29.75 hours/week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Your scores across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>AI Feedback</CardTitle>
              <CardDescription>Get personalized feedback on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={generateFeedback} className="mb-4">Generate AI Feedback</Button>
              <Textarea 
                value={feedback} 
                readOnly 
                className="w-full h-[300px]"
                placeholder="AI-generated feedback will appear here..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

