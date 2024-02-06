"use client"

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { socialLinks } from "@/config/site-config/links";

import { coverImages } from "@/config/site-config/cvs";

import { siteConfig } from '@/config/site-config';

export default function Hero() {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${siteConfig.gitHubUser}`);
        const data = await response.json();
        setAvatarUrl(data.avatar_url);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-auto flex max-w-[736px] flex-col items-center pt-[65px]">
      <div className="w-full">
        <Image
          src={coverImages[0].src}
          alt="cover photo"
          width={750}
          height={400}
          priority
          className="h-48 w-full object-cover object-center xs:h-64"
        />

        <div className="flex items-center justify-between px-2 xs:pl-4">
          <div className="relative z-10 -mt-[55px] rounded-full bg-background p-2 xs:-mt-20">
            <Image
              src={avatarUrl}
              alt="profile-img"
              width={150}
              height={150}
              className="h-24 w-24 rounded-full object-cover object-top xs:h-32 xs:w-32"
            />
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end space-x-1 xs:space-x-2">
            {socialLinks.map((linkInfo) => (
              <Link
                key={linkInfo.href}
                href={linkInfo.href}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <linkInfo.icon className="h-[23px] w-[23px]" />
                  <span className="sr-only">{linkInfo.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
