"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <section className="w-full h-screen">
      <div className="w-max mx-auto mt-10 flex flex-col justify-center space-y-3">
        <Link
          href="/dashboard"
          className="text-center flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 font-bold text-2xl">ZCash</span>
        </Link>
        <Tabs defaultValue="account" className="w-[450px]">
          <TabsList className="grid w-full grid-cols-5 mt-2 mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Track and manage your account in one convenient location.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="space-y-1">
                  <Label htmlFor="balance" className="">
                    Balance
                    {" - "}
                    <span className="text-gray-300">8075032390</span>
                  </Label>
                  <p className="font-bold text-xl pb-4">₦104,455.00</p>
                </div>
                <p className="font-semibold ">Personal Details</p>
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue="Tolulope Soneye"
                    disabled
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="sammy@gmail.com" disabled />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-red-600">Logout</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Seamless Deposit Process</CardTitle>
                <CardDescription>
                  Effortlessly increase your account balance by securely making
                  deposits through our user-friendly banking app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs">
                  Balance
                  {" - "}
                  <span className="text-gray-300">₦104,455.00</span>
                </p>
                <div className="space-y-1">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Deposit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Effortless Fund Withdrawal</CardTitle>
                <CardDescription>
                  Withdraw funds from your account hassle-free using our
                  intuitive banking app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs">
                  Balance
                  {" - "}
                  <span className="text-gray-300">₦104,455.00</span>
                </p>
                <div className="space-y-1">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Withdraw</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="transfer">
            <Card>
              <CardHeader>
                <CardTitle>Smooth Fund Transfers</CardTitle>
                <CardDescription>
                  Effortlessly move money between accounts and external
                  beneficiaries with our secure and user-friendly transfer
                  feature.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-xs">
                  Balance
                  {" - "}
                  <span className="text-gray-300">₦104,455.00</span>
                </p>
                <div className="space-y-1">
                  <Label htmlFor="recipient">Recipient Account Number</Label>
                  <Input id="recipient" type="number" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Send Funds</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
                <CardDescription>
                  View comprehensive details of your financial transactions,
                  providing transparency and control over your banking
                  activities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1"></div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DashboardPage;
