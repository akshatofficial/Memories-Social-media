import React, {useEffect, useState} from "react";
import useStyle from "./style.js";

import {Paper, Typography, Button, TextField} from "@material-ui/core";

import Filebase from "react-file-base64";

import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../store/actions/PostsActions.js";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import ShowToast from "../ShowToast";
import {ERROR} from "../../store/types";

const Form = ({currId, setCurrId}) => {
    const classes = useStyle();

    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        selectedFile: "",
        tags: "",
    });

    //const {posts} = useSelector((state) => state.posts);
    const requiredPost = useSelector((state) => (currId ? state.posts.posts.find((post) => post._id === currId) : null));

    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (requiredPost) setPostData(requiredPost);
        //console.log(requiredPost);
    }, [requiredPost]);

    //console.log(props);

    const clear = () => {
        setCurrId(null);
        setPostData({
            title: "",
            message: "",
            selectedFile: "",
            tags: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  //--> This is bug... solve this.
        //console.log(postData);
        if (
            postData.title === "" ||
            postData.message === "" ||
            postData.selectedFile === "" ||
            postData.tags === ""
        ) {
            ShowToast(ERROR, "Please fill all the fields!");
        } else {
            if (currId) {
                dispatch(updatePost(currId, {...postData, name: user?.result?.name}));
                clear();
            } else {
                dispatch(createPost({...postData, name: user?.result?.name}, history));
                clear();
            }
        }
    };

    //console.log(props);

    if (!user?.result?.name) {
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{width: "fit-content", backgroundColor: "white", padding: "5px"}}>
                    <Typography variant={"h6"} align={"center"}>
                        Please Sign in to like and create memories.
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Typography variant="h6">{currId ? `Update Memory` : `Create Memory`}</Typography>
                <TextField
                    variant="outlined"
                    name="title"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField
                    variant="outlined"
                    name="message"
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({...postData, message: e.target.value})
                    }
                />
                <TextField
                    variant="outlined"
                    name="tags"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(",")})}
                />
                <div className={classes.fileInput}>
                    <Filebase
                        type="file"
                        multiple={false}
                        onDone={({base64}) =>
                            setPostData({...postData, selectedFile: base64})
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    onClick={clear}
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
