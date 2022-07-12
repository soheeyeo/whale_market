import React from 'react';
import styled from 'styled-components';

const StartBtn = styled.button`
    padding: 0.813rem 6.688rem 0.813rem 6.75em;
    border-style: none;
    border-radius: 2.750rem;
    background-color: #00BCD4;
    color: #fff;
    font-size: 0.875em;
    cursor: pointer;
    :disabled {
        background: #B2EBF2;
    }
    `;

function StartButton({ userInfo }) {
    return(
        <StartBtn type="submit" disabled={disabled}>
            웨일마켓 시작하기
        </StartBtn>
    );
};

export default StartButton;