import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Center, FileInput, Flex, Text } from "@mantine/core";
import { IconChevronLeft, IconFileTypePdf } from "@tabler/icons-react";
import { Anchor } from "@mantine/core";
import { AuthGuard } from "@/components/auth-guard";
import importPDFResume from "@/api/import-pdf-resume.ts";
import createCustomResume from "@/api/create-custom-resume.ts";

export const ImportPdf = () => {
    const params = useParams()
    const [hackathonId, setHackathonId] = useState(0);
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        setHackathonId(parseInt(params.hackathon_id ?? ''))
    }, [])

    const onSubmit = async () => {
        if (!file || file?.size > 2e7) {
            setError('Слишком большой файл :(')
            return
        }
        setError(null)
        setLoading(true)

        const resume = await importPDFResume(file!)

        if (resume && hackathonId) {
            const success = await createCustomResume(hackathonId, {
                bio: resume.bio,
                soft: resume.softs,
                tech: resume.hards,
            })

            if (success) {
                navigate(`/hackathon/${hackathonId}/my-resume`)
            }
        } else {
            setError('Не удалось распарсить. Попробуйте снова')
        }

        setLoading(false)
    }

    return (
        <AuthGuard role='user'>
            <Flex component={ Center } h={ "100vh" } direction={ "column" } gap={ "xs" }>
                <Text size={ "xl" } fw={500}>Импорт резюме из PDF</Text>
                <Flex direction={ "column" } w={ "300px" } gap={ "xs" }>
                    <FileInput
                        // accept="application/pdf"
                        clearable
                        disabled={ loading }
                        value={ file }
                        error={ error }
                        onChange={ setFile }
                        placeholder="Загрузите pdf резюме"
                        leftSection={ <IconFileTypePdf stroke={ 2 } size={ 20 }/> }
                    />
                    <Button
                        loading={ loading }
                        disabled={ file == null }
                        onClick={ onSubmit }>
                        Анализировать
                    </Button>
                </Flex>
                <Anchor component={ Link } to={ `/hackathon/${ hackathonId }/create-resume/` }>
                    <Flex align={ "center" } gap={ "5px" }>
                        <IconChevronLeft stroke={ 2 } size={ 18 }/>
                        <Text>Вернуться к выбору</Text>
                    </Flex>
                </Anchor>
            </Flex>
        </AuthGuard>
    )
}