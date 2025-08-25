import React from "react";
import { Box } from "@mui/material";

interface Props {
  url: string;
}

const ImagePreview: React.FC<Props> = ({ url }) =>
  url ? (
    <Box component="img" src={url} alt="Selected ID"
      sx={{ width: 200, height: "auto", mt: 2, borderRadius: 1, boxShadow: 1 }} />
  ) : null;

export default ImagePreview;
