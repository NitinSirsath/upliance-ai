import {
  Container,
  Typography,
  Box,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  LinkedIn,
  GitHub,
  Mail,
  Code,
  FitnessCenter,
  Gamepad,
} from "@mui/icons-material";

const AboutMe = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: isDarkMode ? "grey.900" : "grey.100",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Nitin Sirsath
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Frontend Developer
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="left">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1">
            I have 2 years of experience building responsive and modern web
            applications using ReactJS, React Native, NodeJS TypeScript,
            Zustand, and MUI. I focus on creating clean designs and implementing
            features like state management and access control. I'm eager to
            contribute and grow as part of your team.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="left">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Technical Skills
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            gap={1}
            flexWrap="wrap"
            justifyContent="center"
          >
            <ChipWithIcon icon={<Code />} label="ReactJS / TypeScript" />
            <ChipWithIcon icon={<Code />} label="React Native" />
            <ChipWithIcon icon={<Code />} label="NodeJS / ExpressJs" />
            <ChipWithIcon icon={<Code />} label="Zustand / MUI" />
            <ChipWithIcon icon={<Code />} label="Github/Git" />
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box textAlign="left">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Interests & Hobbies
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
            gap={1}
          >
            <ChipWithIcon icon={<FitnessCenter />} label="Gym & Fitness" />
            <ChipWithIcon icon={<Code />} label="Competitive Programming" />
            <ChipWithIcon icon={<Code />} label="Learning German" />
            <ChipWithIcon icon={<Code />} label="DC Comics Fan" />
            <ChipWithIcon icon={<Gamepad />} label="Gaming" />
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Connect With Me
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <ContactIcon
              href="mailto:nitinsirsath8855@gmail.com"
              icon={<Mail />}
              label="Email"
            />
            <ContactIcon
              href="https://nitinsirsath.netlify.app/"
              icon={<GitHub />}
              label="Portfolio"
            />
            <ContactIcon
              href="https://www.linkedin.com/in/nitin-s-254294119/"
              icon={<LinkedIn />}
              label="LinkedIn"
            />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

const ChipWithIcon = ({
  icon,
  label,
}: {
  icon: JSX.Element;
  label: string;
}) => (
  <Box
    display="flex"
    alignItems="center"
    gap={1}
    sx={{ p: 1, border: "1px solid grey", borderRadius: "8px" }}
  >
    {icon}
    <Typography variant="body2">{label}</Typography>
  </Box>
);

const ContactIcon = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
}) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
    }}
  >
    {icon}
    <Typography variant="body2" sx={{ ml: 1 }}>
      {label}
    </Typography>
  </Box>
);

export default AboutMe;
