import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.send('API is working!')
})

router.post('/join', (req, res) => {
  const { username } = req.body
  res.send(`Welcome, ${username}!`)
})
