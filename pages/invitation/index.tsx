import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Box, Typography, styled, useMediaQuery, useTheme, Container, Grid, Avatar, Button, IconButton } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import { getUsers } from "../../actions/userAction";
import { useMutation } from "@tanstack/react-query";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router';

const Invitation: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [user, setUser] = useState<any>([]);
  const [tab, setTab] = useState('register');

  const downloadQRCode = () => {
    // const canvas: any = document.getElementById("qr-code");
    // if (canvas) {
    //   const pngUrl = canvas
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");
    //   let downloadLink = document.createElement("a");
    //   downloadLink.href = pngUrl
    //   downloadLink.download = `qr-code-wedding.png`;
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    // }
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
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', px: 0 }}>
      <Head>
        <title>Invitation Wedding</title>
        <meta name="description" content="Invitation Wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ minHeight: '350px', backgroundImage: `url(${"/background.jpg"})`, backgroundRepeat: "no-repeat", py: 2, px: 2 }}>
          <Box sx={{ mb: 0 }}>
            <Typography variant={"h4"} sx={{ color: 'white' }}>
              Hello, John Doe!
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant={"subtitle1"} sx={{ color: 'white' }}>
              You’re Invited to Our Wedding!
            </Typography>
          </Box>
          <Box sx={{ mb: 2, mt: 3 }}>
            <Grid container justifyContent={'center'} alignItems={'center'} spacing={4}>
              <Grid container justifyContent={'flex-end'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Avatar alt={'picture 1'} src={"https://xsgames.co/randomusers/avatar.php?g=male"} variant={"rounded"} sx={{ width: !isMobile ? 128 : 156, height: !isMobile ? 128 : 156, borderRadius: '10px' }} />
              </Grid>
              <Grid container justifyContent={'flex-start'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Avatar alt={'picture 3'} src={"https://xsgames.co/randomusers/avatar.php?g=male"} variant={"rounded"} sx={{ width: !isMobile ? 128 : 156, height: !isMobile ? 128 : 156, borderRadius: '10px' }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#2b2b2b', borderRadius: '30px', py: 2, px: 3, mt: -4 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant={"h5"} sx={{ color: 'white' }}>
              John Doe
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant={"body1"} sx={{ color: 'white' }}>
              Family / Friends / Partner / Invited Guest Count : 2
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: 'white', borderRadius: '15px', p: 2, mb: 4 }}>
            <QRCode
              id={'qr-code'}
              size={48}
              style={{ height: "auto", width: "100%", textAlign: 'center', }}
              value={'1'}
              viewBox={`0 0 48 48`}
            />
          </Box>
          <Box>
            <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={2}>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Button fullWidth variant="contained" onClick={downloadQRCode} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>Download</Button>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Box sx={{ width: '100%', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px' }}>
                  <IconButton color="primary" size={'small'} aria-label="location" component="label" onClick={() => { router.replace('https://goo.gl/maps/PcFhjJFBH9sHGAC49') }} sx={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    <LocationOnOutlined />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <footer>
        <Box sx={{ pb: 2 }}>
          <Typography align={'center'} variant={"body1"} sx={{ color: 'white' }}>
            © {new Date().getFullYear()} by: @imaha7
          </Typography>
        </Box>
      </footer>
    </Container>

  )
}

export default Invitation
