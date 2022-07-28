import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../../constants/defaultUrl";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthProvider";
import whale from "../../../assets/whale-small.png";

const RewardCard = styled.li`
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  width: 230px;
  padding: 16px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 190px;
  }

  @media screen and (max-width: 390px) {
    width: 100%;
    margin-top: 30px;
    padding: 10px 5% 25px;
  }
`;

const Img = styled.img`
    width: 198px;
    height: 158px;
    border-radius: 10px;
    object-fit: fill;

  @media screen and (max-width: 768px) {
    width: 158px;
    height: 126px;
  }

  @media screen and (max-width: 390px) {
    width: 100%;
    height: 230px;
  }
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  margin: 16px 10px;
  word-break: keep-all;

  @media screen and (max-width: 768px) {
    margin: 20px auto 18px;
    column-gap: 0;
    row-gap: 14px;
    width: 160px
  }

  @media screen and (max-width: 390px) {
    margin: 30px auto;
  }
`;

const RewardTit = styled.p`
  font-size: 14px;
  color: #515151;

  ::before {
    display: inline-block;
    left: 0;
    vertical-align: middle;
    width: 24px;
    height: 14px;
    margin-right: 5px;
    background-image: url(${whale});
    background-size: 24px 14px;
    background-repeat: no-repeat;
    content: "";
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }

  @media screen and (max-width: 390px) {
    font-size: 14px;
    line-height: 14px;
  }
`;

const RewardCont = styled.strong`
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #515151;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }

  @media screen and (max-width: 390px) {
    font-size: 14px;
    line-height: 14px;
  }
`;

const GetBtn = styled.button`
  display: block;
  width: 84px;
  margin: 0 auto;
  padding: 8px 18px;
  border-style: none;
  border-radius: 50px;
  background-color: ${(props) => (props.disabled ? "grey" : "#00BCD4")};
  color: #fff;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;

  @media screen and (max-width: 390px) {
    width: 90px;
    padding: 10px 18px;
    font-size: 14px;
    line-height: 14px;
  }
`;

function Reward({ data }) {
  const [InfoState] = useContext(AuthContext);
  const [Acquired, setAcquired] = useState([]);
  async function getReward() {
    try {
      const commentData = {
        comment: {
          content: "획득",
        },
      };
      await axios.post(`${API_URL}/post/${data.id}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      });
      const res = await axios.get(`${API_URL}/post/${data.id}/comments`, {
        headers: {
          Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
          "Content-type": "application/json",
        },
      });
      setAcquired(res.data.comments);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function acquiredReward() {
      try {
        const res = await axios.get(`${API_URL}/post/${data.id}/comments`, {
          headers: {
            Authorization: `Bearer ${InfoState.MyInformations[0].token}`,
            "Content-type": "application/json",
          },
        });
        setAcquired(res.data.comments);
      } catch (error) {
        console.error(error);
      }
    }
    acquiredReward();
  }, [InfoState.MyInformations]);

  return (
    <RewardCard>
      <Img src={data.image} />
      <TextWrapper>
        <RewardTit>리워드 이름</RewardTit>
        <RewardCont>{data.content.split(",")[0]}</RewardCont>
        <RewardTit>남은 수량</RewardTit>
        <RewardCont>
          {data.content.split(",")[1] -
            Acquired.map((value) => value.author.accountname).filter(
              (value) => {
                return value === InfoState.MyInformations[0].myAccountname;
              }
            ).length}
        </RewardCont>
      </TextWrapper>
      <GetBtn
        onClick={getReward}
        disabled={
          data.content.split(",")[1] -
            Acquired.map((value) => value.author.accountname).filter(
              (value) => {
                return value === InfoState.MyInformations[0].myAccountname;
              }
            ).length ===
          0
            ? true
            : false
        }
      >
        획득하기
      </GetBtn>
    </RewardCard>
  );
}

export default Reward;
