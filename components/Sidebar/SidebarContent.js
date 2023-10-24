import { CloseButton } from "@chakra-ui/close-button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Link, Divider } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  FiHome,
  FiInbox,
  FiSearch,
  FiSettings,
  FiSliders,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import useSWR from "swr";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import { doesUserHaveRole } from "../../utils/session";
import { MENTOR_ROLE, MENTEE_ROLE } from "../../constants";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SidebarContent = ({ onClose, mode, ...rest }) => {
  const { data: requestsData } = useSWR("/api/requestsCount", fetcher);
  const { data: menteesData } = useSWR("/api/menteesCount", fetcher);
  const { data: mentorshipsData } = useSWR("/api/mentorshipsCount", fetcher);
  const { data: applicationsData } = useSWR("/api/applicationsCount", fetcher);
  const { data: profileData } = useSWR('/api/profile', fetcher)
  const mentorshipsCount = mentorshipsData?.count || 0;
  const requestsCount = requestsData?.count || 0;
  const applicationsCount = applicationsData?.count || 0;
  const menteesCount = menteesData?.count || 0;
  const { data: session } = useSession()

  const GeneralLinkItems = [
    { name: "Your profile", icon: FiUser, href: "/profile" },
  ]

  const MentorLinkItems = [
    {
      name: "Requests",
      icon: FiInbox,
      href: "/requests",
      tag: () => requestsCount,
    },
    { name: "Mentees", icon: FiUsers, href: "/mentees", tag: () => menteesCount },
  ];

  const MenteeLinkItems = [
    { name: "Find a mentor", icon: FiSearch, href: "/mentors" },
    { name: "Preferences", icon: FiSliders, href: "/preferences" },
    { name: "Applications", icon: FiInbox, href: "/applications", tag: () => applicationsCount, },
    { name: "Mentorships", icon: FiUsers, href: "/mentorships", tag: () => mentorshipsCount, },
  ];

  const UnPublishedLinkItems = [
    { name: "Your profile", icon: FiUser, href: "/profile" },
  ]

  let links = UnPublishedLinkItems

  if (profileData?.published) {
    links = mode === "mentor" ? MentorLinkItems : MenteeLinkItems;
  }


  // TODO: handle admins
  const shouldRenderMentorLinks = profileData?.published && doesUserHaveRole(session, MENTOR_ROLE)

  const shouldRenderMenteeLinks = profileData?.published && doesUserHaveRole(session, MENTEE_ROLE)

  return (
    <Box
      transition="3s ease"
      bg={mode === "mentor" ? "brand.green" : "brand.blue"}
      borderRight="1px"
      borderRightColor="gray.400"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
        <Text textColor="white" fontSize="4xl" fontWeight="bold">
          tupu
        </Text>
        <CloseButton
          color="white"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>
      <Box mt={50}>
        {GeneralLinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            href={link.href}
            bg={mode === "mentor" ? "brand.blue" : "brand.green"}
          >
            {link.name}
            {link.tag && link.tag() > 0 && (
              <Tag size="sm" colorScheme="teal" ml={2}>
                {link.tag()}
              </Tag>
            )}
          </NavItem>
        ))}
      </Box>
      {shouldRenderMentorLinks &&
        <>
          <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
            <Text textColor="white" fontSize="xl" fontWeight="normal">
              Mentor
            </Text>
          </Flex>
          <Box>
            {MentorLinkItems.map((link) => (
              <NavItem
                key={link.name}
                icon={link.icon}
                href={link.href}
                bg={mode === "mentor" ? "brand.blue" : "brand.green"}
              >
                {link.name}
                {link.tag && link.tag() > 0 && (
                  <Tag size="sm" colorScheme="teal" ml={2}>
                    {link.tag()}
                  </Tag>
                )}
              </NavItem>
            ))}
          </Box>
        </>
      }
      {shouldRenderMenteeLinks &&
        <>
          <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
            <Text textColor="white" fontSize="xl" fontWeight="normal">
              Mentee
            </Text>
          </Flex>
          <Box>
            {MenteeLinkItems.map((link) => (
              <NavItem
                key={link.name}
                icon={link.icon}
                href={link.href}
                bg={mode === "mentor" ? "brand.blue" : "brand.green"}
              >
                {link.name}
                {link.tag && link.tag() > 0 && (
                  <Tag size="sm" colorScheme="teal" ml={2}>
                    {link.tag()}
                  </Tag>
                )}
              </NavItem>
            ))}
          </Box>
        </>}
      {/* <Flex h="14" alignItems="center" mx="8" justifyContent="space-between">
        <Text textColor="white" fontSize="2xl" fontWeight="normal">
          {mode}
        </Text>
      </Flex>
      <Box mt={50}>
        {links.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            href={link.href}
            bg={mode === "mentor" ? "brand.blue" : "brand.green"}
          >
            {link.name}
            {link.tag && link.tag() > 0 && (
              <Tag size="sm" colorScheme="teal" ml={2}>
                {link.tag()}
              </Tag>
            )}
          </NavItem>
        ))}
        <Divider />
        <NavItem key="tupu.io" icon={FiHome} href="https://tupu.io" cursor="default">
          <Link href="https://tupu.io" isExternal cursor="link">
            tupu.io <ExternalLinkIcon mx="2px" />
          </Link>
        </NavItem>
      </Box> */}
    </Box>
  );
};

export default SidebarContent;
