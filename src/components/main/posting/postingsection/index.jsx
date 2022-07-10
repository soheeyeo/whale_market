import styled from "styled-components";
import Profile from "./Profile";
import PostingArea from "./Textarea";

const PostingWrapper = styled.section`
  padding: 70px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

function PostingSection() {
  return (
    <>
      <PostingWrapper>
        <Profile />
        <PostingArea />
      </PostingWrapper>
    </>
  );
}

export default PostingSection;
