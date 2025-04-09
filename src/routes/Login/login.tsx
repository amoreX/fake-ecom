"use client"

import type React from "react"

import { useState,useEffect } from "react"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

type data={
    token:string;
}

type response={
    data:data;
}

export default function Login() {
    const navigate=useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    //API call for Login
    setTimeout(() => {
        const login=async()=>{
            try{
                const credentials = { username: username, password: password };
                const response:response=await axios.post('https://fakestoreapi.com/auth/login', credentials);
                console.log(response);
                if(response?.data?.token){
                    localStorage.setItem("token", response?.data?.token);
                    navigate("/dashboard")
                }
            }
            catch(err){
                    setError("Invalid username or password")
                    setIsLoading(false)
            }
        }   
        login();
    }, 1000)
  }

  useEffect(()=>{
    const token=localStorage.getItem("token");
    if (token){
        navigate("/dashboard")
    }
  },[])

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type:"tween",ease:"easeInOut",duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome To Fakeshop</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-md"
                />
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
