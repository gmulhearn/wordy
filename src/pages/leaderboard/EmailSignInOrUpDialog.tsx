import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export const EmailSignInOrUpDialog = (
    { open, setOpen, isSignIn, submit }:
        {
            open: boolean,
            setOpen: (open: boolean) => void,
            isSignIn: boolean,
            submit: (email: string, password: string) => void
        }
) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (open) {
            // re-opened: clear
            setEmail("")
            setPassword("")
        }
    }, [open]);


    return (
        <Dialog open={open} onClose={() => {
            setOpen(false)
        }}>
            <DialogTitle>
                {isSignIn ? "Sign In" : "Sign Up"}
            </DialogTitle>
            <Box display="flex" flexDirection="column" sx={{ margin: "1em" }}>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    sx={{ marginTop: "0.5em" }}
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    type="password"
                    sx={{ marginTop: "0.5em" }}
                />
                <Button onClick={() => { submit(email, password) }} variant="contained"
                    sx={{ marginTop: "0.5em" }}
                >
                    {isSignIn ? "Sign In" : "Sign Up"}
                </Button>
            </Box>

        </Dialog>
    )
}