import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { SimpleGrid, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useSWR from "swr";
import MenteeCard from "./MenteeCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MenteesList = () => {
  const { data, error } = useSWR("/api/mentees", fetcher);
  const [query, setQuery] = useState("");
  // const [requestedMentor, setRequestedMentor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (ev) => {
    setQuery(ev.target.value);
  };

  const handleRequestMentee = (mentee) => {
    setRequestedMentee(mentee);
    onOpen();
  };

  if (error) {
    return <div>failed to load</div>;
  }

  if (!data) {
    return <div>Loading..</div>;
  }

  let filtered = data.records;
  if (query !== "") {
    filtered = data.records.filter((mentee) => {
      const lowerQuery = query.toLowerCase();
      return (
        mentee.name.toLowerCase().includes(lowerQuery) ||
        mentee.title?.toLowerCase().includes(lowerQuery) ||
        mentee.biography?.toLowerCase().includes(lowerQuery)
      );
    });
  }
  if (!filtered) {
    filtered = [];
  }

  return (
    <>
      <Stack spacing={4}>
        <InputGroup maxWidth="540px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} />
          </InputLeftElement>
          <Input
            background="white"
            placeholder="Search"
            onChange={handleSearch}
          />
        </InputGroup>
        <SimpleGrid minChildWidth="540px" spacing="24px">
          {filtered.map((mentee) => (
            <MenteeCard
              key={mentee.id}
              mentee={mentee}
              handleRequest={handleRequestMentee}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default MenteesList;
