import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { useState } from "react";

interface FileuploadProps {
  onFileLoaded?: (data: any) => void;
}

export default function Fileupload({ onFileLoaded }: FileuploadProps) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          Import from File
        </Button>

        {file && <Box sx={{ marginTop: 1 }}>Selected file: {file.name}</Box>}

        <input
          id="fileInput"
          type="file"
          style={{ display: "none" }}
          accept="application/json"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
              const reader = new FileReader();
              reader.onload = (event) => {
                const json = event.target?.result;
                if (typeof json === "string") {
                  const data = JSON.parse(json);
                  if (data && onFileLoaded) {
                    onFileLoaded(data);
                  }
                }
              };
              reader.readAsText(e.target.files[0]);
            }
          }}
        />
      </Box>
    </>
  );
}
