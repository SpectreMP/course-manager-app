import { useState, useEffect } from 'react'
import CourseCreationForm from "~/CourseCreationForm/CourseCreationForm";
import CourseList from "~/CourseList/CourseList";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

export function CourseManagement() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://${API_URL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Ошибка при загрузке курсов:', error);
    }
  };

  // Загружаем курсы при монтировании компонента
  useEffect(() => {
    fetchCourses();
  }, []);

  // Функция для обновления списка курсов
  const handleCourseCreated = (newCourse) => {
    setCourses([...courses, newCourse]); // Добавляем новый курс в список
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Управление курсами</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка: Форма создания курса */}
          <div className="lg:sticky lg:top-8 h-fit bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Создать новый курс</h2>
            <CourseCreationForm onCourseCreated={handleCourseCreated} />
          </div>

          {/* Правая колонка: Список курсов */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Список курсов</h2>
            <CourseList courses={courses} />
          </div>
        </div>
      </div>
    </div>
  );
}
