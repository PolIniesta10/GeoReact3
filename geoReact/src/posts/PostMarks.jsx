import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostMark from './PostMark';


const PostMarks = () => {
    const { postMarks } = useSelector((state) => state.postMarks);
    useEffect(() => {
        localStorage.setItem("marksPosts", JSON.stringify(postMarks));
      }, [postMarks]);
    return (
        <>
        {postMarks.map((postMark) => (
            <>
            <th>Body</th>
            <th colSpan={2}>Actions</th>
            <tr>
                <PostMark key={postMark.id} postMark={postMark}/>
            </tr>
            </>
        ))}
        </>
    )
}

export default PostMarks
