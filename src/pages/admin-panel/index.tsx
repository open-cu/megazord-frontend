import {Link, useParams} from "react-router-dom";
import {Header} from "@/components/header";
import {AuthGuard} from "@/components/auth-guard";
import styles from "@/pages/change-hackathon/change-hackathon.module.css";
import {Container} from "@mantine/core";

const AdminPanel = () => {
    const {hackathon_id} = useParams()
    return (
        <AuthGuard role={"organizer"}>
            <Header variant={"organizer"} />
            <Container size="md">
                <Link
                    to={ `/hackathon/${ hackathon_id }/org/teams` }
                    className={ styles.link }
                >
                    Смотреть команды
                </Link>
            </Container>
        </AuthGuard>
    );
};

export default AdminPanel;
