import { Container, Text, Image, Space } from "@mantine/core";
import { Header } from "@/components/header"
import { MembersList } from "@/components/members-list";
import { AuthGuard } from "@/components/auth-guard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser } from "@/models/IUser";
import fetchHackathon from "@/api/fetch-hackathon";
import { SearchInput } from "@/components/search-input";
import useUserStore from "@/stores/user-store";

export const HackathonInfo = () => {
  const {user} = useUserStore()
  const { hackathon_id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [members, setMembers] = useState<IUser[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<IUser[]>([])
  const [preview, setPreview] = useState<string>("img-placeholder.jpg");
  const [minMembersAmount, setMinMembersAmount] = useState<number>(0);
  const [maxMembersAmount, setMaxMembersAmount] = useState<number>(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchHackathon(parseInt(hackathon_id as string)).then(data => {
      if (!data) return null;
      setPreview(`data:image/png;base64,${data.imageCover}`);
      setMembers(data.participants)
      setFilteredMembers(data.participants)
      setMinMembersAmount(data.min_participants)
      setMaxMembersAmount(data.max_participants)
      setDescription(data.description)
      setTitle(data.name)
    });
  }, [])

  return (
    <AuthGuard role='any'>
       <Header variant={user?.role} />
       <Container pb={"100px"}>
            <h1>{title}</h1>
            <Image src={preview} mah={350} radius="sm" mt="xs" />
            <Text mt="md">{description}</Text>
            <Text mt="xs" mb="md">Количество участников в команде: от {minMembersAmount} до {maxMembersAmount}</Text>
            <h2>Участники</h2>
            <Space h="md" />
            <SearchInput onChange={(search) => setFilteredMembers(members.filter(member => member.email.includes(search) || member.name.includes(search)))} />
            <Space h="md" />
            <MembersList hackathon_id={parseInt(hackathon_id as string)} members={filteredMembers} />
       </Container>
    </AuthGuard>
  );
};