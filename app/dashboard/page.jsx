import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Your UPSC Prep Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Study Plan</CardTitle>
            <CardDescription>Generate personalized study plans</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/study-plan">
              <Button className="w-full">Create Study Plan</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exam Simulation</CardTitle>
            <CardDescription>Practice with real-time exam conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/exam">
              <Button className="w-full">Start Simulation</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Study Content Generator</CardTitle>
            <CardDescription>Generate Any Topic</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/study-content">
              <Button className="w-full">Generate</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Tracker</CardTitle>
            <CardDescription>Monitor and analyze your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/performance">
              <Button className="w-full">View Performance</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


