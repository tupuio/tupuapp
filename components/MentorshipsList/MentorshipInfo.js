import { Stack, VStack, Text, StackDivider } from "@chakra-ui/layout";
import { RequestStatusEnum, RelationshipStatusEnum } from "../../types/dbTablesEnums";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

const markdownTheme = {
  p: (props) => {
    const { children } = props;
    return <Text>{children}</Text>;
  },
};

const MentorshipInfo = ({ mentorship }) => {
  const { message, mentorshipDate, status, longterm } = mentorship;
  let dateLabel = "";
  if (status === RelationshipStatusEnum.Started) {
    dateLabel = "Started on";
  } else if (status === RequestStatusEnum.Pending) {
    dateLabel = "Requested on";
  }
  return (
    <>
      <Stack
        direction={"column"}
        textAlign={"left"}
        justifyContent={"center"}
        width='100%'
      >
      
      <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
      >
        { (dateLabel && mentorshipDate) && 
          <Text>{dateLabel}: {mentorshipDate}</Text>
        }
        <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} skipHtml>
          {message}
        </ReactMarkdown>
        <Text as='b'>
          {longterm?"Long":"Short"} term mentorship
        </Text>
      </VStack>

      </Stack>
    </>
  );
}

export default MentorshipInfo;