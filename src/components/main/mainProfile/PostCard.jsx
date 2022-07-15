import React from 'react';
import styled from 'styled-components';
import profileImg from '../../../assets/basic-profile-img.png';
import menubtn from '../../../assets/s-icon-more-vertical.png';

const PostWrapper = styled.div`
    width: 24.375rem;
    margin: 0  auto 3.750rem auto;
`

const PostInfo = styled.div`
    display: flex;
    position: relative;
    padding: 1rem 1rem;
`

const PostInfoImg = styled.img`
    width: 2.625rem;
    height: 2.625rem;
`

const PostInfoUser = styled.div`
    margin: 0 0 1rem 0.750rem;
    padding-top: 0.25rem;
`

const PostInfoName = styled.strong`
    font-size: 0.875rem;
    font-weight: 500;
`

const PostMenuBtn = styled.button`
    position: absolute;
    top: 1.5rem;
    right: 0;
    width: 1.125rem;
    height: 1.125rem;
    border: none;
    background-color: inherit;
    background-image: url(${menubtn});
    background-size:  1.125rem  1.125rem;
    &:hover{
        cursor: pointer;
    }
`

const PostInfoId = styled.p` 
    margin-top: 2px;
    font-size: 0.75rem;
    color: #767676;
`  

function PostCard() {
    return(
        <PostWrapper>
            <PostInfo>
                <PostInfoImg src={profileImg}/>
                <PostInfoUser>
                    <PostInfoName>김웨일</PostInfoName>
                    <PostInfoId>@sosoheehee_whale</PostInfoId>
                    <PostMenuBtn/>
                </PostInfoUser>
            </PostInfo>
        </PostWrapper>
    )
}

export default PostCard;