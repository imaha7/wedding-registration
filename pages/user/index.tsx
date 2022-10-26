import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, Typography, styled, useMediaQuery, useTheme, Container, Grid, Avatar, Button, IconButton, Stack, FormControl, Input, OutlinedInput, ListItemButton } from '@mui/material';
import { LocationOnOutlined, SearchOutlined } from '@mui/icons-material';
import { getUsers } from "../../actions/userAction";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/router';
import PerfectScrollbar from "react-perfect-scrollbar";

const User: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [user, setUser] = useState<any>([]);

  const getUsersRandom = useMutation(() => getUsers(), {
    onMutate: () => {
      return {};
    },
    onSuccess: (response: any) => {
      setUser(response.results);
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

  useEffect(() => { }, []);

  return (
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', p: 3 }}>
      <Head>
        <title>List Users</title>
        <meta name="description" content="List Users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ mb: 0 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant={"h6"} sx={{ color: 'white' }}>
            Registered Users
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <PerfectScrollbar>
            {['John Doe 1', 'John Doe 2', 'John Doe 3', 'John Doe 4', 'John Doe 5', 'John Doe 6'].map((item: any, index: number) => (
              <ListItemButton key={index} sx={{ backgroundColor: '#424242', borderRadius: '10px', px: 2, py: 1, mb: 3 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ mb: 1 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                      <Box>
                        <Typography variant={"subtitle1"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                          {item}
                        </Typography>
                      </Box>
                      <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '5px', textAlign: 'center', px: 2 }}>
                        <Typography variant={"caption"} align={'center'} sx={{ color: 'white' }}>
                          Will Attend
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant={"body2"} sx={{ color: 'white', wordBreak: 'break-word' }}>
                      Family / Friends / Partner / Invited Guest Count : 2
                    </Typography>
                  </Box>
                </Box>
              </ListItemButton>

            ))}
          </PerfectScrollbar>
        </Box>
        <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#2b2b2b' }}>
          <Box sx={{ py: 1 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
              <Box sx={{ width: '100%' }}>
                <FormControl variant="outlined" size='small' fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder={"e.g : John Doe"}
                    // value={name}
                    // onChange={handleChangeName}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    sx={{ backgroundColor: '#424242', borderRadius: '10px', color: 'white' }}
                  />
                  {/* <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText> */}
                </FormControl>
              </Box>
              <Box sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main, borderRadius: '10px' }}>
                <IconButton color="primary" size={'small'} aria-label="location" component="label">
                  <SearchOutlined sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            </Stack>
          </Box>
          <footer>
            <Box sx={{ pb: 2 }}>
              <Typography align={'center'} variant={"body1"} sx={{ color: 'white' }}>
                © {new Date().getFullYear()} by: @imaha7
              </Typography>
            </Box>
          </footer>
        </Box>
      </Box>
    </Container>
  )
}

export default User
