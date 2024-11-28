import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const PopoverComponent = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="w-full h-full text-black flex cursor-default items-center justify-center outline-none"
          aria-label="Update dimensions"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[147px] rounded-[15px] bg-[#000000] text-white p-5 backdrop-blur-[30px] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          sideOffset={10}
        >
          <div className="space-y-5">
            <div>
              <Link href="/dashboard">Dashboard</Link>
            </div>

            <div>
              <SignOutButton>
                <button>Sign out</button>
              </SignOutButton>
            </div>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverComponent;
