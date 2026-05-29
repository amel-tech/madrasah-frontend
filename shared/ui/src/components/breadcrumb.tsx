import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { CaretRightIcon, DotsThreeIcon } from "@madrasah/icons/ssr"

import { cn } from "@madrasah/ui/lib/utils"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    // @ts-expect-error known-issue
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <CaretRightIcon />}
    </span>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <DotsThreeIcon className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export type BreadcrumbEntry = {
  label: React.ReactNode
  /** When set (and not the last item) the crumb is a link. */
  href?: string
}

/**
 * Data-driven breadcrumb trail. Pass an ordered `items` array; the last item
 * renders as the current page, earlier items with an `href` render as links.
 *
 * Pass `linkComponent` (e.g. next/link's `Link`) to get client-side navigation;
 * it defaults to a plain `<a>`.
 */
function Breadcrumbs({
  items,
  linkComponent,
  className,
}: {
  items: BreadcrumbEntry[]
  linkComponent?: React.ElementType
  className?: string
}) {
  const LinkComponent = linkComponent ?? "a"

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const key = `${index}-${typeof item.label === "string" ? item.label : ""}`
          return (
            <React.Fragment key={key}>
              <BreadcrumbItem>
                {isLast
                  ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )
                  : item.href
                    ? (
                        <BreadcrumbLink asChild>
                          <LinkComponent href={item.href}>{item.label}</LinkComponent>
                        </BreadcrumbLink>
                      )
                    : (
                        <span>{item.label}</span>
                      )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  Breadcrumbs,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
