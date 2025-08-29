'use client';

import { cn } from '@/app/utils/';
import { shortenAddress } from '@/app/utils/helpers';
import React, { useState } from 'react';
import { isAddress } from 'viem';

interface Props {
    address: string;
    isShort?: boolean;
    className?: string;
    isError?: boolean;
}

const Address: React.FC<Props> = ({ address, className, isShort = false, isError = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-1">

            <div
                className={cn(
                    'text-muted-foreground w-fit cursor-pointer rounded-md px-1 text-sm hover:bg-neutral-200 color-white',
                    !isAddress(address?.trim()) && 'text-red-500',
                    isError && 'text-red-500',
                    className,
                )}
            >
                <span className="hover:underline" title={address?.trim()}>
                    {isShort ? shortenAddress(address?.trim(), 6) : address?.trim()}
                </span>
            </div>
        </div>
    );
};

export default Address;
