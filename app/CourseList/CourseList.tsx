const CourseList = ({ courses }) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">{course.name}</h3>
          <p className="text-gray-700 mt-2">{course.description}</p>
          <p className="text-gray-500 mt-1">
            Категория: {course.category_name || 'Не указана'}
          </p>
          <div className="mt-4">
            <p className="text-gray-600">
              🧑‍🎓 Записалось студентов: {course.students_enrolled || 0}
            </p>
            <p className="text-gray-600">
              ⭐ Средний рейтинг: {course.average_rating || 0}
            </p>
            <p className="text-gray-600">
              ✅ Средний процент завершения: {course.completion_rate || 0}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
