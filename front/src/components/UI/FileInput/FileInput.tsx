import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";

interface Props {
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({name, label, onChange}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [filename, setFilename] = useState('');
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFilename(file.name);

            if (file.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }
        } else {
            setFilename('');
            setPreview(null);
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
        />

        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid>
            <TextField disabled label={label} value={filename} />
          </Grid>
          <Grid>
            <Button type="button" variant="contained" onClick={activateInput}>
              Browse
            </Button>
          </Grid>
        </Grid>

        {preview && (
          <Grid size={8}>
            <Box
              sx={{
                mt: 1,
                border: "1px solid #ccc",
                borderRadius: "4px",
                p: 1,
                textAlign: "center",
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Box>
          </Grid>
        )}
      </>
    );
};

export default FileInput;