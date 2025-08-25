import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import TextFieldsGroup from "./TextFieldsGroup";
import ImagePreview from "./ImagePreview";
import type {  FormDataType, ScanData } from "./../../../../types";
import ScanCard from "../../../../components/Card";
import { idScanSchema } from "./validationSchema";





const IDScanForm = () => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<FormDataType>({
    resolver: yupResolver(idScanSchema),
    defaultValues: { firstName: "", lastName: "", idNumber: "", dob: "",  idImage: null,},
  });

  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selectedImage = watch("idImage");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [scanData, setScanData] = useState<ScanData[]>([]);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/id-scan");
      const data: ScanData[] = await res.json();
      setScanData(data);
    } catch (err) {
      console.error("Error fetching IDs:", err);
    }
  };

  useEffect(() => { getData(); }, []);

  // Handle preview
  useEffect(() => {
    if (!selectedImage) return setPreviewUrl("");
    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      const mockData: Omit<FormDataType, "idImage"> = {
        firstName: "John",
        lastName: "Doe",
        idNumber: "123456789",
        dob: "1990-01-01",
      };
      Object.entries(mockData).forEach(([key, value]) =>
        setValue(key as keyof FormDataType, value as any)
      );
      setValue("idImage", file);
    } catch (err) {
      console.error("Error scanning ID:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    const { firstName, lastName, idNumber, dob } = data;
    try {
      const res = await fetch("http://localhost:3000/id-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, idNumber, dob }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      await res.json();
      alert("Data submitted!");
      reset();
      getData();
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/id-scan/${id}`, { method: "DELETE" });
      setScanData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      <Typography variant="h5">ID Capture Form</Typography>

      {/* Scan ID Menu */}
      <Button variant="contained" onClick={handleMenuOpen} disabled={loading}>
        {loading ? "Processing..." : "Scan ID"}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem>
          <label style={{ cursor: "pointer", width: "100%" }}>
            Take Photo
            <input
              hidden
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                handleFile(e.target.files?.[0]);
                handleMenuClose();
              }}
            />
          </label>
        </MenuItem>
        <MenuItem>
          <label style={{ cursor: "pointer", width: "100%" }}>
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFile(e.target.files?.[0]);
                handleMenuClose();
              }}
            />
          </label>
        </MenuItem>
      </Menu>

      {/* Text Fields */}
      <TextFieldsGroup control={control} />

      {/* Image Preview */}
      <ImagePreview url={previewUrl} />

      {/* Submit */}
      <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>

      {/* Saved Records */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {scanData.map((scan) => (
            <Grid key={scan.id}>
              <ScanCard data={scan} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default IDScanForm;
