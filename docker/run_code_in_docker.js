import express from 'express';
import runCodeInDocker from './docker/code_runner.js';

const router = express.Router();

router.post('/run', async (req, res) => {
  const { language, code, input } = req.body;

  try {
    const result = await runCodeInDocker(language, code, input);
    res.status(200).json({ output: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
