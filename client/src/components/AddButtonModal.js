import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalCloseButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import CreateEventDrawer from "./CreateEventDrawer";
import CreatePostDrawer from "./CreatePostDrawer";
export default function AddButtonModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function handelnewpost() {
    window.location.href = "/createpost";
  }
  function handelnewevent() {
    window.location.href = "/addevent";
  }
  return (
    <>
      <Button
        mr={5}
        onClick={onOpen}
        w={"250px"}
        rightIcon={<BiPlus />} //Getting Error for this line
        colorScheme="green"
        variant="solid"
      >
        Add New
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack pb={"20px"}>
              <CreatePostDrawer />
              <CreateEventDrawer />
            </Stack>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
