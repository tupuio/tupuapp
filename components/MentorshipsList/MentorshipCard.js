import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon, ExternalLinkIcon, EmailIcon } from '@chakra-ui/icons'
import { RelationshipStatusEnum } from "../../types/dbTablesEnums";
import PersonInfo from "./PersonInfo";
import MentorshipInfo from "../MentorshipsList/MentorshipInfo";


const MentorshipCard = ({ mentorship, handleCloseMentorship }) => {
  const { mentor, message, startDate: mentorshipDate, status, longterm } = mentorship;
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
          {
          !!mentor?.mentor?.calendly
          ?
          <Button 
            rightIcon={<ExternalLinkIcon />} colorScheme='greenButton' variant='solid'
            onClick={() => window.open(mentor?.mentor?.calendly)}
          >
            Book a Call
          </Button>
          :
          (mentor?.email &&
          <Button
          leftIcon={<EmailIcon />} colorScheme='greenButton' variant='solid'
          onClick={() => window.open('mailto:'+mentor?.email)}
          >
            Email
          </Button>)}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Close
            </MenuButton>
            <MenuList>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedCompleted)}
              >Completed</MenuItem>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedNoGoodFit)}
              >Not a good fit</MenuItem>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedBusy)}
              >I&apos;m busy</MenuItem>
              <MenuItem 
                onClick={() => handleCloseMentorship(mentorship, RelationshipStatusEnum.ClosedNotActive)}
              >Not active</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MentorshipCard;
