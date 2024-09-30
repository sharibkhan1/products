"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Header } from './header';
import Social from './social';
import { BackButton } from './back-button';

interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    AdminButtonHref?:string;
    AdminLabel?:string;
}

export const CardWrapper = ({AdminLabel,AdminButtonHref,children,headerLabel,backButtonHref,backButtonLabel,showSocial}:CardWrapperProps) => {
  return (
    <Card className=' w-[400px] shadow-md ' >
        <CardHeader>
            <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
        {children}
        </CardContent>
        <CardFooter>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
                {AdminLabel && AdminButtonHref && ( // Conditionally render Admin button
                    <BackButton
                        label={AdminLabel}
                        href={AdminButtonHref}
                    />
                )}
        </CardFooter>
    </Card>
  )
}
