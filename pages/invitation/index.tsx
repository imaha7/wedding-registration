import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery, useTheme, Container, Grid, Button, IconButton, Skeleton } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import { showUser } from "../../actions/userAction";
import { useQuery } from "@tanstack/react-query";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router';
import { toPng } from 'html-to-image';
import Image from 'next/image';

const Invitation: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [user, setUser] = useState<any>([]);
  const ref = useRef<HTMLDivElement>(null);

  const downloadPng = useCallback(() => {
    if (ref.current === null) {
      return
    }
    toPng(ref.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${('Invitation-Wedding.png')}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
  }, [ref]);

  const showUserRegistration = useQuery(['showUser', router.query.id], () => showUser({ id: router.query.id }), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      if (response.data) {
        setUser(response.data);
        console.log("Data : ", user);
      } else {
        setUser([]);
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => { showUserRegistration }, [user]);

  return (
    <Container maxWidth="sm" sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#2b2b2b', px: 0 }}>
      <Head>
        <title>Invitation Wedding</title>
        <meta name="description" content="Invitation Wedding" />
        <link rel="icon" href="/bg-wedding.webp" />
        <link href="https://fonts.cdnfonts.com/css/gotham-rounded" rel="stylesheet" />
      </Head>
      <Box ref={ref} sx={{ mb: 3 }}>
        <Box sx={{ minHeight: '350px', backgroundColor: '#eeebee', backgroundImage: `url(${"/bg-wedding.webp"})`, backgroundRepeat: "no-repeat", backgroundPosition: 'center', backgroundSize: 'contain' }}>
          <Box sx={{ minHeight: '350px', background: 'rgba(0, 0, 0, 0.6)', py: 2, px: 2 }}>
            <Box sx={{ mb: 0 }}>
              {showUserRegistration.isFetching ?
                <Skeleton variant="rounded" width={'100%'} height={40} sx={{ borderRadius: '10px' }} /> :
                <Typography variant={"h4"} sx={{ color: 'white' }}>
                  Hello, {user.name}!
                </Typography>
              }
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant={"subtitle1"} sx={{ color: 'white' }}>
                You’re Invited to Our Wedding!
              </Typography>
            </Box>
            <Box sx={{ mb: 4, mt: 3 }}>
              <Grid container justifyContent={'center'} alignItems={'center'} spacing={4}>
                <Grid container justifyContent={'flex-end'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Image
                    width={!isMobile ? 100 : 156}
                    height={!isMobile ? 100 : 156}
                    src={"/ilham.png"}
                    alt={"ilham"}
                    priority
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid container justifyContent={'flex-start'} item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Image
                    width={!isMobile ? 100 : 156}
                    height={!isMobile ? 100 : 156}
                    src={"/refni.png"}
                    alt={"refni"}
                    priority
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography align={'center'} variant={"h4"} sx={{ fontFamily: 'Great Vibes', color: 'white' }}>
                Ilham & Refni
              </Typography>
            </Box>
            <Box>
              <Typography align={'center'} variant={"subtitle1"} sx={{ color: 'white' }}>
                Mesjid Taqwa Muhammadiyah Islamic Center
              </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Typography align={'center'} variant={"subtitle1"} sx={{ color: 'white' }}>
                2 April 2023, 8.00 AM - 17.30 PM
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#2b2b2b', borderRadius: '30px', py: 2, px: 3, mt: -4 }}>
          <Box sx={{ mb: 1 }}>
            {showUserRegistration.isFetching ?
              <Skeleton variant="rounded" width={'100%'} height={40} sx={{ borderRadius: '10px' }} /> :
              <Typography variant={"h5"} sx={{ color: 'white' }}>
                {user.name}
              </Typography>
            }
          </Box>
          <Box sx={{ mb: 3 }}>
            {showUserRegistration.isFetching ?
              <Skeleton variant="rounded" width={'100%'} height={40} sx={{ borderRadius: '10px' }} /> :
              <Typography variant={"body1"} sx={{ color: 'white' }}>
                Family / Friends / Partner / Invited Guest Count : {user.invited_guests_count}
              </Typography>
            }
          </Box>
          <Box sx={{ backgroundColor: 'white', borderRadius: '15px', p: 2, mb: 4 }}>
            {showUserRegistration.isFetching ?
              <Skeleton variant="rounded" width={'100%'} height={160} sx={{ borderRadius: '10px' }} /> :
              <QRCode
                id={'qr-code'}
                size={48}
                style={{ height: "auto", width: "100%", textAlign: 'center', }}
                value={user}
                viewBox={`0 0 48 48`}
              />
            }
          </Box>
          <Box>
            <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={2}>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Button fullWidth variant="contained" onClick={downloadPng} sx={{ borderRadius: '10px', textTransform: 'none', color: 'white' }}>Download</Button>
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
