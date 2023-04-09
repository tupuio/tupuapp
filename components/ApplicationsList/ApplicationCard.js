import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import PersonInfo from "../MentorshipsList/PersonInfo";
import MentorshipInfo from "../MentorshipsList/MentorshipInfo";


const ApplicationCard = ({ application, handleCancel }) => {
  const { mentor, message, creationDate: mentorshipDate, status, longterm } = application;
  
  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w="100%"
      direction={{ base: "column", md: "row" }}
      bg={"white"}
      boxShadow={"2xl"}
      padding={4}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={{ base: 4, lg: 20 }}
        width='100%'
      >
        <PersonInfo person={mentor} />
        <MentorshipInfo mentorship={{ message, mentorshipDate, status, longterm }} />
        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
          <Button
            onClick={() => handleCancel(application)} 
            colorScheme={"grayButton"}
          >Cancel application</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ApplicationCard;
