import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function CourseOverview({ title, instructor, progress, totalLessons, completedLessons }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">Instructor: {instructor}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>
          <div className="flex justify-between text-sm">
            <span>Completed Lessons</span>
            <span>
              {completedLessons} / {totalLessons}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseOverview

