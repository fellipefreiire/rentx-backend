import { Router } from 'express'
import { Category } from '../model/Category';
import { CategoryRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description })

  return res.status(201).send();
})

export { categoriesRoutes }