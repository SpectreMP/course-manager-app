import { useState, useEffect } from 'react';

const CourseCreationForm = ({ onCourseCreated }) => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategoryId, setCourseCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://${API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      name: courseName,
      description: courseDescription,
      category_id: courseCategoryId,
    };

    try {
      const response = await fetch(`http://${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        const createdCourse = await response.json();
        onCourseCreated(createdCourse);
        alert('Курс успешно создан!');
        setCourseName('');
        setCourseDescription('');
        setCourseCategoryId('');
      } else {
        alert('Ошибка при создании курса');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="courseName" className="block text-gray-700 font-bold mb-2">
          Название курса:
        </label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="courseDescription" className="block text-gray-700 font-bold mb-2">
          Описание курса:
        </label>
        <textarea
          id="courseDescription"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="courseCategory" className="block text-gray-700 font-bold mb-2">
          Категория курса:
        </label>
        <select
          id="courseCategory"
          value={courseCategoryId}
          onChange={(e) => setCourseCategoryId(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Создать курс
      </button>
    </form>
  );
};

export default CourseCreationForm;
