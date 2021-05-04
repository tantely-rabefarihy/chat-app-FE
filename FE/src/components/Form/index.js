import React from "react";
import styled from "styled-components";

import Input from "./input";
import Button from "./button";
import TextArea from "./messageArea";

const Form = ({ formData, handleChange, addUser, disabled, subStatus }) => {
  return (
    <Wrapper onSubmit={addUser}>
      <FormContent>
        <h1>Leave a comment</h1>

        <FormGroup>
          <Input
            name="name"
            type="text"
            placeholder="Peter Applepie"
            handleChange={handleChange}
          />
          <Input
            name="email"
            type="text"
            placeholder="John@example.com"
            handleChange={handleChange}
          />

          <TextArea
            name="post"
            type="text"
            placeholder="Type your message here"
            handleChange={handleChange}
          />
        </FormGroup>
      </FormContent>
      <Button
        formData={formData}
        addUser={addUser}
        disabled={disabled}
        subStatus={subStatus}
      />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  padding: 0 1rem;
`;
const FormContent = styled.div`
  margin: 0 16px 0;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;

  > div {
    flex: 1 0 auto;
    width: 48%;

    &:first-child {
      margin-right: 1rem;
    }
  }
`;

export default Form;
