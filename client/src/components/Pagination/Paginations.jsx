import React, {useEffect} from 'react';

import {Pagination, PaginationItem} from '@material-ui/lab';

import useStyle from './style.js';
import {Link} from "react-router-dom";
import {getPosts} from "../../store/actions/PostsActions";
import {useDispatch, useSelector} from "react-redux";

const Paginate = ({page}) => {

    const dispatch = useDispatch();

    const { totalPages } = useSelector(state => state.posts);

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
            // setTimeout(() => {
            //     dispatch(getPosts(page));
            // }, 2000);
        }
    }, [dispatch, page]);

    const classes = useStyle();

    return (
        <Pagination
            className={{ul: classes.ul}}
            page={Number(page) || 1}
            count={totalPages}
            color={"primary"}
            variant={"outlined"}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    )
}

export default Paginate;