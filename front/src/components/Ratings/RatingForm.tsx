import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  type SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { GlobalError, RatingPost } from "../../types";
import Spinner from "../Spinner/Spinner";


interface Props {
    submit: (data: RatingPost) => void;
    isLoading: boolean;
    error: GlobalError | null
}

const RatingsForm: React.FC<Props> = ({ submit, isLoading, error }) => {
  const [form, setForm] = useState<RatingPost>({
    description: "",
    food: 5,
    service: 5,
    interior: 5,
  });

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>
  ) => {
    const { name } = e.target as { name: string; value: string | number };
    const rawValue = (e.target as { value: string | number }).value;
    const value = name === "description" ? rawValue : Number(rawValue);

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    submit(form);
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2, position: 'relative' }}
    >
        {isLoading && <Spinner/>}
      <Typography variant="h6" gutterBottom>
        Add review
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        name="description"
        label="description"
        value={form.description}
        onChange={changeHandler}
        sx={{ mb: 2 }}
        error={Boolean(error)}
        helperText={error?.error}
      />

      <Grid container spacing={2} sx={{ mb: 3, alignItems: "center" }}>
        <Grid size={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Quality of food</InputLabel>
            <Select
              name="food"
              value={form.food}
              label="Quality of food"
              onChange={changeHandler}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Service quality</InputLabel>
            <Select
              name="service"
              value={form.service}
              label="Service quality"
              onChange={changeHandler}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Interior</InputLabel>
            <Select
              name="interior"
              value={form.interior}
              label="Interior"
              onChange={changeHandler}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={3}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Submit review
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

    </Box>
  );
};

export default RatingsForm;
