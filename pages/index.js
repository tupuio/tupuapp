import useSWR from "swr";
import { useRouter } from 'next/router'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home({ mode }) {
  const router = useRouter();
  console.log('mode', mode);
  
  let homePath = '/profile';
  if (mode === "mentor") {
    const { data: requestsData } = useSWR("/api/requestsCount", fetcher);
    const { data: menteesData } = useSWR("/api/menteesCount", fetcher);
    const { data: profile } = useSWR("/api/profile", fetcher);
    const requestsCount = requestsData?.count || 0;
    const menteesCount = menteesData?.count || 0;
    console.log('requestsCount', requestsCount);
    console.log('menteesCount', menteesCount);
    console.log('profile.mentor', profile?.mentor);
    
    if (profile && !profile?.mentor?.calendly) {
      // will go to the profile to let the mentor set their calendar link
      homePath = '/preferences';
    } else if (requestsCount) {
      homePath = '/requests';
    } else if (menteesCount) {
      homePath = '/mentees';
    }
  } if (mode === "mentee") {
    const { data: applicationsData } = useSWR("/api/applicationsCount", fetcher);
    const { data: mentorshipsData } = useSWR("/api/mentorshipsCount", fetcher);
    const applicationsCount = applicationsData?.count || 0;
    const mentorshipsCount = mentorshipsData?.count || 0;
    if (mentorshipsCount) {
      homePath = '/mentorships';
    } else if (applicationsCount) {
      homePath = '/applications';
    } else {
      homePath = '/mentors';
    }
  }
  console.log('path:', homePath);
  // go to profile
  router.push(homePath);
  return <></>;
}
