import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import GithubCard from "./GithubCard";

function GithubSearch() {
  const [isloading, setisloading] = useState(false);
  const [data, setdata] = useState({});
  const [username, setusername] = useState("");

  const fetchData = async () => {
    setisloading(true);
    try {
      let response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      console.log(response.data);
      setdata(response.data);
    } catch (e) {
      console.log("Error Fetching Data"), e;
      setdata({});
    } finally {
      setisloading(false);
    }
  };

  return (
    <>
      <Container sx={{marginTop: 8}}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h1" textAlign={"center"}>
            Github Profile Finder
          </Typography>
          <Box marginTop={2} display={"flex"} alignItems={"center"} gap={2}>
            <TextField
              fullWidth
              label="search here..."
              value={username}
              onChange={(elem) => setusername(elem.target.value)}
            ></TextField>
            <Button onClick={fetchData} variant="contained">
              Search
            </Button>
          </Box>

          <Box marginTop={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {
                isloading ? 
                (<CircularProgress/>) :
                 data.id ? 
                (<GithubCard data={data}/>) :
                (<Typography variant="h3">Search Not Found</Typography>)
            }
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default GithubSearch;
