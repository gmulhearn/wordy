import { Button, Dialog, DialogTitle, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore'
import { getAuth, GoogleAuthProvider, EmailAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseConfig } from '../../config/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import MailIcon from '@mui/icons-material/Mail';
import { GAME_TYPE, getGameboardIfExists } from '../../core/CookieCore';
import { checkIfGridGameOver } from '../../core/LetterGridCore';
import { useNavigate } from 'react-router';
import { EmailSignInOrUpDialog } from './EmailSignInOrUpDialog';

const styles = {
    root: {
        width: "400px",
        // minHeight: "85vh",
        // border: 1
    },
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

const Leaderboard = ({ colourBlind }: { colourBlind: boolean }) => {

    const navigate = useNavigate();
    const navHome = useCallback(() => navigate('/', { replace: true }), [navigate]);

    const [user] = useAuthState(auth)
    const [showGameIncompleteDialog, setShowGameIncompleteDialog] = useState(false);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [isEmailSignIn, setIsEmailSignIn] = useState(false)

    const [showDisplayNamePrompt, setShowDisplayNamePrompt] = useState(false);
    const [displayNameField, setDisplayNameField] = useState("")

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("error");

    useEffect(() => {
        checkAndPromptForDisplayName()
    }, [user]);


    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const checkAndPromptForDisplayName = () => {
        if (!user) {
            return
        }
        if (!user.displayName) {
            setShowDisplayNamePrompt(true)
        }
    }

    const submitDisplayName = () => {
        if (user) {
            updateProfile(user, {
                displayName: displayNameField
            })
        }
    }

    const handleEmailSignInOrUp = (email: string, password: string) => {
        if (isEmailSignIn) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setEmailDialogOpen(false)
                })
                .catch((reason) => {
                    setShowError(true)
                    setErrorMessage(reason.toString())
                })
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setEmailDialogOpen(false)
                })
                .catch((reason) => {
                    setShowError(true)
                    setErrorMessage(reason.toString())
                })
        }
    }

    const uploadYourResult = () => {
        const board = getGameboardIfExists(GAME_TYPE.CLASSIC)

        if (!board) {
            console.log("no cookie")
            setShowGameIncompleteDialog(true)
            return
        }

        if (!checkIfGridGameOver(board)) {
            console.log("game not over")
            setShowGameIncompleteDialog(true)
            return
        }

        // magic here
    }

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showError}
                onClose={() => { setShowError(false) }}
                autoHideDuration={1000}
                message={errorMessage}
            />
            <Dialog open={showGameIncompleteDialog} onClose={() => {
                setShowGameIncompleteDialog(false)
            }}>
                <Typography sx={{ textAlign: "center", margin: "2em" }}>
                    You haven't completed today's wordy yet!
                </Typography>
                <Button onClick={navHome} sx={{ margin: "1em" }} variant="contained">
                    Take me to my wordy
                </Button>
            </Dialog>
            <EmailSignInOrUpDialog
                open={emailDialogOpen}
                setOpen={setEmailDialogOpen}
                isSignIn={isEmailSignIn}
                submit={handleEmailSignInOrUp}
            />
            <Dialog open={showDisplayNamePrompt} onClose={() => {
                setShowDisplayNamePrompt(false)
            }}>
                <Box display="flex" flexDirection="column" sx={{ margin: "1em" }}>

                    <Typography sx={{ textAlign: "center", margin: "2em" }}>
                        Please set your display name
                    </Typography>
                    <TextField
                        value={displayNameField}
                        onChange={(e) => { setDisplayNameField(e.target.value) }}
                        label="Display Name"
                    />
                    <Button onClick={() => {
                        submitDisplayName()
                        setShowDisplayNamePrompt(false)
                    }} sx={{ margin: "1em" }} variant="contained">
                        Submit
                    </Button>
                </Box>
            </Dialog>
            <Typography variant="h4">
                Leaderboard
            </Typography>

            {user ? (
                <Box display="flex" flexDirection="column" marginTop="2em">
                    <Box display="flex" alignItems="center">
                        {auth.currentUser?.displayName}
                        <Button
                            onClick={() => signOut(auth)}
                        >
                            Sign Out
                        </Button>
                    </Box>
                    <Button onClick={uploadYourResult}>
                        Upload your result
                    </Button>
                    Leaderboard go here!
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" marginTop="2em">
                    <Typography variant="h6" textAlign="center" margin="1em">
                        You aren't signed in!
                    </Typography>
                    <Typography textAlign="center" margin="1em">
                        Please sign in to Wordy to view your friends scores and upload your own!
                    </Typography>
                    <Button
                        onClick={signInWithGoogle}
                        variant="outlined"
                        sx={{ marginInline: "1em", marginTop: "1em" }}
                    >
                        <GoogleIcon sx={{ marginInline: "0.5em" }} />
                        Sign In
                    </Button>
                    <Button
                        onClick={() => {
                            setIsEmailSignIn(true)
                            setEmailDialogOpen(true)
                        }}
                        variant="outlined"
                        sx={{ marginInline: "1em", marginTop: "0.5em" }}
                    >
                        <MailIcon sx={{ marginInline: "0.5em" }} />
                        Sign In
                    </Button>
                    <Button
                        onClick={() => {
                            setIsEmailSignIn(false)
                            setEmailDialogOpen(true)
                        }}
                        variant="outlined"
                        sx={{ marginInline: "1em", marginTop: "0.5em" }}
                    >
                        <MailIcon sx={{ marginInline: "0.5em" }} />
                        Sign Up
                    </Button>
                </Box>
            )}
        </Box>);
};

export default Leaderboard;
