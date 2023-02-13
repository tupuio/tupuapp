import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { RequestStatusEnum } from "../../types/dbTablesEnums";
import PersonInfo from "../MentorshipsList/PersonInfo";
import MentorshipInfo from "../MentorshipsList/MentorshipInfo";


const RequestCard = ({ request, handleContact, handleAccept, handleReject }) => {
  const { mentee, message, creationDate: mentorshipDate, status, longterm } = request;
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
          <Button
            colorScheme={"greenButton"}
            onClick={() => handleAccept(request)}
          >Accept</Button>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Reject
            </MenuButton>
            <MenuList>
              <MenuItem 
                onClick={() => handleReject(request, RequestStatusEnum.RejectedNoGoodFit)}
              >Not a good fit</MenuItem>
              <MenuItem 
                onClick={() => handleReject(request, RequestStatusEnum.RejectedBusy)}
              >I&apos;m busy</MenuItem>
              <MenuItem 
                onClick={() => handleReject(request, RequestStatusEnum.Rejected)}
              >Prefer not to say</MenuItem>
            </MenuList>
          </Menu>
          <Button
            onClick={() => handleContact(request)}
            colorScheme={"blueButton"}
          >Contact</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RequestCard;
