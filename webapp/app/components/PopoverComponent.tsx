import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";

const PopoverComponent = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="w-full h-full text-black flex cursor-default items-center justify-center outline-none"
          aria-label="Update dimensions"
        >
          <GiHamburgerMenu />
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
