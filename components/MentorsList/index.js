import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { SimpleGrid, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useSWR from "swr";
import MentorCard from "./MentorCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MentorsList = () => {
  const { data, error } = useSWR("/api/mentors", fetcher);
  const [query, setQuery] = useState("");

  const handleSearch = (ev) => {
    setQuery(ev.target.value);
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
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default MentorsList;
