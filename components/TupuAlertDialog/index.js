import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

const TupuAlertDialog = ({ isOpen, onClose, params, cancelRef, isLoading }) => {
  if (!params) {
    return (<></>)
  }
  // console.log(params);
  const {
    title, message, action, onConfirm
  } = params;
  return (
    <>
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          {title}
        </AlertDialogHeader>

        <AlertDialogBody>
          {message}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading} 
            type="submit"
            colorScheme='red'
            onClick={onConfirm} ml={3}
          >
            {action}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
  </>
  )
};

export default TupuAlertDialog;
