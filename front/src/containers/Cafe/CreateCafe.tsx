import { createCafe } from "../../features/cafes/cafesThunks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Box, Grid, TextField, Typography, Button, Alert } from "@mui/material";
import FileInput from "../../components/FileInput/FileInput";
import { useState } from "react";
import type { CafePost, ValidationError } from "../../types";
import Checkbox from "@mui/material/Checkbox";
import { selectCafesCreateError } from "../../features/cafes/cafesSelectors";
import { useNavigate } from "react-router";


const CreateCafe = () => {
  const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectCafesCreateError);

    const [form, setForm] = useState<CafePost>({
        title: "",
        description: "",
        images: [],
        isAgree: false,
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const getFieldError = (fieldName: string) => {
    try {
        if (error && "errors" in error) {
          return (error as ValidationError).errors[fieldName]?.message;
        }
    } catch {
        return undefined;
    }
    };

    const submitFormHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await dispatch(createCafe(form)).unwrap();
        navigate("/");
      } catch(e) {
        console.log(e);
      }
    };

    const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setForm((prev) => ({ ...prev, [name]: checked }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
        const filesArray = Array.from(files);
        setForm((prevState) => ({
        ...prevState,
        [name]: filesArray,
        }));
    }
    };

    return (
      <>
        <Typography variant="h4">Add new Cafe</Typography>
        <Box
          component={"form"}
          onSubmit={submitFormHandler}
          sx={{ marginInline: "auto", maxWidth: "600px", marginBlock: 4 }}
        >
          <Grid container spacing={2} sx={{ flexDirection: "column" }}>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid size={6}>
                <Typography sx={{ fontSize: "22px" }}>Title:</Typography>
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  name="title"
                  value={form.title}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError("title"))}
                  helperText={getFieldError("title")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid size={6}>
                <Typography sx={{ fontSize: "22px" }}>Description:</Typography>
              </Grid>
              <Grid size={6}>
                <TextField
                  multiline={true}
                  rows={3}
                  fullWidth
                  name="description"
                  value={form.description}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError("description"))}
                  helperText={getFieldError("description")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid size={6}>
                <Typography sx={{ fontSize: "22px" }}>Images:</Typography>
              </Grid>
              <Grid size={6}>
                <FileInput
                  label="images"
                  name="images"
                  onChange={fileInputChangeHandler}
                  isError={Boolean(getFieldError("images"))}
                  errorText={getFieldError("images")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid size={6}>
                {error && 'error' in error && <Alert severity="error">{error.error}</Alert>}
                <Typography variant="body2">
                  By submitting this form, you agree that the folowwing
                  information will be submitted to the public domain
                </Typography>
              </Grid>
              <Grid size={6}>
                <Checkbox
                  name="isAgree"
                  checked={form.isAgree}
                  onChange={checkboxChangeHandler}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ alignItems: "center" }}>
              <Grid size={6}>
                <Button type="submit" variant="outlined">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    );
};


export default CreateCafe;