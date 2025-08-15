import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Menu,
  MenuItem,
  Box,


} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import ScanCard from "../../../components/Card";
import Grid from '@mui/material/Grid';




interface FormDataType {
  firstName: string;
  lastName: string;
  idNumber: string;
  dob: string;
  idImage: File | null;
}
interface ScanData {
    id: number; 
  firstName: string;
  lastName: string;
  idNumber: string;
  dob: string;
}

const IDScanForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm<FormDataType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      idNumber: "",
      dob: "",
     
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const selectedImage = watch("idImage");

  const [previewUrl, setPreviewUrl] = useState<string>("");
 const [scanData, setScanData] = useState<ScanData[]>([]);

  useEffect(() => {
    // fetch('http://localhost:3000/id-scan') 
     fetch('https://scanappbackend.onrender.com/id-scan')
      .then((res) => res.json())
      .then((data) => setScanData(data))
      .catch((err) => console.error(err));
  }, []);


console.log(scanData)

  // Create and clean up preview URL when idImage changes
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);

    // Clean up the URL object when component unmounts or selectedImage changes
    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setLoading(true);

    try {
      // Mock API call
      await new Promise((res) => setTimeout(res, 1000));

      // Mock data from API
      const data = {
        firstName: "John",
        lastName: "Doe",
        idNumber: "123456789",
        dob: "1990-01-01",
      };

      setValue("firstName", data.firstName);
      setValue("lastName", data.lastName);
      setValue("idNumber", data.idNumber);
      setValue("dob", data.dob);
      setValue("idImage", file);
    } catch (error) {
      console.error("Error scanning ID:", error);
    }

    setLoading(false);
  };

const onSubmit = async (data: FormDataType) => {
 
  const { firstName, lastName, idNumber, dob } = data;

  try {
    const response = await
     fetch('https://scanappbackend.onrender.com/id-scan'
    //  fetch('http://localhost:3000/id-scan'
      , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, idNumber, dob }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const responseData = await response.json();
    console.log('Server response:', responseData);
    alert('Data submitted successfully!');
  } catch (error) {
    console.error(error);
    alert('Error submitting data');
  }
};

//delete scanId
  const handleDelete = async (id: number) => {
    try {
      await 
      // fetch(`http://localhost:3000/id-scan/${id}`
          fetch(`https://scanappbackend.onrender.com/id-scan/${id}`
        , {
        method: 'DELETE',
      });
      setScanData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      <Typography variant="h5">ID Capture Form</Typography>

      {/* Button to open menu */}
      <Button variant="contained" onClick={handleMenuOpen} disabled={loading}>
        {loading ? "Processing..." : "Scan ID"}
      </Button>

      {/* Menu options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
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

      {/* Controlled text fields */}
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <TextField label="First Name" {...field} />}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => <TextField label="Last Name" {...field} />}
      />
      <Controller
        name="idNumber"
        control={control}
        render={({ field }) => <TextField label="ID Number" {...field} />}
      />
      <Controller
        name="dob"
        control={control}
        render={({ field }) => <TextField label="Date of Birth" {...field} />}
      />

      {/* Image preview */}
      {previewUrl && (
        <Box
          component="img"
          src={previewUrl}
          alt="Selected ID"
          sx={{ width: 200, height: "auto", mt: 2, borderRadius: 1, boxShadow: 1 }}
        />
      )}

      {/* Submit button */}
      <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {scanData.map((scan) => (
          <Grid key={scan.id}  >
            <ScanCard data={scan} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
     
    </Container>
  );
};

export default IDScanForm;
