import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

const API_URL = import.meta.env.VITE_API_URL;

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatisticsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Пороговые значения для выделения курсов
  const threshold = {
    students_enrolled: 300,
    average_rating: 3.5,
    completion_rate: 50,
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`http://${API_URL}/statistics`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
        setError('Ошибка при загрузке статистики');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Подготовка данных для графиков
  courses.sort((a,b)=>b.students_enrolled - a.students_enrolled)
  const studentsChartData = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        label: 'Записалось студентов',
        data: courses.map((course) => course.students_enrolled),
        backgroundColor: courses.map((course) =>
          course.students_enrolled < threshold.students_enrolled ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
        ),
        borderColor: courses.map((course) =>
          course.students_enrolled < threshold.students_enrolled ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  courses.sort((a,b)=>b.completion_rate - a.completion_rate)
  const completionChartData = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        label: 'Процент завершения',
        data: courses.map((course) => course.completion_rate),
        backgroundColor: courses.map((course) =>
          course.completion_rate < threshold.completion_rate ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
        ),
        borderColor: courses.map((course) =>
          course.completion_rate < threshold.completion_rate ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  courses.sort((a,b)=>b.average_rating - a.average_rating)
  const ratingChartData = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        label: 'Средняя оценка',
        data: courses.map((course) => course.average_rating),
        backgroundColor: courses.map((course) =>
          course.average_rating < threshold.average_rating ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
        ),
        borderColor: courses.map((course) =>
          course.average_rating < threshold.average_rating ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  // Опции для горизонтальных столбчатых диаграмм
  const horizontalBarOptions = {
    indexAxis: 'y', // Делаем диаграмму горизонтальной
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const completionBarOptions = {
    indexAxis: 'y', // Делаем диаграмму горизонтальной
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const ratingBarOptions = {
    indexAxis: 'y', // Делаем диаграмму горизонтальной
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  if (loading) {
    return <div className="text-center mt-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Статистика курсов</h1>

      <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
        {/* График: Количество записавшихся студентов */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Количество записавшихся студентов</h2>
          <Bar data={studentsChartData} options={horizontalBarOptions} />
        </div>

        {/* График: Процент завершения */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Процент завершения курсов</h2>
          <Bar data={completionChartData} options={completionBarOptions} />
        </div>

        {/* График: Средняя оценка */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Средняя оценка по курсу</h2>
          <Bar data={ratingChartData} options={ratingBarOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
