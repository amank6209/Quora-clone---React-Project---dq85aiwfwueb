import "./css/Feed.css";
import Box from "./Box";
import Post from "./Post";

function Feed(props) {

    const { posts } = props

    console.log(posts);

    return (
        <div className='feed'>
            <Box />
            {
                posts.map(({ id, question }) => (
                    <Post
                        key={id}
                        id={id}
                        image={question.imageUrl}
                        question={question.question}
                        timestamp={question.timestamp}
                        quoraUser={question.user}
                    />
                ))
            }

        </div>

    )
}

export default Feed;