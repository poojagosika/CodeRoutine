import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Avatar,
  CardActionArea,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
  Paper,
  Stack,
  Pagination,
  colors,
} from "@mui/material";
import Box from "@mui/material/Box";
import Trophy from "../../assets/Contest/trophy.png";
import BlueImage from "../../assets/Contest/blueImage.png";
import GreenImage from "../../assets/Contest/greenImage.png";
import WeeklyContest291 from "../../assets/Contest/FeaturedContest/WeeklyContest291.png";
import BiweeklyContest from "../../assets/Contest/FeaturedContest/biweekly-contest.jpg";
import Contest200 from "../../assets/Contest/FeaturedContest/contest.jpg";
import ImageIcon from "@mui/icons-material/Image";
import { data } from "./Config.js";
import { leader } from "./LeaderBoard.js";
import {
  avataaars,
  micah,
  bottts,
  adventurer,
  identicon,
  initials,
} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const getCuteAvatar = (author) => {
  const styles = [avataaars, micah, bottts, adventurer, identicon, initials];
  const style = styles[author.length % styles.length];
  const avatar = createAvatar(style, {
    seed: author,
    size: 128,
  });
  return avatar.toDataUri();
};

export default function Contest() {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: "#1a1a1a",
        color: "white",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          color: "white",
          background: "rgb(74,74,74)",
          backgroundColor:
            "radial-gradient(circle, rgba(74,74,74,1) 0%, rgba(5,5,5,1) 100%)",
          height: "65vh",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          alt="Trophy"
          src={Trophy}
          sx={{ width: 250, height: 250 }}
          variant="square"
        />
        <Typography sx={{ fontSize: 32 }}>CodeRoutine Contest</Typography>
        <Typography sx={{ fontSize: 18, mt: 1, color: "#bdbdbd" }}>
          Contest every week. Compete and see your ranking.
        </Typography>
      </Box>
      <Grid
        gap={5}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "-80px",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 345, borderRadius: "10px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              width={200}
              image={BlueImage}
              alt="Weekly Contest 403"
            />
            <CardContent style={{ backgroundColor: "#282828", color: "white" }}>
              <Typography gutterBottom variant="h6">
                Weekly Contest 403
              </Typography>
              <Typography variant="body2" color="#eff1f6bf">
                Sunday 8:00 AM IST
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 345, borderRadius: "10px" }}>
          <CardActionArea style={{ width: "400px" }}>
            <CardMedia
              component="img"
              height="180"
              image={GreenImage}
              alt="Weekly Contest 403"
            />
            <CardContent style={{ backgroundColor: "#282828", color: "white" }}>
              <Typography gutterBottom variant="h6">
                Weekly Contest 403
              </Typography>
              <Typography variant="body2" color="#eff1f6bf">
                Sunday 8:00 AM IST
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid style={{ margin: "50px 200px" }}>
        <Typography variant="h5" mb={2}>
          Featured Contests
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "70px",
            flexWrap: "wrap",
            color: "white",
          }}
        >
          <Grid sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="180"
              image={WeeklyContest291}
              alt="Weekly Contest 403"
              style={{ borderRadius: "10px" }}
            />
            <Typography style={{ color: "white", marginTop: "10px" }}>
              <Typography gutterBottom variant="h6">
                Weekly Contest 403
              </Typography>
              <Typography variant="body2" color="#eff1f6bf">
                Sunday 8:00 AM IST
              </Typography>
            </Typography>
          </Grid>
          <Grid sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="180"
              image={BiweeklyContest}
              alt="Weekly Contest 403"
              style={{ borderRadius: "10px" }}
            />
            <Typography style={{ color: "white", marginTop: "10px" }}>
              <Typography gutterBottom variant="h6">
                Weekly Contest 403
              </Typography>
              <Typography variant="body2" color="#eff1f6bf">
                Sunday 8:00 AM IST
              </Typography>
            </Typography>
          </Grid>
          <Grid sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="180"
              image={Contest200}
              alt="Weekly Contest 403"
              style={{ borderRadius: "10px" }}
            />
            <Typography style={{ color: "white", marginTop: "10px" }}>
              <Typography gutterBottom variant="h6">
                Weekly Contest 403
              </Typography>
              <Typography variant="body2" color="#eff1f6bf">
                Sunday 8:00 AM IST
              </Typography>
            </Typography>
          </Grid>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TableContainer
            component={Paper}
            style={{
              maxWidth: 700,
              backgroundColor: "#282828",
              borderRadius: "10px",
            }}
          >
            <Table aria-label="contest table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button variant="contained" size="small">
                      Past Contests
                    </Button>
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <Button variant="outlined" size="small">
                      My Contests
                    </Button>
                  </TableCell>
                  <TableCell style={{ color: "white" }} align="right">
                    What's a Virtual Contest?
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((contest) => (
                  <TableRow key={contest.id} style={{ borderBottom: "none" }}>
                    <TableCell>
                      <img
                        src={contest.img}
                        alt={contest.name}
                        width={100}
                        height={60}
                        style={{ borderRadius: "5%" }}
                      />
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      {contest.name}
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="secondary">
                        {contest.button}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack spacing={2} align="right" m={2}>
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                justifyContent="flex-end"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    backgroundColor: "#262626bf",
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#919191ab",
                  },
                }}
              />
            </Stack>
          </TableContainer>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              backgroundColor: "#282828",
              borderRadius: "10px",
            }}
          >
            <Typography mx={2}>Global Ranking</Typography>
            {leader.map((data) => (
              <ListItem style={{ marginTop: "24px" }}>
                <Typography mx={3}>
                  <i>{data.id}</i>
                </Typography>
                <ListItemAvatar>
                  <Avatar src={getCuteAvatar(data.name)} />
                </ListItemAvatar>
                <Grid>
                  <Typography>{data.name}</Typography>
                  <Typography
                    sx={{ display: "flex", color: "#eff2f699" }}
                    gap={2}
                  >
                    <Typography>
                      Rating:{" "}
                      <span style={{ color: "white" }}>{data.Rating}</span>
                    </Typography>
                    <Typography>
                      Attended:{" "}
                      <span style={{ color: "white" }}>{data.Attended}</span>
                    </Typography>
                  </Typography>
                </Grid>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
