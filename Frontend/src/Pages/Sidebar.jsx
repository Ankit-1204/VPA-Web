import React , {useContext,useState} from "react";
import { Box, Input, Button, Text, Checkbox } from '@chakra-ui/react';
import { UserContext } from "../../context/context";

const SideBar=({ handleInputEvent, newEventTitle, setNewEventTitle, selectedRecipients, handleRecipientChange })=>{
    const { userInfo } = useContext(UserContext);
    return (
        <Box width="20%" bg="gray.700" color="white" p={4} display="flex" flexDirection="column">
            <Box mb={4}>
                <Text fontSize="lg" mb={2}>Add Event</Text>
                <Input
                    placeholder="Event Title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    mb={2}
                    bg="gray.600"
                    color="white"
                />
                <Button colorScheme="teal" onClick={handleInputEvent} mb={2}>Add</Button>
            </Box>
            <Box>
                <Text fontSize="lg" mb={2}>Select Recipient(s)</Text>
                {userInfo.usersInTeam.filter(recipient => recipient._id !== userInfo.user.id).map((recipient) => (
                    <Checkbox
                        key={recipient._id}
                        isChecked={selectedRecipients.includes(recipient._id)}
                        onChange={() => handleRecipientChange(recipient._id)}
                        colorScheme="teal"
                        mb={2}
                    >
                        {recipient.firstName}
                    </Checkbox>
                ))}
            </Box>
        </Box>
    )
};

export default SideBar;