import React from 'react';
import styled from 'styled-components';
import ModalPortal from '../../../src/Portal';

const ModalBg =styled.section`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
    visibility: ${(props) => (props.isOpenModal === false ? "hidden" : "visible")};
    opacity: ${(props) => (props.isOpenModal === false ? "0" : "1")};
`

const ModalUl = styled.ul`
    position: absolute;
    bottom: 0;
    z-index: 10;
    transition: all 0.5s;
    transform: translateY( ${(props) => (props.isOpenModal === false ? "100%" : "0")} );
    width: 100%;
    padding: 36px 0 16px;
    border-radius: 10px 10px 0 0;
    background-color: #FFFFFF;

    &::before {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 4px;
        border-radius: 5px;
        background-color: #DBDBDB;
        content: "";
    }
`

const ModalItem = styled.button`
    width: 100%;
    padding: 16px 26px;
    border: none;
    background-color: inherit;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.53px;
    text-align: left;
    
    &:hover{
        cursor: pointer;
    }
`


function Modal({isOpenModal, setIsOpenModal, modalItemList}) {
    return (
        <ModalPortal>
            <ModalBg isOpenModal={isOpenModal} onClick={() => setIsOpenModal(false)}>
                <ModalUl isOpenModal={isOpenModal} onClick={(event)=>{event.stopPropagation()}}>
                    {modalItemList.map((item,index)=>{
                        // 모달창 아이템 리스트
                        return(
                            <li>
                                <ModalItem
                                    key={index}
                                    onClick={item.onClick}
                                    >
                                    {item.content}
                                </ModalItem>
                            </li>
                        )
                    })}
                </ModalUl>
            </ModalBg>
        </ModalPortal>
    );
}

export default Modal;