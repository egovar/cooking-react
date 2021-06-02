import React from 'react';

import './comment.css';



const Comment = ({ comment_data: { comment_author_login, comment_text, comment_post_time }}) => {

    if (comment_post_time.toLowerCase() !== 'только что'){
        const date_arr = comment_post_time.substr(2, 8).split('-');
        const time_str = comment_post_time.substr(11, 5);

        comment_post_time = `${ time_str } ${ date_arr[2] }.${ date_arr[1] }.${ date_arr[0] }`;
    }

    return (
        <div className="comment card mb-2">
            <div className="card-header">
                <span className="fw-bolder">
                    { comment_author_login }</span><span> { comment_post_time }</span>
            </div>
            <div className="card-body">
            { comment_text }
            </div>
        </div>
    );
}

export default Comment;
