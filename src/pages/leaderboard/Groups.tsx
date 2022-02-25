import { Box, Button, Dialog, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const Groups = ({ groupNames, selectGroup, addGroup }: { groupNames: string[], selectGroup: (groupName: string) => void, addGroup: (groupName: string) => void }) => {

    const [open, setOpen] = useState(false)
    const [newGroupName, setNewGroupName] = useState("");

    useEffect(() => {
        if (open) {
            // clear
            setNewGroupName("")
        }
    }, [open]);

    

    return (
        <Box display="flex">
            <Dialog open={open} onClose={() => { setOpen(false) }}>
                <DialogTitle>
                    Add a new group
                </DialogTitle>
                <FormControl sx={{ padding: "1em" }}>
                    <TextField
                        value={newGroupName}
                        onChange={(e) => { setNewGroupName(e.target.value) }}
                    />
                </FormControl>
                <Button variant="contained" sx={{ margin: "1em" }}
                    onClick={() => { 
                        addGroup(newGroupName)
                        setOpen(false)
                    }}
                >
                    Add Group
                </Button>
            </Dialog>
            <FormControl>
                <InputLabel id="group-select-label">Group</InputLabel>
                <Select
                    labelId="group-select-label"
                    label="Group"
                    onChange={(e) => { selectGroup(e.target.value as string) }}
                    defaultValue=""
                >
                    {groupNames.map((groupName) => (
                        <MenuItem value={groupName} key={groupName}>{groupName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <IconButton onClick={() => { setOpen(true) }}>
                <AddIcon fontSize='small' />
            </IconButton>
        </Box>
    )
};

export default Groups;
