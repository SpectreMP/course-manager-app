import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT, 
});

// Функция для генерации случайных данных
const generateRandomStatistics = () => {
  return {
    students_enrolled: Math.floor(Math.random() * 1000), // Случайное число от 0 до 1000
    average_rating: (Math.random() * 3 + 2.0).toFixed(1),     // Случайное число от 0.0 до 5.0
    completion_rate: (Math.random() * 100).toFixed(1),  // Случайное число от 0.0 до 100.0
  };
};

// Создание таблицы курсов (если она не существует)
pool.query(`
  CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL
  );
`);

// Создание таблицы категорий (если она не существует)
pool.query(`
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
`);

// Создание таблицы статистики (если она не существует)
pool.query(`
  CREATE TABLE IF NOT EXISTS course_statistics (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    students_enrolled INT NOT NULL,
    average_rating FLOAT NOT NULL,
    completion_rate FLOAT NOT NULL
  );
`);

// API для получения списка категорий
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error);
    res.status(500).json({ error: 'Ошибка при загрузке категорий' });
  }
});

// API для получения списка статистики
app.get('/api/statistics', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT courses.id, courses.name, courses.description, categories.name AS category_name,
             course_statistics.students_enrolled, course_statistics.average_rating, course_statistics.completion_rate
      FROM courses
      LEFT JOIN categories ON courses.category_id = categories.id
      LEFT JOIN course_statistics ON courses.id = course_statistics.course_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error);
    res.status(500).json({ error: 'Ошибка при загрузке категорий' });
  }
});

// API для создания курса
app.post('/api/courses', async (req, res) => {
  const { name, description, category_id } = req.body;

  try {
    const courseResult = await pool.query(
      'INSERT INTO courses (name, description, category_id) VALUES ($1, $2, $3) RETURNING *',
      [name, description, category_id]
    );

    const course = courseResult.rows[0];

    // Генерируем случайные данные для статистики
    const { students_enrolled, average_rating, completion_rate } = generateRandomStatistics();

    // Создаём запись в таблице course_statistics
    await pool.query(
      'INSERT INTO course_statistics (course_id, students_enrolled, average_rating, completion_rate) VALUES ($1, $2, $3, $4)',
      [course.id, students_enrolled, average_rating, completion_rate]
    );

    // Возвращаем созданный курс вместе со статистикой
    res.status(201).json({
      ...course,
      statistics: { students_enrolled, average_rating, completion_rate },
    });
  } catch (error) {
    console.error('Ошибка при создании курса:', error);
    res.status(500).json({ error: 'Ошибка при создании курса' });
  }
});

// API для получения списка курсов
app.get('/api/courses', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT courses.id, courses.name, courses.description, categories.name AS category_name,
             course_statistics.students_enrolled, course_statistics.average_rating, course_statistics.completion_rate
      FROM courses
      LEFT JOIN categories ON courses.category_id = categories.id
      LEFT JOIN course_statistics ON courses.id = course_statistics.course_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при загрузке курсов:', error);
    res.status(500).json({ error: 'Ошибка при загрузке курсов' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
