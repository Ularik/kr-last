import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";

interface Props {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorText?: string; 
  isError?: boolean;
}

const FileInput: React.FC<Props> = ({ name, label, onChange, errorText, isError }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState("");
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview[0] as string);
    };
  }, [preview]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      const filesPreview = filesArray
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => URL.createObjectURL(file));

      setPreview(filesPreview);
    } else {
      setFilename("");
      setPreview([]);
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        ref={inputRef}
        onChange={onFileChange}
        multiple
      />

      <Grid
        container
        spacing={2}
        sx={{ direction: "row", alignItems: "center" }}
      >
        <Grid>
          <TextField
            disabled
            label={label}
            value={filename}
            error={isError}
            helperText={errorText}
          />
        </Grid>
        <Grid>
          <Button type="button" variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>

      {preview.length > 0 && (
        <Grid size={8} sx={{ maxWidth: "600px", overflow: "auto", marginBlock: 3 }}>
          <Box
            sx={{
              ml: 1,
              marginBlock: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              width: "100%",
              p: 1,
              textAlign: "center",
            }}
          >
            {preview.length > 0 && (
              <>
                {preview.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                ))}
              </>
            )}
          </Box>
        </Grid>
      )}
    </>
  );
};

export default FileInput;