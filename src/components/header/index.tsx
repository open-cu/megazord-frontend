import {Container, Group, Flex, Divider, Burger, Drawer, UnstyledButton, useMantineColorScheme, ActionIcon} from "@mantine/core"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import classes from "./styles.module.css"
import {IconMoon, IconSun} from "@tabler/icons-react";

const defaultLinks = [
    {link: '/', label: "Хакатоны"},
    {link: '/profile', label: "Профиль"},
]

const organizerLinks = [
    {link: '/hackathons/org', label: "Хакатоны"},
    {link: '/profile', label: 'Профиль'},
];

const createUserLinks = (hackathonId: number) => [
    {link: '/hackathons/user', label: "Хакатоны"},
    {link: `/hackathon/${ hackathonId }/teams`, label: 'Команды'},
    {link: `/hackathon/${ hackathonId }/my-resume`, label: 'Мое резюме'},
    {link: '/profile', label: 'Профиль'},
];

const getLinks = (variant: "default" | "organizer" | "user", hackathonId: number | null = null) => {
    if (variant === "default") return defaultLinks;
    else if (variant === "organizer") return organizerLinks
    else return createUserLinks(hackathonId!);
}

const getDataActive = (link: string) => {
    const path = window.location.pathname;
    if (path.split('/')[1] === "hackathons" && link === '/') {
        return true;
    } else return path === link;
}

interface Props {
    variant: "default" | "organizer" | "user";
}

export const Header = ({variant}: Props) => {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const {hackathon_id} = useParams();

    const links = getLinks(variant, parseInt(hackathon_id ?? '') ?? null);

    const isMobile = useMediaQuery('(max-width: 600px)')
    const [opened, {toggle, close}] = useDisclosure();

    const items = links.map((link) => {
        const dataActive = getDataActive(link.link)
        return (
            <Link
                className={ classes["link"] }
                data-active={ dataActive || undefined }
                key={ link.label }
                to={ link.link }>
                { link.label }
            </Link>
        )
    });

    return (
        <header className={ classes["header"] }>
            <Container size="md">
                <Flex justify={ "space-between" } align={ "center" } py="md">
                    <Flex align={"center"} gap={"xs"}>
                        <Logo/>
                        <ActionIcon
                            radius={"xl"}
                            size={"md"}
                            onClick={() => { setColorScheme(colorScheme== "light" ? "dark" : "light" ) }}
                        >
                            { colorScheme == "light" ?
                                <IconSun size={18} stroke={2} /> :
                                <IconMoon size={18} stroke={2} />
                            }
                        </ActionIcon>
                    </Flex>
                    {
                        isMobile
                            ? <Burger
                                onClick={ toggle }
                                opened={ opened }/>
                            : <Group gap="md">
                                { items }
                            </Group>
                    }
                    {
                        isMobile && <Drawer
                            opened={ opened }
                            onClose={ close }
                            size='100%'
                            title={ <Logo/> }>
                            <Flex gap="md" direction={ "column" }>
                                { items }
                            </Flex>
                        </Drawer>
                    }
                </Flex>
                <Divider w={ "100%" } mb="xl"/>
            </Container>
        </header>
    );
};

const Logo: FC = () => {
    const { colorScheme } = useMantineColorScheme();
    const navigate = useNavigate();

    return (
        <UnstyledButton onClick={ () => navigate("/") } h={26}>
            { colorScheme == "light" ?
                <svg width="144" height="26" viewBox="0 0 147 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.04 22.962H16V8.978L17.14 7.078H15.43L10.756 17.68H8.552L4.03 7.078H2.32L3.46 8.978V22.962H0.42V4.38H5.854L9.616 13.272H9.996L13.758 4.38H19.04V22.962ZM38.417 23H27.777C27.0424 23 26.409 22.7467 25.877 22.24C25.3704 21.708 25.117 21.0747 25.117 20.34V12.36C25.117 11.6253 25.3704 11.0047 25.877 10.498C26.409 9.966 27.0424 9.7 27.777 9.7H35.757C36.4917 9.7 37.1124 9.966 37.619 10.498C38.151 11.0047 38.417 11.6253 38.417 12.36V15.02L35.757 17.68H28.157L30.437 15.4H35.757V11.98H27.777V20.72H38.417V23ZM57.4155 9.7L55.1355 11.98H45.6355V20.72H53.6155V13.12H56.2755V28.32C56.2755 29.0547 56.0095 29.6753 55.4775 30.182C54.9709 30.714 54.3502 30.98 53.6155 30.98H42.5955L44.8755 28.7H53.6155V21.062L51.3355 23H45.6355C44.9009 23 44.2675 22.7467 43.7355 22.24C43.2289 21.708 42.9755 21.0747 42.9755 20.34V12.36C42.9755 11.6253 43.2289 11.0047 43.7355 10.498C44.2675 9.966 44.9009 9.7 45.6355 9.7H57.4155ZM74.5111 23H71.8511V21.062L69.5711 23H63.8711C63.1364 23 62.5031 22.7467 61.9711 22.24C61.4644 21.708 61.2111 21.0747 61.2111 20.34V17.68C61.2111 16.9453 61.4644 16.3247 61.9711 15.818C62.5031 15.286 63.1364 15.02 63.8711 15.02H71.4711L69.1911 17.262H63.8711V20.72H71.8511V11.98H61.2111L63.4911 9.7H71.8511C72.5858 9.7 73.2064 9.966 73.7131 10.498C74.2451 11.0047 74.5111 11.6253 74.5111 12.36V23ZM95.2063 23H79.2463V19.77L91.9763 7.04H79.2463V4.38H95.2063V7.648L82.4763 20.34H95.2063V23ZM113.267 20.34C113.267 21.0747 113.001 21.708 112.469 22.24C111.962 22.7467 111.341 23 110.607 23H102.627C101.892 23 101.259 22.7467 100.727 22.24C100.22 21.708 99.9666 21.0747 99.9666 20.34V12.36C99.9666 11.6253 100.22 11.0047 100.727 10.498C101.259 9.966 101.892 9.7 102.627 9.7H110.607C111.341 9.7 111.962 9.966 112.469 10.498C113.001 11.0047 113.267 11.6253 113.267 12.36V20.34ZM110.607 20.72V11.98H102.627V20.72H110.607ZM129.236 15.02H126.576V11.98H121.256V23H118.596V9.7H121.256V11.6L123.156 9.7H126.576C127.31 9.7 127.931 9.966 128.438 10.498C128.97 11.0047 129.236 11.6253 129.236 12.36V15.02ZM146.702 23H144.042V21.1L142.142 23H136.062C135.328 23 134.694 22.7467 134.162 22.24C133.656 21.708 133.402 21.0747 133.402 20.34V12.36C133.402 11.6253 133.656 11.0047 134.162 10.498C134.694 9.966 135.328 9.7 136.062 9.7H144.042V3.62L146.702 0.959998V23ZM144.042 20.72V10.08L142.142 11.98H136.062V20.72H144.042Z" fill="black"/>
                </svg> :
                <svg width="144" height="26" viewBox="0 0 139 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.88 20.964H15V7.716L16.08 5.916H14.46L10.032 15.96H7.944L3.66 5.916H2.04L3.12 7.716V20.964H0.24V3.36H5.388L8.952 11.784H9.312L12.876 3.36H17.88V20.964ZM36.2372 21H26.1572C25.4612 21 24.8612 20.76 24.3572 20.28C23.8772 19.776 23.6372 19.176 23.6372 18.48V10.92C23.6372 10.224 23.8772 9.636 24.3572 9.156C24.8612 8.652 25.4612 8.4 26.1572 8.4H33.7172C34.4132 8.4 35.0012 8.652 35.4812 9.156C35.9852 9.636 36.2372 10.224 36.2372 10.92V13.44L33.7172 15.96H26.5172L28.6772 13.8H33.7172V10.56H26.1572V18.84H36.2372V21ZM54.2358 8.4L52.0758 10.56H43.0758V18.84H50.6358V11.64H53.1558V26.04C53.1558 26.736 52.9038 27.324 52.3998 27.804C51.9198 28.308 51.3318 28.56 50.6358 28.56H40.1958L42.3558 26.4H50.6358V19.164L48.4758 21H43.0758C42.3798 21 41.7798 20.76 41.2758 20.28C40.7958 19.776 40.5558 19.176 40.5558 18.48V10.92C40.5558 10.224 40.7958 9.636 41.2758 9.156C41.7798 8.652 42.3798 8.4 43.0758 8.4H54.2358ZM70.4316 21H67.9116V19.164L65.7516 21H60.3516C59.6556 21 59.0556 20.76 58.5516 20.28C58.0716 19.776 57.8316 19.176 57.8316 18.48V15.96C57.8316 15.264 58.0716 14.676 58.5516 14.196C59.0556 13.692 59.6556 13.44 60.3516 13.44H67.5516L65.3916 15.564H60.3516V18.84H67.9116V10.56H57.8316L59.9916 8.4H67.9116C68.6076 8.4 69.1956 8.652 69.6756 9.156C70.1796 9.636 70.4316 10.224 70.4316 10.92V21ZM90.0375 21H74.9175V17.94L86.9775 5.88H74.9175V3.36H90.0375V6.456L77.9775 18.48H90.0375V21ZM107.147 18.48C107.147 19.176 106.895 19.776 106.391 20.28C105.911 20.76 105.323 21 104.627 21H97.0673C96.3713 21 95.7713 20.76 95.2673 20.28C94.7873 19.776 94.5473 19.176 94.5473 18.48V10.92C94.5473 10.224 94.7873 9.636 95.2673 9.156C95.7713 8.652 96.3713 8.4 97.0673 8.4H104.627C105.323 8.4 105.911 8.652 106.391 9.156C106.895 9.636 107.147 10.224 107.147 10.92V18.48ZM104.627 18.84V10.56H97.0673V18.84H104.627ZM122.276 13.44H119.756V10.56H114.716V21H112.196V8.4H114.716V10.2L116.516 8.4H119.756C120.452 8.4 121.04 8.652 121.52 9.156C122.024 9.636 122.276 10.224 122.276 10.92V13.44ZM138.823 21H136.303V19.2L134.503 21H128.743C128.047 21 127.447 20.76 126.943 20.28C126.463 19.776 126.223 19.176 126.223 18.48V10.92C126.223 10.224 126.463 9.636 126.943 9.156C127.447 8.652 128.047 8.4 128.743 8.4H136.303V2.64L138.823 0.119998V21ZM136.303 18.84V8.76L134.503 10.56H128.743V18.84H136.303Z" fill="#C9C9C9"/>
                </svg>
            }
        </UnstyledButton>
    )
}
