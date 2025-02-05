import {Button, Flex, Text} from "@mantine/core"
import classes from './service-not-available.module.css'

export const ServiceNotAvailable = () => {
  // const back = () => {
  //   navigate("/")
  // }

  return (
    <Flex direction="column" justify="center" align="center" h="100vh">
      <Text className={classes["sub-title"]}>Сервис сбора временно не доступен</Text>
      <Text className={classes["main-title"]}>503</Text>
      {/*<Button mt="md" onClick={back}>На главную</Button>*/}
    </Flex>
  );
};
