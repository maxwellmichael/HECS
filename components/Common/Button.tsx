"use client";

import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "icon"
  | "social";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "type"> & {
    href: string;
    type?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primaryho dark:bg-primary dark:hover:bg-primaryho",
  secondary:
    "bg-black text-white hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho",
  ghost:
    "text-primary hover:bg-primary/5 dark:text-white dark:hover:text-primary",
  outline:
    "border-2 border-white bg-primary text-white hover:border-primary hover:bg-white hover:text-primary dark:border-strokedark dark:bg-transparent dark:text-white dark:hover:bg-primaryho dark:hover:border-primaryho",
  icon: "bg-transparent text-black hover:bg-stroke dark:text-white dark:hover:bg-hoverdark",
  social:
    "border border-stroke bg-alabaster text-black hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-blackho dark:text-white dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-regular gap-2.5",
  lg: "px-7.5 py-2.5 text-regular gap-2.5",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "left",
  children,
  className = "",
  ariaLabel,
  type = "button",
  ...rest
}) => {
  const baseClasses =
    "inline-flex flex-nowrap items-center justify-center whitespace-nowrap rounded-full font-medium duration-300 ease-in-out transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryho";

  const classes =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
