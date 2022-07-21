import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SaveProductContext from "../../../../../context/SaveProductProvider";
import axios from "axios";
import { API_URL } from "../../../../../constants/defaultUrl";

const Save = styled.button`
  width: 90px;
  height: 32px;
  border: none;
  border-radius: 32px;
  background-color: ${(props) => (props.state ? "#00bcd4" : "#B2EBF2")};
  color: white;
  font-size: 14px;
  &:hover {
    cursor: ${(props) => (props.state ? "pointer" : "auto")};
    outline: ${(props) => (props.state ? "1px solid #03a9f4" : "none")};
  }
`;

function SaveButton() {
  const [saveStates] = useContext(SaveProductContext);
  const [save, setSave] = useState(false);
  const saveButton = useRef();

  useEffect(() => {
    let Error = saveStates.required.reduce((count, value) => {
      return value.error === false ? (count += 1) : count;
    }, 0);
    let SavePossible = saveStates.required.reduce((count, value) => {
      return value.savePossible === true ? (count += 1) : count;
    }, 0);
    if (Error === 4 && SavePossible === 4) {
      return setSave(true);
    } else {
      return setSave(false);
    }
  }, [saveStates]);

  if (saveButton.current) {
    if (save) {
      saveButton.current.disabled = false;
    } else {
      saveButton.current.disabled = true;
    }
  }

  const onSubmit = async () => {
    try {
      const imgBodyData = new FormData();

      imgBodyData.append("image", saveStates.required[0].file);

      const imgResponse = await axios.post(
        `${API_URL}/image/uploadfile`,
        imgBodyData
      );

      const headerData = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      };

      const postBodyData = {
        product: {
          itemName: saveStates.required[1].value,
          price: parseInt(saveStates.required[2].value),
          link: saveStates.required[3].value,
          itemImage: `${API_URL}/${imgResponse.data.filename}`,
        },
      };

      const response = await axios.post(
        `${API_URL}/product`,
        postBodyData,
        headerData
      );

      if (response) {
        alert("🐳 성공적으로 업로드 되었습니다! 🐳");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const complete = () => {
    if (!save) {
      return false;
    }
  };
  return (
    <>
      <Link to="/myprofile" onClick={complete}>
        <Save
          onClick={onSubmit}
          type="submit"
          ref={saveButton}
          state={save}
          disabled
        >
          저장
        </Save>
      </Link>
    </>
  );
}

export default SaveButton;
