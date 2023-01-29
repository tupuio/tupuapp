import React from 'react'
import { Flex, Avatar, Text, Link, Box } from '@chakra-ui/react'

const BiographyItem = ({ label, text }) => {
    return (
        <Box w="100%">
            <Text fontSize="sm" as="b">{`${label}:`}</Text>
            <Text>
                {text}
            </Text>
        </Box>
    )
}


const ContactLink = ({ email, calendarObj }) => {
    if (calendarObj?.calendly) {
        return <Link href={calendarObj.calendly} ml="auto">Book a call</Link>
    }

    return <Link href={`mailto:${email}`} ml="auto">Contact</Link>
}


export const MentorshipInfo = ({ mentor }) => {
    return (
        <Flex
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
            bg={"white"}
            boxShadow={"2xl"}
            padding={4}
            wrap="wrap"
        >
            <Flex w="100px" mr={4} wrap="wrap" alignItems="center">
                <Avatar
                    size="xl"
                    src={mentor.picture}
                />
                <Text w="100%" align="center" mt={4}>{mentor.name}</Text>
            </Flex>
            <Flex flex="auto" wrap="wrap" mt={2}>
                <BiographyItem label="Bio" text={mentor.biography} />
                <BiographyItem label="Email" text={mentor.email} />
                <BiographyItem label="Languages" text={mentor.languages} />
                <Flex mt="auto" w="100%">
                    <ContactLink
                        email={mentor.email}
                        calendarObj={mentor.mentor}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}