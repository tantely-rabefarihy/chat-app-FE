import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Form from "./Form";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

const initialState = {
  name: "",
  email: "",
  post: "",
};

const HomePage = () => {
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState("");
  const [dataFromDb, setDatafromDb] = useState([
    { name: "Tantely", post: "Hello" },
  ]);
  const socketRef = useRef();

  useEffect(() => {
    Object.values(formData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrMessage("");
  };

  const addUser = (e) => {
    e.preventDefault();
    const dateAdded = new Date().toJSON();
    sendMessage({ ...formData, date: dateAdded });
    e.target.reset();
  };

  const getData = async () => {
    let response = await fetch("http://localhost:8080/posts");
    let data = await response.json();
    setDatafromDb(data);
  };

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    socketRef.current.on("send message", (message) => {
      console.log(message);
      setDatafromDb((dataFromDb) => [...dataFromDb, message]);
    });
    getData();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit("send message", messageBody);
  };

  return (
    <MainContainer>
      <PostContainer>
        <h1>Comments</h1>
        {!dataFromDb ? (
          <></>
        ) : (
          dataFromDb?.map((userInfo, index) => {
            const dateFormat = new Date(userInfo?.date).toLocaleDateString();

            return (
              <Card key={index}>
                <User>
                  <a href={`mailto:${userInfo?.email}`}>{userInfo?.name}</a>
                </User>
                <Text>"{userInfo?.post}"</Text>
                <Text>{dateFormat}</Text>
              </Card>
            );
          })
        )}
      </PostContainer>
      <div>
        <Form
          formData={formData}
          handleChange={handleChange}
          addUser={addUser}
          disabled={disabled}
          subStatus={subStatus}
        />
      </div>
    </MainContainer>
  );
};

export default HomePage;

const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-left: 1rem;
`;

const PostContainer = styled.div`
  padding: 1rem;
`;

const Card = styled.div`
  border: 2px transparent solid;
  border-radius: 8px;
  position: relative;
  margin: 3.5rem auto;
  max-width: 30rem;
  min-width: 20rem;
  height: 15rem;
  background-color: black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const User = styled.h2`
  border: 2px black solid;
  border-radius: 8px;
  width: fit-content;
  padding: 0.5rem 1rem;
  position: absolute;
  top: -3rem;
  left: 2rem;
  background-color: white;
`;

const Text = styled.p`
  margin-top: 2rem;
  margin-left: 2rem;
  color: white;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
