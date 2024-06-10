import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  inputDescription: yup.string().required("Input Description is required"),
  outputDescription: yup.string().required("Output Description is required"),
  constraints: yup.string().required("Constraints are required"),
  examples: yup.array().of(
    yup.object({
      input: yup.string().required("Example input is required"),
      output: yup.string().required("Example output is required"),
      explanation: yup.string(),
    })
  ),
  tags: yup.array().of(yup.string()),
  difficulty: yup
    .string()
    .oneOf(["Easy", "Medium", "Hard"])
    .required("Difficulty is required"),
  author: yup.string().required("Author is required"),
});

function AddProblem() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      inputDescription: "",
      outputDescription: "",
      constraints: "",
      examples: [{ input: "", output: "", explanation: "" }],
      tags: [""],
      difficulty: "",
      author: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      // Add your form submission logic here
    },
  });

  const addExample = () => {
    formik.setFieldValue("examples", [
      ...formik.values.examples,
      { input: "", output: "", explanation: "" },
    ]);
  };

  const removeExample = (index) => {
    const examples = formik.values.examples.filter((_, i) => i !== index);
    formik.setFieldValue("examples", examples);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Problem
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          id="inputDescription"
          name="inputDescription"
          label="Input Description"
          value={formik.values.inputDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.inputDescription &&
            Boolean(formik.errors.inputDescription)
          }
          helperText={
            formik.touched.inputDescription && formik.errors.inputDescription
          }
          margin="normal"
        />
        <TextField
          fullWidth
          id="outputDescription"
          name="outputDescription"
          label="Output Description"
          value={formik.values.outputDescription}
          onChange={formik.handleChange}
          error={
            formik.touched.outputDescription &&
            Boolean(formik.errors.outputDescription)
          }
          helperText={
            formik.touched.outputDescription && formik.errors.outputDescription
          }
          margin="normal"
        />
        <TextField
          fullWidth
          id="constraints"
          name="constraints"
          label="Constraints"
          value={formik.values.constraints}
          onChange={formik.handleChange}
          error={
            formik.touched.constraints && Boolean(formik.errors.constraints)
          }
          helperText={formik.touched.constraints && formik.errors.constraints}
          margin="normal"
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Examples
        </Typography>
        {formik.values.examples.map((example, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              id={`examples[${index}].input`}
              name={`examples[${index}].input`}
              label="Example Input"
              value={example.input}
              onChange={formik.handleChange}
              error={
                formik.touched.examples?.[index]?.input &&
                Boolean(formik.errors.examples?.[index]?.input)
              }
              helperText={
                formik.touched.examples?.[index]?.input &&
                formik.errors.examples?.[index]?.input
              }
              margin="normal"
            />
            <TextField
              fullWidth
              id={`examples[${index}].output`}
              name={`examples[${index}].output`}
              label="Example Output"
              value={example.output}
              onChange={formik.handleChange}
              error={
                formik.touched.examples?.[index]?.output &&
                Boolean(formik.errors.examples?.[index]?.output)
              }
              helperText={
                formik.touched.examples?.[index]?.output &&
                formik.errors.examples?.[index]?.output
              }
              margin="normal"
            />
            <TextField
              fullWidth
              id={`examples[${index}].explanation`}
              name={`examples[${index}].explanation`}
              label="Example Explanation"
              value={example.explanation}
              onChange={formik.handleChange}
              margin="normal"
            />
            <IconButton
              onClick={() => removeExample(index)}
              aria-label="remove example"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          color="primary"
          variant="contained"
          onClick={addExample}
          startIcon={<AddIcon />}
        >
          Add Example
        </Button>
        <TextField
          fullWidth
          id="tags"
          name="tags"
          label="Tags"
          value={formik.values.tags}
          onChange={formik.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          select
          id="difficulty"
          name="difficulty"
          label="Difficulty"
          value={formik.values.difficulty}
          onChange={formik.handleChange}
          error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
          helperText={formik.touched.difficulty && formik.errors.difficulty}
          margin="normal"
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </TextField>
        <TextField
          fullWidth
          id="author"
          name="author"
          label="Author"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
          margin="normal"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default AddProblem;
