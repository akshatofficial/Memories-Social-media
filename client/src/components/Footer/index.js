import React from 'react';
import {Paper} from "@material-ui/core";

const Footer = () => {
    return (
        <>
            <footer style={{margin: "8px", textAlign: "center"}}>
                <Paper elevation={7} style={{padding: "5px"}}>
                    &#169;Made with <span style={{color: "red"}}>&#10084;</span> by Akshat Tripathi
                </Paper>
            </footer>
        </>
    );
};

export default Footer;