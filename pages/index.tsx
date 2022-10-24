import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, FormControlLabel, Switch, SwitchProps, ToggleButton, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { CheckCircle, CloseRounded } from '@mui/icons-material';
import { getUsers } from "../actions/userAction";
import { useMutation } from "@tanstack/react-query";

const Home: NextPage = () => {
  const [data, setData] = useState('No result');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [checked, setChecked] = React.useState(false);
  const [user, setUser] = React.useState<any>([]);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
    <Box sx={{ px: 2, py: 'auto' }}>
      <Head>
        <title>Ilham & Refni Wedding</title>
        <meta name="description" content="Ilham & Refni Wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Box>
            <Typography align={'center'} fontWeight={600} variant={"h6"}>
              Gojek
            </Typography>
          </Box>
          {getUsersRandom.isLoading ? <CircularProgress /> :
            (getUsersRandom.isSuccess || getUsersRandom.isError ?
              <Box>
                <Box sx={{ mb: 2 }}>
                  {getUsersRandom.isSuccess ? <CheckCircle color={'success'} fontSize={'large'} /> : <CloseRounded color={'error'} fontSize={'large'} />}
                </Box>
                <Box>
                  <Typography align={'center'} fontWeight={600} variant={"h6"}>
                    {user.length > 0 ? user[0]?.name.title + ' ' + user[0]?.name.first + ' ' + user[0]?.name.last : 'No Results'}
                  </Typography>
                </Box>
                <Box>
                  <Typography align={'center'} variant={"subtitle1"}>
                    {getUsersRandom.isSuccess ? 'Telah Hadir' : 'Gagal Mengubah Status Hadir, Silahkan Coba Lagi!'}
                  </Typography>
                </Box>
              </Box> : null)
          }
        </Box>
      </Box>
    </Box>
  )
}

export default Home
