import { Check, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

function LessonList({ lessons, progress, onLessonClick }) {
  console.log(lessons)
  return (
    <div className="p-4 space-y-4 border-2 rounded-md mt-2 w-[400px]">
      <h2 className="text-2xl font-bold">Lectures</h2>
      {lessons?.map((lesson) => {
        const isCompleted = progress?.find((progressItem) => progressItem.lectureId === lesson._id)?.viewed
        return (
          <div key={lesson._id} className="flex items-center justify-between space-x-2 text-sm font-medium">
            <div className="flex items-center space-x-2">
              {isCompleted ? <Check className="h-4 w-4 text-green-500" /> : <Play className="h-4 w-4" />}
              <span>{lesson.title}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => onLessonClick(lesson._id)}>
              {isCompleted ? "Review" : "Start"}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default LessonList;

