"use client";
import { useState } from 'react';
import { generateStudyPlan } from '@/aiServices/studyPlanGenerator';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudyPlanGenerator() {
  const [formData, setFormData] = useState({
    subject: '',
    availableHours: '',
    currentLevel: 'beginner',
    targetDate: ''
  });
  
  const [studyPlan, setStudyPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await generateStudyPlan(formData);
      if (result.success) {
        setStudyPlan(result.plan);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Study Plan Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="e.g., Indian History, Geography"
                required
              />
            </div>

            <div>
              <Label htmlFor="hours">Available Hours per Day</Label>
              <Input
                id="hours"
                type="number"
                min="1"
                max="24"
                value={formData.availableHours}
                onChange={(e) => setFormData({...formData, availableHours: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="level">Current Level</Label>
              <Select 
                value={formData.currentLevel}
                onValueChange={(value) => setFormData({...formData, currentLevel: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Generating Plan...' : 'Generate Study Plan'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}

          {studyPlan && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Personalized Study Plan</h3>
              <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded dark:text-black">
                {studyPlan}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}