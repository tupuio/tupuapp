import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { RelationshipStatusEnum } from "../../types/dbTablesEnums";
import PersonInfo from "../MentorshipsList/PersonInfo";
import MentorshipInfo from "../MentorshipsList/MentorshipInfo";

const MenteeCard = ({ mentorship, handleCloseMentorship }) => {
  const { mentee, message, startDate: mentorshipDate, status, longterm } = mentorship;
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
        <PersonInfo person={mentee} />
        <MentorshipInfo mentorship={{ message, mentorshipDate, status, longterm }} />
        <Stack
          direction={"column"}
          textAlign={"right"}
          justifyContent={"center"}
        >
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
              >Not available</MenuItem>
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

export default MenteeCard;
