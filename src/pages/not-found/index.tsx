import { Flex, Text, Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import classes from './not-found.module.css'

export const NotFound = () => {

  const navigate = useNavigate()

  const back = () => {
    navigate("/")
  }
  
  return (
    <Flex direction="column" justify="center" align="center" h="100vh">
       <Text className={classes["sub-title"]}>Page Not Found</Text>
       <Text className={classes["main-title"]}>404</Text>
       <Button mt="md" onClick={back}>На главную</Button>
    </Flex>
  );
};
