import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { useState } from "react";

interface FileuploadProps {
  onFileLoaded?: (data: any) => void;
}

export default function Fileupload({ onFileLoaded }: FileuploadProps) {
  const [showFileInput, setShowFileInput] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Button variant="contained" onClick={() => setShowFileInput(true)}>
        Import
      </Button>
      <Box>
        <input
          type="file"
          style={{ display: showFileInput ? "block" : "none" }}
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
                    console.log(data);
                    onFileLoaded(data);
                    setShowFileInput(false);
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
