import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { SimpleGrid, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useSWR from "swr";
import RequestModal from "../RequestModal";
import MentorCard from "./MentorCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MentorsList = () => {
  const { data, error } = useSWR("/api/mentors", fetcher);
  const [query, setQuery] = useState("");
  const [requestedMentor, setRequestedMentor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (ev) => {
    setQuery(ev.target.value);
  };

  const handleRequestMentor = (mentor) => {
    setRequestedMentor(mentor);
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
    filtered = data.records.filter((mentor) => {
      const lowerQuery = query.toLowerCase();
      return (
        mentor.name.toLowerCase().includes(lowerQuery) ||
        mentor.title?.toLowerCase().includes(lowerQuery) ||
        mentor.biography?.toLowerCase().includes(lowerQuery)
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
          {filtered.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              handleRequest={handleRequestMentor}
            />
          ))}
        </SimpleGrid>
      </Stack>
      <RequestModal
        mentor={requestedMentor}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default MentorsList;
