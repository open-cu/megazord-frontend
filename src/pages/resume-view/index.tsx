import {Avatar, Badge, Center, Container, Flex, Text} from "@mantine/core"
import {Header} from "@/components/header";
import {AuthGuard} from "@/components/auth-guard";
import {useEffect, useState} from "react";
import {fetchResume} from "@/api/fetch-resume";
import {IResume} from "@/models/IResume";
import {useParams} from "react-router-dom";
import {IUser} from "@/models/IUser";
import fetchProfileById from "@/api/fetch-profile-by-id";
import useUserStore from "@/stores/user-store";
import {ResumeViewCard} from "@/components/resume-view-card";
import {copyClipboard} from "@/utils/copy-clipboard";

interface IContact {
    name: string,
    data: string,
    link: string,
}

export const ResumeView = () => {
    const {user} = useUserStore()
    const [resume, setResume] = useState<IResume | null>(null)
    const [profile, setProfile] = useState<IUser | null>(null)
    const [contacts, setContacts] = useState<IContact[]>([])

    const {hackathon_id, user_id} = useParams()

    useEffect(() => {
        fetchResume(user_id as string, hackathon_id as string).then(data => {
            setResume(data)
            const contacts: IContact[] = [
                {
                    name: "Telegram",
                    data: data?.telegram,
                },
                {
                    name: "GitHub",
                    data: data?.githubLink,
                },
                {
                    name: "hh.ru",
                    data: data?.hhLink,
                }
            ].filter((contact: IContact) => !!contact.data)
            setContacts(contacts)
        })

        fetchProfileById(user_id as string).then(data => {
            setProfile(data)
        })
    }, [])

    const contactsItems = contacts.map((contact, i) => (
        <Flex gap={"5"} key={`cont-${contact}-${i}`}>
            <Text fw={500}>{contact.name + ": "}</Text>
            <Text truncate c={"blue"} style={{ cursor: "pointer" }} onClick={() => copyClipboard(contact.data)}>{contact.data}</Text>
        </Flex>
    ))

    const techSkillsItems = (
        <Flex gap={ 6 } mt={ 4 } direction='row' maw='100%' wrap='wrap'>
            {resume?.techStack.map((skill, i) =>
                <Center component={Badge} w='fit-content' miw={ 40 } size={"xs"} key={`tech-${i}`}>
                    { skill }
                </Center>
            )}
        </Flex>
    )

    const softSkillsItems = (
        <Flex gap={ 6 } mt={ 4 } direction='row' maw='100%' wrap='wrap'>
            {resume?.softSkills.map((skill, i) =>
                <Center component={Badge} w='fit-content' miw={ 40 } size={"xs"} key={`soft-${i}`}>
                    { skill }
                </Center>
            )}
        </Flex>
    )

    return (
        <AuthGuard role='any'>
            <Header variant={user?.role}/>
            <Container>
                <Flex align="center" gap="md">
                    <Avatar size={"xl"} name={profile?.name} color="initials" />
                    <Flex direction={"column"} w={"calc(100% - 100px)"}>
                        <Text size={"24px"} fw={"600"} truncate>{profile?.name}</Text>
                        {/*<Text truncate c={"blue"} style={{ cursor: "pointer" }} onClick={() => copyClipboard(profile?.email)}>{profile?.email}</Text>*/}
                    </Flex>
                </Flex>

                { resume?.role &&
                    <ResumeViewCard title={`Роль участника — ${resume.role}`} />}

                { resume?.bio &&
                    <ResumeViewCard title={"Обо мне"} content={resume.bio} />}

                { contacts.length > 0 &&
                    <ResumeViewCard title={"Контакты"} content={contactsItems} />}


                { resume?.techStack && resume.techStack.length > 0 &&
                    <ResumeViewCard title={"Tech Skills"} content={techSkillsItems} />}

                { resume?.softSkills && resume.softSkills.length > 0 &&
                    <ResumeViewCard title={"Soft Skills"} content={softSkillsItems} />}

                {
                    (!resume?.softSkills || !resume.softSkills.length) &&
                    (!resume?.techStack || !resume.techStack.length) &&
                    (!contacts.length || !contacts.length) &&
                    !resume?.bio &&
                    ( <Text ta={"center"} mt={"md"} fw={"500"}>У пользователя пустое резюме</Text> )
                }
            </Container>
        </AuthGuard>
    );
};
