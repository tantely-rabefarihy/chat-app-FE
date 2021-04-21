import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HomePage = () => {
  const [dataFromDb, setDatafromDb] = useState([
    { userName: "Tantely", post: "Hello" },
  ]);

  const getData = async () => {
    let response = await fetch("http://localhost:8080/posts");
    let data = await response.json();
    console.log(data);
    setDatafromDb(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <PostContainer>
        {!dataFromDb ? (
          <></>
        ) : (
          dataFromDb?.map((userInfo, index) => {
            return (
              <Card key={index}>
                <User>{userInfo?.name}</User>
                <Text>"{userInfo?.posts}"</Text>
              </Card>
            );
          })
        )}
      </PostContainer>
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
  margin: 3rem auto;
  max-width: 30rem;
  min-width: 15rem;
  height: 10rem;
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
