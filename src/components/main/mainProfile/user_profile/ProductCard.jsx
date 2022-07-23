import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import img from '../../../../assets/product-img.png';
import Modal from '../../../modal/Modal';
import AlertModal from '../../../modal/AlertModal';
import AuthContext from '../../../../context/AuthProvider';
import axios from 'axios';
import { API_URL } from '../../../../constants/defaultUrl';

const ProductWrapper = styled.li`
    display: flex;
    flex-direction: column;
    list-style: none;
    /* width: 24.375rem; */ 
    cursor:pointer;
`
const ProductImg = styled.img`
    width: 8.75rem;
    height: 5.625rem;
    border-radius: 0.5rem;
    object-fit: cover;
`

const ProductName = styled.strong`
    margin: 0.375rem 0 0.25rem;
    font-size: 0.875rem;
`

const ProductPrice = styled.p`
    color: #00BCD4;
    font-size: 0.75rem;
    font-weight: 700;
`

function ProductCard({productPrice}) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);

    const modalItemList = [
        {
            content: "삭제",
            onClick: () => {
                setAlertModal(true);
            },
            
        },
        {
            content: "수정",
            onClick: () => {},
        },
        {
            content: "웹사이트에서 상품보기",
            onClick: () => {},
        }
    ];

    const deleteBtn = {
        content: "삭제",
        onClick: () => {},
    };
    
    const[InfoState, setInfoState] = useContext(AuthContext);

    console.log(InfoState.MyInformations[2]);

    // async function getProductName() {
    //     try{
    //         const config = {
    //             headers: {
    //                 Authorization : `Bearer ${InfoState.MyInformations[0].token}`,
    //                 "Content-type" : "application/json"
    //             },
    //         };
    //         const response = await axios.get(
    //             `${API_URL}/product/${InfoState.MyInformations[0].myAccountname}`,
    //             config
    //         );
    //         setInfoState((InfoState) => {
    //             response.data.product.map((value) => {
    //                 InfoState.MyInformations[2] = {
    //                     ...InfoState.MyInformations[2],
    //                     itemName: [...InfoState.MyInformations[2].itemName, value.itemName],
    //                     price: [...InfoState.MyInformations[2].price, value.price],
    //                     link: [...InfoState.MyInformations[2].link, value.link],
    //                     itemImage: [...InfoState.MyInformations[2].itemImage, value.itemImage],
    //                 };
    //                 return {MyInformations: InfoState.MyInformations }
    //             })
    //         });
    //         console.log(InfoState.MyInformations[2]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return(
        <>
            <ProductWrapper onClick={()=>setIsOpenModal(!isOpenModal)}>
                <ProductImg src={img}/>
                <ProductName>고래밥</ProductName>
                <ProductPrice>{productPrice}원</ProductPrice>
            </ProductWrapper>

            <Modal 
                isOpenModal={isOpenModal} 
                setIsOpenModal={setIsOpenModal} 
                modalItemList={modalItemList} 
            />
            <AlertModal
                alertModal={alertModal}
                setAlertModal={setAlertModal}
                setIsOpenModal={setIsOpenModal}
                content={"상품을 삭제할까요?"}
                deleteBtn={deleteBtn}
            />
        </>
    )
}

export default ProductCard;
