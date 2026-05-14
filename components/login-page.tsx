"use client"
import React, { useEffect, useRef, useState, useTransition } from "react"
import Image from "next/image"
import { useForm } from "@tanstack/react-form"
import { Field, FieldLabel, FieldSet } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ButtonGroup } from "./ui/button-group"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { WebCamera, WebCameraHandler } from "@shivantra/react-web-camera"

function LoginClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="bg-primary px-2.5 py-1.5 text-center text-2xl font-bold text-muted antialiased">
      {format(time, "MMM dd, p")}
    </span>
  )
}

function LoginForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    defaultValues: {
      employeeNo: "",
      password: "",
    },
    onSubmit: ({ value }: any) =>
      startTransition(async () => {
        try {
          const payload = {
            name: value.name,
          }
          console.log(payload)
        } catch (error: any) {
          throw error
        }
      }),
  })

  return (
    <div className="mx-auto flex flex-1 flex-col items-center gap-4 px-5">
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="min-w-xs"
      >
        <FieldSet>
          <form.Field name="employeeNo">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Employee No.</FieldLabel>
                  <Input />
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input />
                </Field>
              )
            }}
          </form.Field>
        </FieldSet>
      </form>
      <ButtonGroup orientation="vertical" className="w-full space-y-2">
        <Button form="login-form" type="submit" loading={isPending}>
          Log in
        </Button>
        <Button variant="link">Forgot password?</Button>
      </ButtonGroup>
    </div>
  )
}

function BundyClock() {
  const cameraHandler = useRef<WebCameraHandler>(null)
  const [employeeNumber, setEmployeeNo] = useState<string>("")
  return (
    <div className="mx-auto flex h-2/3 w-150 items-center gap-4 px-5">
      <div className="w-75 space-y-px">
        <WebCamera
          className="h-75 w-75 border"
          captureMode="back"
          ref={cameraHandler}
        />
        <Input
          placeholder="Employee No. (ex. e0001)"
          className="w-full"
          value={employeeNumber}
          onChange={(e) =>
            setEmployeeNo(e.currentTarget.value.toLocaleLowerCase())
          }
        />
      </div>
      <div className="w-75">
        <ButtonGroup className="ml-px grid w-full grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "E", 0, "←"].map((value) => (
            <Button
              className="h-18.75 text-2xl"
              key={value}
              onClick={() =>
                setEmployeeNo((prev) =>
                  value == "←"
                    ? prev.slice(0, -1)
                    : prev + String(value).toLocaleLowerCase()
                )
              }
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup className="w-full">
          <Button className="w-1/2">Time In</Button>
          <Button className="w-1/2 bg-destructive hover:bg-destructive/80">
            Time Out
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="flex h-screen w-full justify-center">
      <Tabs defaultValue="overview" className="flex w-fit items-center">
        <TabsList className="data-active:bg-primary data-active:text-white">
          <TabsTrigger value="login">Login Page</TabsTrigger>
          <TabsTrigger value="bundy">Bundy Clock</TabsTrigger>
        </TabsList>
        <div className="flex h-1/3 flex-col items-center justify-center gap-4.5">
          <Image
            src="/images/hures.png"
            alt="System logo"
            width={400}
            height={400}
            loading="eager"
            className="max-w-40 object-contain"
          />
          <LoginClock />
        </div>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="bundy">
          <BundyClock />
        </TabsContent>
        <span className="absolute bottom-3.5 flex-1 text-center text-xs text-muted-foreground">
          ☕ Made by Ivan Sinohon (2026)
        </span>
      </Tabs>
    </div>
  )
}

export default LoginPage
