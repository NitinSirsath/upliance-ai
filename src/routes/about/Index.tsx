import {
  Container,
  Typography,
  Box,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  LinkedIn,
  GitHub,
  Mail,
  Code,
  FitnessCenter,
  Gamepad,
} from "@mui/icons-material";

const AboutMe = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Nitin Sirsath
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Frontend Developer | ReactJS | TypeScript | MUI
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* About Section */}
        <Typography variant="h6" fontWeight="bold">
          About Me
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          2 years of experience in **ReactJS, TypeScript, Zustand, MUI**, and
          **Node.js**. Passionate about clean UI/UX, performance optimization,
          and access control implementations.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Technical Skills */}
        <Typography variant="h6" fontWeight="bold">
          Technical Skills
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          {[
            "ReactJS",
            "TypeScript",
            "React Native",
            "Node.js",
            "ExpressJS",
            "MUI",
            "Zustand",
          ].map((skill) => (
            <Chip
              key={skill}
              icon={<Code />}
              label={skill}
              variant="outlined"
            />
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Interests & Hobbies */}
        <Typography variant="h6" fontWeight="bold">
          Interests & Hobbies
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          <Chip
            icon={<FitnessCenter />}
            label="Gym & Fitness"
            variant="outlined"
          />
          <Chip
            icon={<Code />}
            label="Competitive Programming"
            variant="outlined"
          />
          <Chip icon={<Code />} label="Learning German" variant="outlined" />
          <Chip icon={<Gamepad />} label="Gaming" variant="outlined" />
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Contact Section */}
        <Typography variant="h6" fontWeight="bold">
          Connect With Me
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          <ContactLink
            href="mailto:nitinsirsath8855@gmail.com"
            icon={<Mail />}
            label="Email"
          />
          <ContactLink
            href="https://github.com/nitinsirsath"
            icon={<GitHub />}
            label="GitHub"
          />
          <ContactLink
            href="https://www.linkedin.com/in/nitin-s-254294119/"
            icon={<LinkedIn />}
            label="LinkedIn"
          />
        </Stack>
      </Box>
    </Container>
  );
};

const ContactLink = ({
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
