"use client";
import { Form, FormField, Label } from "@radix-ui/react-form";
import { Button, Card, Flex, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction="column"
        align="center"
        justify="start"
        className="h-screen"
        minWidth={"400px"}
        gap="2"
        mt="100px"
      >
        <Card className="w-full max-w-sm p-10 bg-slate-200 shadow-md rounded-lg">
          <FormField name={""} className="m-2">
            <Label htmlFor="username">
              Username
              <TextField.Root
                className="border border-gray-300 rounded p-2"
                placeholder="username"
                {...register("username")}
              />
            </Label>
          </FormField>
          <FormField name={"password"} className="m-2">
            <Label htmlFor="password">
              Password
              <TextField.Root
                type="password"
                className="border border-gray-300 rounded p-2"
                placeholder="password"
                {...register("password")}
              />
            </Label>
          </FormField>

          <Button type="submit" m="2">
            Login
          </Button>
          <Button type="reset" m="2">
            Reset
          </Button>
        </Card>
      </Flex>
    </Form>
  );
};

export default LoginForm;
